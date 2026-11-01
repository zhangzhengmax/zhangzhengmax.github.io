# 张正个人网站 / Zheng Zhang — Personal Website

这是一个无需框架、无需命令行、可以直接部署到 GitHub Pages 的个人网站。设计方向参考 [Heejeong Nam 的个人主页](https://hazel-heejeong-nam.github.io/) 的学术主页结构，但内容与页面视觉均重新制作。

## 本地预览

双击 `index.html`，用浏览器打开。可以测试中英切换、明暗主题和项目筛选。无需安装 Node.js、Python 或第三方依赖。

## 部署到 GitHub Pages

1. 使用**网站所有者本人**的 GitHub 账号，创建公开仓库 `用户名.github.io`。
2. 将这个文件夹里的 `index.html`、`styles.css`、`script.js` 和 `assets` 目录上传到仓库根目录（不要只上传压缩包）。
3. 前往仓库 `Settings → Pages → Build and deployment`，选 `Deploy from a branch`；Branch 选 `main`，Folder 选 `/ (root)`，点击 Save。
4. 发布后访问 `https://用户名.github.io/`。网站第一次生成或更新通常需数分钟。
5. 如果开发者维护网站，所有者可在 `Settings → Collaborators` 邀请开发者自己的 GitHub 账号，**无需交出账号密码**。

若希望先在开发者自己的账号里演示，可建普通仓库如 `zhang-zheng-site`，则网站默认位于 `https://开发者用户名.github.io/zhang-zheng-site/`。本网站使用相对资源路径，两种方式均可部署。

## 正式发布前的编辑清单

**尚待确认，别直接原样公开作为最终版：**

- [ ] 个人照片：当前使用 ZZ 字母构图占位。请由网站所有者提供授权使用的照片。照片文件可命名 `assets/portrait.jpg`，修改 `index.html` 的 `.portrait` 区域为 `<img src="assets/portrait.jpg" alt="Zheng Zhang" class="real-portrait">`，并在 `styles.css` 最后追加 `.real-portrait{width:100%;height:100%;object-fit:cover;display:block;}`。移除原来的两个装饰层、字母与占位说明。
- [ ] 联系方式：在 `index.html` 的 `#contact` 中，将“待确认”文本替换为个人邮箱、LinkedIn、GitHub 或其他**本人授权公开**的链接。
- [ ] 学术论文：一份简历称 SCI 已发表，而资料合集的其他段落称 CSSCI 终审 / SCI 录用。网页刻意只呈现文章和研究贡献，不展示期刊及发表状态。公开前核对最终论文标题、作者、期刊、DOI 和发表情况。
- [ ] 教育信息、竞赛年份与奖项请本人最终确认。特别是不同材料中日期有轻微不一致。
- [ ] 实习项目描述采用公开的高层级概述；未公开原始业务指标、用户量、增益数值或内部文档。
- [ ] 若需要公开 PDF 简历，先制作**公开版**，删除家庭地址、家庭成员、政治面貌、个人手机号等不需要公开的隐私信息；不要直接上传此处的原始附件。
- [ ] `index.html` 中默认英文内容；`script.js` 中的 `zh` 词典是中文译文。修改一处文案时，应同步修改另一种语言。

## 文件说明

```text
index.html          网站结构与英文文字
styles.css          布局、配色和响应式设计
script.js           中文文字、中英切换、主题切换、项目筛选
assets/favicon.svg  网站标签页图标
README.md           本说明文档
```

## 内容来源与取舍

来自提供的两份文件：
- 《北京理工大学+张正 简历1013.pdf》
- 《投递用资料合集.docx》

保留：教育、三段实习、代表性科研、项目实践、竞赛荣誉、公开的兴趣描述。

不纳入：详细住址、邮编、政治面貌、私人信息、针对具体招聘企业的求职自述、未经核对的论文发表状态、可能属于企业内部的数据与试验结论。

项目中的「可公开的产品案例」只是对所提供材料的凝练，不代表额外核实的官方声明。
