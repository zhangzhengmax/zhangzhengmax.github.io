#!/usr/bin/env python3
"""Check the buildless site using only the Python standard library.

Run from any directory: python3 tools/check_site.py
This reads files only; it never edits content or publishes anything.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import math
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
failures = []
checks = 0


def check(condition, message):
    global checks
    checks += 1
    if not condition:
        failures.append(message)


def read_json(name):
    try:
        return json.loads((ROOT / name).read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as error:
        check(False, f"{name}: {error}")
        return {}


def flatten(value, prefix=""):
    result = {}
    if isinstance(value, dict):
        for key, child in value.items():
            result.update(flatten(child, f"{prefix}.{key}" if prefix else key))
    else:
        result[prefix] = value
    return result


class SiteHTML(HTMLParser):
    def __init__(self):
        super().__init__()
        self.nodes = []
        self.ids = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        self.nodes.append((tag, attributes, self.getpos()[0]))
        if "id" in attributes:
            self.ids.append(attributes["id"])


def local_file(reference, source):
    """Return a site-local path for a reference, or None for a non-local URL."""
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return None
    path = (ROOT / unquote(parsed.path.lstrip("/"))).resolve()
    check(path.is_relative_to(ROOT), f"{source}: path escapes site: {reference}")
    return path if path.is_relative_to(ROOT) else None


def main():
    english = flatten(read_json("content/en.json"))
    chinese = flatten(read_json("content/zh.json"))
    styles = read_json("content/style.json")
    check(bool(english), "English content is nonempty")
    check(set(english) == set(chinese), "English and Chinese content keys match")
    for locale, strings in (("en", english), ("zh", chinese)):
        for key, value in strings.items():
            check(isinstance(value, str), f"{locale}.{key}: expected plain text string")
            if isinstance(value, str):
                check(not re.search(r"</?[A-Za-z][^>]*>", value), f"{locale}.{key}: HTML belongs in the template")
                if key.endswith("Image") and value:
                    path = local_file(value, f"{locale}.{key}")
                    check(path is not None and path.is_file(), f"{locale}.{key}: image exists: {value}")
    html_path = ROOT / "index.html"
    html = html_path.read_text(encoding="utf-8")
    parsed = SiteHTML()
    parsed.feed(html)
    check(len(parsed.ids) == len(set(parsed.ids)), "HTML ids are unique")
    bound = set()
    for tag, attrs, line in parsed.nodes:
        for attribute, value in attrs.items():
            if attribute == "data-i18n" or attribute.startswith("data-i18n-"):
                # Attribute names used to name a target attribute are not content paths.
                if attribute in {"data-i18n-attr", "data-i18n-attribute"}:
                    continue
                check(value in english, f"index.html:{line}: {attribute} content path exists: {value}")
                bound.add(value)
            elif attribute in {"data-image", "data-image-alt"}:
                check(value in english, f"index.html:{line}: {attribute} content path exists: {value}")
                bound.add(value)
        for attribute in ("src", "href"):
            reference = attrs.get(attribute, "")
            if reference.startswith("#"):
                check(reference[1:] in parsed.ids, f"index.html:{line}: anchor exists: {reference}")
            else:
                file_path = local_file(reference, f"index.html:{line}")
                if file_path is not None:
                    check(file_path.is_file(), f"index.html:{line}: resource exists: {reference}")
    check(bool(bound), "HTML has content bindings")
    check(any(tag == "link" and attrs.get("rel") == "icon" for tag, attrs, _ in parsed.nodes), "favicon declared")
    css = (ROOT / "styles.css").read_text(encoding="utf-8")
    script = (ROOT / "script.js").read_text(encoding="utf-8")
    runtime_paths = {"ui.languageNext", "ui.languageAction", "ui.languageTitle",
                     "ui.themeLightAction", "ui.themeDarkAction",
                     "contact.email", "contact.profileUrl", "contact.profileLabel"}
    for key in english:
        check(key in bound or key in runtime_paths, f"{key}: used by template/runtime")
    check(isinstance(styles, dict) and bool(styles), "Style settings are a nonempty object")
    if not isinstance(styles, dict):
        styles = {}
    for key, value in styles.items():
        check(type(value) in (int, float) and math.isfinite(value) and value > 0,
              f"style.{key}: positive finite numeric pixel size")
        variable = "--font-" + re.sub(r"([A-Z])", lambda m: "-" + m[1].lower(), key)
        check(bool(re.search(re.escape(variable) + r"\s*:", css)), f"style.{key}: CSS fallback variable defined")
        check(f"var({variable}" in css, f"style.{key}: CSS variable used")
    for reference in re.findall(r"url\(\s*['\"]?([^)'\"]+)", css):
        file_path = local_file(reference, "styles.css")
        if file_path is not None:
            check(file_path.is_file(), f"styles.css: resource exists: {reference}")
    check(".innerHTML" not in script, "Runtime inserts editable text without innerHTML")
    check("content/" in script, "Runtime loads content files")
    cms_path = ROOT / ".pages.yml"
    check(cms_path.is_file(), "Pages CMS config exists")
    if cms_path.is_file():
        config = cms_path.read_text(encoding="utf-8")
        configured_names = set(re.findall(r"^\s*(?:-\s*)?name:\s*['\"]?([A-Za-z0-9_]+)", config, re.M))
        for key in list(english) + list(styles):
            field_name = key.rsplit(".", 1)[-1]
            check(field_name in configured_names, f"{key}: CMS form field declared")
        for name in ("content/en.json", "content/zh.json", "content/style.json"):
            check(name in config, f"{name}: CMS file form declared")
        # Inspect the known generated YAML subset. This is not a general YAML
        # parser or a replacement for the real Pages CMS configuration parser.
        match = re.search(r'  - name: "style"([\s\S]*?)(?:\ncomponents:|\Z)', config)
        cms_ranges = {}
        if match:
            for field in re.finditer(r'      - name: "(\w+)"([\s\S]*?)(?=      - name:|\Z)', match[1]):
                minimum = re.search(r"\n\s+min:\s*([\d.]+)", field[2])
                maximum = re.search(r"\n\s+max:\s*([\d.]+)", field[2])
                if minimum and maximum:
                    cms_ranges[field[1]] = [float(minimum[1]), float(maximum[1])]
        limits_match = re.search(r"const FONT_LIMITS\s*=\s*(\{[\s\S]*?\});", script)
        try:
            runtime_ranges = json.loads(limits_match[1]) if limits_match else {}
        except json.JSONDecodeError:
            runtime_ranges = {}
        check(set(cms_ranges) == set(styles), "CMS numeric ranges cover all style keys")
        check(set(runtime_ranges) == set(styles), "Runtime numeric ranges cover all style keys")
        for key, value in styles.items():
            check(cms_ranges.get(key) == runtime_ranges.get(key), f"style.{key}: CMS and runtime min/max agree")
            bounds = cms_ranges.get(key, [0, 0])
            check(type(value) in (int, float) and bounds[0] <= value <= bounds[1], f"style.{key}: default value inside CMS range")
    check((ROOT / ".nojekyll").is_file(), "GitHub Pages serves the buildless tree")
    for section in ("home", "education", "experience", "research", "projects", "honors", "interests", "contact"):
        check(any(key.startswith(section + ".") for key in english), f"{section}: content migrated")
    for failure in failures:
        print("FAIL:", failure)
    print(f"Static checks: {checks - len(failures)}/{checks} passed; {len(english)} text fields per language; {len(styles)} font settings.")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
