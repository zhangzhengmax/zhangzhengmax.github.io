/* Optional real-browser checks: install playwright locally or set PLAYWRIGHT_MODULE.
 * No files are published. Reports/screenshots go to the supplied output directory.
 */
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');

let playwright;
for (const modulePath of [process.env.PLAYWRIGHT_MODULE, 'playwright',
  process.env.USERPROFILE && path.join(process.env.USERPROFILE,
    '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')].filter(Boolean)) {
  try { playwright = require(modulePath); break; } catch {}
}
if (!playwright) throw new Error('Playwright unavailable. Install playwright or set PLAYWRIGHT_MODULE.');

const root = path.resolve(__dirname, '..');
const baseline = process.argv[2] === '--baseline';
const focused = ['long-text','layout'].includes(process.env.CHECK_ONLY);
const longOnly = process.env.CHECK_ONLY === 'long-text';
const baseURL = baseline ? 'http://baseline.local/' : (process.argv[2] || 'http://127.0.0.1:8000/');
const output = path.resolve(process.argv[3] || path.join(root, '.local-preview'));
const assertions = [];
function check(condition, message) {
  assertions.push({pass: Boolean(condition), message});
  if (!condition) console.error(`FAIL: ${message}`);
}

(async () => {
  fs.mkdirSync(output, {recursive: true});
  const launch = {headless: true};
  if (process.env.BROWSER_EXECUTABLE) launch.executablePath = process.env.BROWSER_EXECUTABLE;
  else launch.channel = 'chrome';
  const browser = await playwright.chromium.launch(launch);
  const report = {baseline, baseURL, cases: [], assertions};
  try {
    for (const viewport of (longOnly ? [] : [{width:1440,height:1000}, {width:390,height:844}])) {
      const context = await browser.newContext({viewport, colorScheme:'light'});
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      if (baseline) {
        const files = new Map(['index.html','styles.css','script.js','favicon.svg'].map(name =>
          [name, cp.execFileSync('git', ['show', `HEAD:${name}`], {cwd:root,encoding:'utf8'})]));
        await page.route('http://baseline.local/**', route => {
          const name = new URL(route.request().url()).pathname.slice(1) || 'index.html';
          const body = files.get(name);
          route.fulfill({status: body === undefined ? 404 : 200, body: body || '',
            contentType: name.endsWith('.html') ? 'text/html; charset=utf-8' :
              name.endsWith('.css') ? 'text/css' : name.endsWith('.js') ? 'text/javascript' : 'image/svg+xml'});
        });
      }
      await page.goto(baseURL, {waitUntil:'networkidle'});
      for (const lang of ['en','zh']) {
        if (lang === 'zh') await page.locator('#language-toggle').click();
        await page.evaluate(() => document.fonts.ready);
        const state = await page.evaluate(() => {
          const selectors = ['.hero h1','.hero-deck','.hero-description','.section-main h2',
            '.education-card','.timeline-item','.publication','.project-card','.highlight','.interest','.contact-section'];
          return {
            lang:document.documentElement.lang, title:document.title,
            text:document.body.innerText,
            overflow:document.documentElement.scrollWidth > innerWidth,
            blocks:selectors.flatMap(selector => [...document.querySelectorAll(selector)].map(node => {
              const box = node.getBoundingClientRect();
              return {selector,text:node.innerText,x:box.x,y:box.y,width:box.width,height:box.height,fontSize:getComputedStyle(node).fontSize};
            }))
          };
        });
        check(!state.overflow, `${viewport.width}px ${lang}: no horizontal overflow`);
        check(state.text.length > 1000, `${viewport.width}px ${lang}: content visible`);
        const screenshot = `${baseline ? 'baseline' : 'current'}-${viewport.width}-${lang}.png`;
        await page.screenshot({path:path.join(output,screenshot),fullPage:true});
        report.cases.push({viewport, lang, state, errors:[...errors], screenshot});
      }
      await page.locator('#theme-toggle').click();
      check(await page.evaluate(() => document.documentElement.dataset.theme === 'dark'), `${viewport.width}px: dark mode`);
      await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
      await page.screenshot({path:path.join(output,`${baseline ? 'baseline' : 'current'}-${viewport.width}-dark.png`),fullPage:true});
      await page.locator('[data-filter="product"]').click();
      check(await page.locator('.project-card:visible').count() === 2, `${viewport.width}px: project product filter`);
      await page.locator('[data-filter="all"]').click();
      check(await page.locator('.project-card:visible').count() === 4, `${viewport.width}px: project all filter`);
      check(errors.length === 0, `${viewport.width}px: no JavaScript exception`);
      await context.close();
    }
    if (!baseline) {
      const original = Object.fromEntries(['en','zh','style'].map(key =>
        [key, JSON.parse(fs.readFileSync(path.join(root,`content/${key}.json`),'utf8'))]));
      async function scenario(name, fixtures, verify, options = {}) {
        if (focused && !name.startsWith('long edited content')) return;
        const context = await browser.newContext({viewport: options.viewport || {width:390,height:844}});
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        if (options.init) await page.addInitScript(options.init);
        await page.route('**/content/*.json', async route => {
          const key = path.basename(new URL(route.request().url()).pathname, '.json');
          const fixture = fixtures[key];
          if (fixture === 'abort') return route.abort('failed');
          if (fixture === 'malformed') return route.fulfill({status:200,contentType:'application/json',body:'{invalid'});
          if (options.delay) await new Promise(resolve => setTimeout(resolve,options.delay));
          if (fixture !== undefined) return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(fixture)});
          return route.continue();
        });
        await page.route('**/assets/uploads/qa.png', route => route.fulfill({status:200,contentType:'image/png',
          body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aH84AAAAASUVORK5CYII=','base64')}));
        await page.goto(baseURL,{waitUntil:options.delay ? 'domcontentloaded' : 'networkidle'});
        await verify(page);
        check(errors.length === 0, `${name}: no JavaScript exception`);
        report.cases.push({scenario:name,errors});
        await context.close();
      }
      for (const fixture of ['abort','malformed']) {
        await scenario(`all JSON ${fixture}`, {en:fixture,zh:fixture,style:fixture}, async page => {
          check((await page.locator('#hero-heading').innerText()).includes('Zheng'), `${fixture}: English fallback visible`);
          await page.locator('#language-toggle').click();
          check((await page.locator('.hero-description').innerText()).includes('北京理工大学'), `${fixture}: Chinese fallback visible`);
          await page.locator('[data-filter="data"]').click();
          check(await page.locator('.project-card:visible').count() === 1, `${fixture}: filter still works`);
          await page.locator('#theme-toggle').click();
          check(await page.evaluate(() => document.documentElement.dataset.theme === 'dark'), `${fixture}: theme still works`);
        });
      }
      await scenario('partial / invalid fields', {en:{home:{heroDescription:'Edited description',brand:42}},zh:[],style:{projectTitle:'100px',heroTitle:-1}}, async page => {
        check(await page.locator('.hero-description').innerText() === 'Edited description', 'Partial content: valid edit applied');
        check(await page.locator('.brand [data-i18n]').innerText() === original.en.home.brand, 'Partial content: wrong type uses default');
        check(await page.locator('.project-card h3').first().innerText() === original.en.projects.project1Title, 'Partial content: absent field uses default');
        check(await page.locator('.project-card h3').first().evaluate(node => getComputedStyle(node).fontSize) === '23px', 'Invalid font uses CSS default');
        await page.locator('#language-toggle').click();
        check((await page.locator('.hero-description').innerText()).includes('北京理工大学'), 'Invalid locale shape uses Chinese fallback');
      });
      const edited = structuredClone(original.en);
      edited.home.portraitImage = '/assets/uploads/qa.png';
      edited.home.portraitAlt = 'Edited portrait';
      edited.projects.project1Image = '/assets/uploads/qa.png';
      edited.projects.project1ImageAlt = 'Edited project picture';
      edited.projects.project1Title = 'Edited title <img src=x onerror="window.__cmsXSS = true">';
      edited.contact.email = 'qa@example.test';
      edited.contact.profileUrl = 'https://example.com/profile';
      edited.contact.profileLabel = 'Example profile';
      await scenario('edited text / photos / fonts / contact', {en:edited,style:{...original.style,projectTitle:28,bodyCopy:18}}, async page => {
        const portrait = page.locator('.portrait-image');
        check(await portrait.isVisible() && await portrait.evaluate(node => node.naturalWidth > 0), 'Uploaded portrait renders');
        check(await portrait.getAttribute('alt') === 'Edited portrait', 'Uploaded portrait alternative text');
        const image = page.locator('.project-image').first();
        check(await image.isVisible() && await image.evaluate(node => node.naturalWidth > 0), 'Uploaded project photo renders');
        check(await page.locator('.project-card h3').first().innerText() === edited.projects.project1Title, 'Edited text displayed literally');
        check(await page.locator('.project-card h3 img').count() === 0 && !await page.evaluate(() => window.__cmsXSS), 'CMS text cannot insert executable markup');
        check(await page.locator('.project-card h3').first().evaluate(node => getComputedStyle(node).fontSize) === '28px', 'Numeric project title font applied');
        check(await page.locator('.body-copy').evaluate(node => getComputedStyle(node).fontSize) === '18px', 'Numeric body font applied');
        check(await page.locator('a[href="mailto:qa@example.test"]').isVisible(), 'Edited email renders as mailto');
        check(await page.locator('a[href="https://example.com/profile"]').innerText() === 'Example profile', 'Edited public profile renders');
      });
      const broken = structuredClone(original.en);
      broken.home.portraitImage = '/assets/uploads/does-not-exist.png';
      broken.projects.project1Image = '/assets/uploads/does-not-exist.png';
      broken.contact.profileUrl = 'javascript:window.__cmsXSS=true';
      await scenario('broken image / unsafe URL', {en:broken}, async page => {
        check(!await page.locator('.portrait-image').isVisible(), 'Broken portrait is hidden');
        check(await page.locator('.portrait-initials').isVisible(), 'Broken portrait keeps initials fallback');
        check(!await page.locator('.project-image').first().isVisible(), 'Broken project image is hidden');
        check(await page.locator('a[href^="javascript:"]').count() === 0, 'Unsafe contact URL rejected');
      });
      const delayed = structuredClone(original.zh);
      delayed.home.heroDescription = '延迟加载后的中文内容';
      await scenario('language selected during loading', {zh:delayed}, async page => {
        await page.locator('#language-toggle').click();
        await page.waitForLoadState('networkidle');
        check(await page.evaluate(() => document.documentElement.lang === 'zh-CN'), 'Loading completion keeps selected language');
        check(await page.locator('.hero-description').innerText() === delayed.home.heroDescription, 'Selected locale receives loaded edits');
      }, {delay:700});
      await scenario('unavailable localStorage', {}, async page => {
        await page.locator('#language-toggle').click();
        await page.locator('#theme-toggle').click();
        check(await page.evaluate(() => document.documentElement.lang === 'zh-CN' && document.documentElement.dataset.theme === 'dark'), 'Controls work when localStorage is denied');
      }, {init:() => Object.defineProperty(window,'localStorage',{get(){throw new Error('storage disabled');}})});
      const long = structuredClone(original.en);
      const longWord = 'LONGUNBROKENWORD'.repeat(20);
      for (const [group,key] of [['home','brand'],['home','nameFirst'],['home','heroDescription'],['education','edu1School'],['projects','project1Title'],['experience','exp1Org'],
        ['ui','navAbout'],['about','sectionAbout'],['about','toolsLabel'],['experience','exp1Year']]) long[group][key] = longWord;
      for (const width of [320,390,768,1050,1440]) {
        await scenario(`long edited content at ${width}px`, {en:long}, async page => {
          check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px: long edited text does not overflow`);
          const overflow = await page.evaluate(() => [...document.querySelectorAll('body *')]
            .map(node => ({tag:node.tagName,class:node.className,key:node.dataset.i18n,
              x:node.getBoundingClientRect().x,right:node.getBoundingClientRect().right,width:node.getBoundingClientRect().width}))
            .filter(node => node.right > innerWidth + 1 && node.width > 0).slice(0,20));
          if (overflow.length) report.cases.push({scenario:`overflow diagnostics ${width}`,overflow});
        }, {viewport:{width,height:900}});
      }
      const styleConfig = fs.readFileSync(path.join(root,'.pages.yml'),'utf8')
        .split('  - name: "style"')[1].split('\ncomponents:')[0];
      const maxima = Object.fromEntries([...styleConfig.matchAll(/      - name: "(\w+)"([\s\S]*?)(?=      - name:|$)/g)]
        .map(match => [match[1],Number(match[2].match(/\n\s+max:\s*(\d+)/)[1])]));
      if (!focused) check(Object.keys(maxima).length === Object.keys(original.style).length, 'Maximum-font fixtures cover all CMS number fields');
      for (const width of [320,390,768,1050,1440]) {
        await scenario(`maximum CMS fonts at ${width}px`, {style:maxima}, async page => {
          for (const locale of ['en','zh']) {
            if (locale === 'zh') await page.locator('#language-toggle').click();
            check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${locale}: all maximum font sizes do not overflow`);
          }
        }, {viewport:{width,height:900}});
      }
      const baselineReport = path.join(output,'baseline-report.json');
      if (!longOnly && fs.existsSync(baselineReport)) {
        const old = JSON.parse(fs.readFileSync(baselineReport,'utf8'));
        const comparison = old.cases.filter(item=>item.state).map(before => {
          const after = report.cases.find(item=>item.state && item.lang===before.lang && item.viewport.width===before.viewport.width);
          const sameText = before.state.text === after.state.text;
          const maxGeometryDelta = Math.max(...before.state.blocks.flatMap((node,index) =>
            ['x','y','width','height'].map(key=>Math.abs(node[key] - after.state.blocks[index][key]))));
          check(sameText, `${before.viewport.width}px ${before.lang}: original visible text preserved`);
          check(maxGeometryDelta < 0.1, `${before.viewport.width}px ${before.lang}: original layout geometry preserved`);
          return {width:before.viewport.width,locale:before.lang,sameText,maxGeometryDelta,blocks:before.state.blocks.length};
        });
        fs.writeFileSync(path.join(output,'default-comparison.json'),JSON.stringify(comparison,null,2));
      }
    }
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(output, `${focused ? 'focused' : baseline ? 'baseline' : 'current'}-report.json`), JSON.stringify(report,null,2));
  }
  console.log(JSON.stringify({checks:assertions.length,passed:assertions.filter(x=>x.pass).length,output}));
  if (assertions.some(x=>!x.pass)) process.exitCode = 1;
})().catch(error => {console.error(error);process.exitCode=1;});
