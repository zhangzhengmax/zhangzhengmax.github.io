# 张正个人网站 / Zheng Zhang

原生 HTML/CSS/JavaScript 个人主页，沿用现有 GitHub Pages 部署。接入 Pages CMS 后，网站所有者可以在浏览器中编辑中英文文字、字号和照片，无需修改代码。

## Mac 浏览器编辑与发布

首次使用前，需先审核本次本地改造，并由维护者将这些文件纳入现有仓库的发布分支。本次改造没有推送或发布，也没有安装、授权 Pages CMS。

1. 在 Safari 或 Chrome 打开 [Pages CMS](https://app.pagescms.org/)，使用网站所有者本人的 GitHub 账号登录，按提示安装 GitHub App；只授权 `zhangzhengmax.github.io` 这个仓库即可，无需提供密码给维护者。
2. 打开该仓库，选择 GitHub Pages 实际发布的分支。当前本地分支是 `main`，请以仓库 `Settings → Pages` 的配置为准。
3. 选择「中文文案」或「英文文案」，展开相应板块编辑纯文本。中英文各自保存，不会自动翻译；现有教育、实习、科研、项目、荣誉、兴趣等条目可逐项修改，不提供新增或删除条目的表单。
4. 在首页照片、项目照片字段中上传或选择图片，并填写图片说明。中文和英文可以选择同一张图片；未选择或图片加载失败时保留原有占位效果。图片保存在 `assets/uploads/`。
5. 选择「字号设置」，填写像素数值。首页标题等提供桌面、平板或手机的独立字号；按字段提示的范围调整，保存后也应检查手机页面。
6. 保存会向当前所选分支提交修改。若该分支已接入现有 GitHub Pages 发布流程，构建完成后访问 [网站](https://zhangzhengmax.github.io/) 刷新查看；可到仓库 `Actions` 或 `Settings → Pages` 查看构建状态。若选择的是草稿分支，需要先由维护者合并到发布分支。

联系方式默认保留原来的待确认文字；确认后再填写邮箱及个人主页链接。图片建议先裁剪、压缩为 JPG、PNG 或 WebP，并使用本人有权公开的照片。提交后需要恢复时，可通过 GitHub 历史记录恢复先前版本。

带有「加粗前／后」「斜体前／后」的字段会拼成一段文字；英文分句交界处和姓名前半部分末尾的空格请保留。加粗、斜体、装饰句点与箭头由模板控制，表单中填写纯文本即可。原页面中文模式中保留的英文名称和术语也保持原值，可按需分别编辑。

## 本地预览与验收

在项目目录启动静态服务器（Mac 通常使用 `python3`，Windows 使用 `python`）：

```sh
python3 -m http.server 8000
```

浏览器打开 `http://localhost:8000/`。直接双击 `index.html` 时，浏览器通常会拦截 JSON 请求，只能看到模板回退内容，不能用于验收 CMS 内容更新。

静态检查（Python 3 标准库，无需安装依赖）：

```sh
python3 tools/check_site.py
```

有 Node.js 时还可运行 `node --check script.js`。静态检查覆盖 JSON、字段绑定、资源路径及字号范围；CMS 配置检查针对本项目使用的配置结构，不代替登录 Pages CMS 后的表单验收。

- 检查桌面与约 390px 宽的手机视图，中英文切换、深色模式和四个项目筛选按钮应保持正常。
- 临时修改一种语言的一处文字和一个字号，刷新确认生效，再恢复文件。
- 临时选择首页或项目图片，确认裁剪与图片说明；检查未设置图片和错误路径时的回退。
- 开发者工具 Network 中屏蔽 `content/*.json` 后刷新，页面应仍有内容并能使用主题和筛选；恢复请求后应加载编辑后的内容。

JSON 网络、解析或结构失败时，使用模板默认英文及冻结的原始中文词典回退。正常编辑只需修改 CMS 表单；如果修改后仍看到旧内容，请先检查 JSON 请求、缓存与 Pages 构建状态。

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `content/zh.json`、`content/en.json` | 中文、英文纯文本与照片、联系方式 |
| `content/style.json` | 数字字号设置（px） |
| `.pages.yml` | Pages CMS 表单、字段范围和图片上传配置 |
| `index.html` | 页面模板及加载失败时的默认内容 |
| `styles.css` | 原有布局、配色、响应式规则与字号变量 |
| `script.js` | 内容加载、中英切换、主题切换、项目筛选与回退 |
| `favicon.svg` | 网站图标 |
| `assets/uploads/` | CMS 上传的图片 |
| `tools/check_site.py` | JSON、内容绑定、资源路径与 CMS 配置的静态检查 |
| `tools/preview-check.cjs` | 可选的浏览器回归检查；需要已有 Playwright 和 Chrome |

浏览器回归检查可在服务器运行时执行 `node tools/preview-check.cjs http://localhost:8000/ /tmp/personal-site-qa`，结果与截图写入指定目录。可通过 `PLAYWRIGHT_MODULE` 指定 Playwright 模块路径、`BROWSER_EXECUTABLE` 指定其他 Chromium 浏览器路径。

## 内容来源与待确认事项

现有文字来自《北京理工大学+张正 简历1013.pdf》和《投递用资料合集.docx》，本次迁移保留既有文案。论文最终标题、作者、期刊、DOI 与发表状态，以及教育、竞赛年份和联系方式，仍需本人确认；实习项目维持适合公开展示的概述，不补充内部指标。公开 PDF 简历时应先准备删去不需公开私人信息的版本。

配置依据 Pages CMS 官方的 [配置概览](https://pagescms.org/docs/configuration/)、[文件与字段](https://pagescms.org/docs/configuration/content/)、[图片上传](https://pagescms.org/docs/configuration/media/) 和 [数字字段](https://pagescms.org/docs/configuration/fields/number/) 规范。
