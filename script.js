/* Edit content/en.json, content/zh.json and content/style.json through Pages CMS.
 * The HTML and this frozen Chinese snapshot retain the original copy offline.
 */
'use strict';

const DEFAULT_ZH = {
  "meta": {
    "title": "张正 · 个人主页",
    "description": "张正的个人主页：研究、产品策略、数据与人工智能。",
    "ogTitle": "张正 · 个人主页",
    "ogDescription": "Research, product thinking, data analysis, and the stories in between."
  },
  "ui": {
    "navAbout": "关于我",
    "navExperience": "实习经历",
    "navResearch": "科研经历",
    "navProjects": "项目实践",
    "navBeyond": "生活与兴趣",
    "skipLink": "Skip to content",
    "homepageLabel": "Zheng Zhang homepage",
    "navigationLabel": "Primary navigation",
    "filterLabel": "Project filters",
    "backToTopLabel": "Back to top",
    "languageNext": "EN",
    "languageAction": "Switch to English",
    "languageTitle": "English",
    "themeLightAction": "Switch to light theme",
    "themeDarkAction": "Switch to dark theme"
  },
  "home": {
    "brand": "张正",
    "portraitCaption": "数据 · 思考 · 连接",
    "sideStatus": "乐于交流 · 研究与合作",
    "eyebrow": "你好，我是",
    "heroDescription": "北京理工大学能源与气候经济硕士在读，本科毕业于北京林业大学金融学专业。我关注数据分析、AI 产品应用、用户增长策略，以及经济与可持续发展领域的定量研究。",
    "pill1": "产品与增长策略",
    "pill2": "数据分析与 AI",
    "pill3": "经济与能源研究",
    "exploreWork": "探索我的项目",
    "getInTouch": "联系与交流",
    "heroDeckBefore": "希望用",
    "heroDeckEmphasis": "数据、技术与人的洞察",
    "heroDeckAfter": "，理解复杂问题并创造真正的价值。",
    "nameFirst": "Zheng ",
    "nameLast": "Zhang.",
    "nameSecondary": "张正",
    "portraitAlt": "Portrait placeholder with initials ZZ",
    "portraitImage": "",
    "portraitInitials": "ZZ",
    "heroVertical": "THINK · BUILD · EXPLORE"
  },
  "about": {
    "sectionAbout": "关于我",
    "aboutTitle": "关于我的一些故事",
    "aboutIntro": "我喜欢从复杂的信息中寻找结构：从研究数据中识别规律，从用户行为中发现产品机会，也尝试将重复性的工作变成更有效率的工具。",
    "toolsLabel": "常用工具",
    "aboutBodyBefore": "我的学习起点是金融学，研究生阶段进一步走向能源与气候经济。快手、京东和滴滴的实习经历，让我有机会把数据分析、产品策略与实际业务结合起来。不同的问题背后，我始终关心同一件事：",
    "aboutBodyEmphasis": "真正需要解决的问题是什么，我们又该如何验证解决效果？",
    "aboutBodyAfter": "",
    "tool1": "Python",
    "tool2": "SQL",
    "tool3": "Stata",
    "tool4": "Figma",
    "tool5": "AI / LLMs"
  },
  "education": {
    "edu1School": "北京理工大学",
    "edu1Degree": "硕士 · 能源与气候经济",
    "edu1Detail": "融合经济分析、能源系统与政策建模的交叉学科",
    "edu2School": "北京林业大学",
    "edu2Degree": "本科 · 金融学",
    "edu2Detail": "金融理论、定量分析与商业决策",
    "edu1Mark": "BIT",
    "edu1Year": "2025 — 2027",
    "edu2Mark": "BFU",
    "edu2Year": "2021 — 2025"
  },
  "experience": {
    "sectionExperience": "实习经历",
    "experienceTitle": "从想法到实践",
    "experienceSummary": "在互联网产品、自动化工具和跨团队运营中积累真实的业务实践。",
    "exp1Title": "策略产品经理实习生",
    "exp1Body": "在快手用户增长方向参与 Push 触达体验与增长策略，围绕用户分层、关闭风险预测、可解释性分析与大模型辅助归因，探索更精准、更有价值的用户触达。",
    "exp1Tag1": "增长策略",
    "exp1Tag2": "实验评估",
    "exp1Tag3": "AI 辅助分析",
    "exp2Title": "产品运营实习生",
    "exp2Body": "在京东 3C 数码业务中，使用 Python 将高频返利审核流程自动化，并运用文本处理、TF-IDF 与聚类方法分析客户反馈，识别高频体验问题。",
    "exp2Tag2": "业务流程自动化",
    "exp2Tag3": "文本分析",
    "earlier": "此前",
    "exp3Title": "策略运营实习生",
    "exp3Body": "参与滴滴两轮车业务的多城市项目落地，梳理标准化流程与交付节点，并协调业务、客服和法务等团队推进任务。",
    "exp3Tag1": "业务运营",
    "exp3Tag2": "项目协同",
    "exp1Year": "2026",
    "exp1Org": "Kuaishou · User Growth",
    "exp2Year": "2025 — 2026",
    "exp2Org": "JD.com · 3C Digital",
    "exp2Tag1": "Python",
    "exp3Org": "DiDi · Two-Wheeler Business"
  },
  "research": {
    "sectionResearch": "科研经历",
    "researchTitle": "值得探索的问题",
    "researchSummary": "关注金融、能源转型与可持续发展之间的关系，尝试以定量方法寻找可解释的答案。",
    "researchLabel1": "代表性研究",
    "researchFocus1": "绿色金融 · 能源转型",
    "paperDesc": "以学生第一作者身份开展的研究，利用空间计量与面板门槛模型，考察绿色金融对清洁能源转型的非线性作用及空间溢出效应。",
    "researchLabel2": "科研项目参与",
    "researchFocus2": "循环经济 · 可持续发展",
    "research2Title": "家庭能源清洁转型：决策机理、影响评估与政策设计",
    "research2Body": "参与废弃家电回收利用体系的资源潜力、经济价值与环境效益评估，研究涉及情景分析、动态物质流分析与生命周期评价。",
    "researchFootnote": "论文的最终发表信息与公开链接将在核实后更新。",
    "research1Title": "More Developed Less Efficient? Spatial Threshold Effects of Green Finance on Clean Energy Transition Based on SPDM-PTRM Model",
    "research1Method1": "Spatial Durbin Model",
    "research1Method2": "Panel Threshold",
    "research1Method3": "Stata / Python",
    "research2Method1": "Material Flow Analysis",
    "research2Method2": "LCA",
    "research2Method3": "Scenario Analysis"
  },
  "projects": {
    "sectionProjects": "项目实践",
    "projectsTitle": "项目与探索",
    "projectsAside": "几个认真研究过的问题",
    "filterAll": "全部",
    "filterProduct": "产品与 AI",
    "filterData": "数据与自动化",
    "filterResearch": "科研",
    "project1Type": "产品策略 · AI",
    "project1Title": "为什么用户会关闭 Push 通知？",
    "project1Body": "结合用户行为特征、近邻匹配与大模型归纳，分析触达疲劳背后的原因，并设计更合理的用户触达策略。",
    "project2Type": "产品策略 · AI",
    "project2Title": "用 AI 发现更多有价值的内容",
    "project2Body": "参与多阶段内容挖掘方案，将规则过滤、初筛排序与大模型内容质量判断结合，探索更有效的内容供给方式。",
    "project3Type": "数据 · 自动化",
    "project3Title": "把人工审核变成 Python 工作流",
    "project3Body": "将多种返利业务规则转化为可执行的自动校验逻辑，实现规则匹配、异常识别与结构化结果输出。",
    "project4Type": "科研 · 数据分析",
    "project4Title": "量化绿色金融对能源转型的影响",
    "project4Body": "通过空间计量、门槛模型和实证检验，研究绿色金融支持清洁能源转型的边界条件与作用机制。",
    "projectsNote": "项目描述采用适合公开展示的概括版本，未披露企业内部指标。",
    "project1Image": "",
    "project1ImageAlt": "",
    "project1Footer1": "User Insights",
    "project1Footer2": "LLM",
    "project1Footer3": "Experimentation",
    "project2Image": "",
    "project2ImageAlt": "",
    "project2Footer1": "Content Strategy",
    "project2Footer2": "Ranking",
    "project2Footer3": "Quality",
    "project3Image": "",
    "project3ImageAlt": "",
    "project3Footer1": "Python",
    "project3Footer2": "Rules Engine",
    "project3Footer3": "Operations",
    "project4Image": "",
    "project4ImageAlt": "",
    "project4Footer1": "Econometrics",
    "project4Footer2": "Research",
    "project4Footer3": "Data"
  },
  "honors": {
    "sectionHighlights": "荣誉与经历",
    "highlightsTitle": "一路上的小小收获",
    "award1Title": "中国青年绿色科技创新大赛",
    "award1Detail": "国家级二等奖",
    "award2Title": "中国国际大学生创新大赛（互联网+）",
    "award2Detail": "国家级三等奖",
    "award3Title": "全国大学生数学竞赛",
    "award3Detail": "国家级三等奖",
    "highlightsFootnote": "也曾参与校园社团、实地调研和公益志愿活动。",
    "award1Year": "2024",
    "award2Year": "2023",
    "award3Year": "2023"
  },
  "interests": {
    "sectionBeyond": "生活与兴趣",
    "beyondTitle": "数据之外的生活",
    "beyondIntro": "有些有意思的事情，不必全部变成指标。",
    "interest1Title": "阅读与思考",
    "interest1Body": "喜欢历史、文学、经济和社会科学，也享受发现未知话题的过程。",
    "interest2Title": "跑步与运动",
    "interest2Body": "通过跑步、乒乓球和规律运动保持节奏。",
    "interest3Title": "交流与表达",
    "interest3Body": "从社团活动、主持到实地调研，喜欢和不同背景的人交流。"
  },
  "contact": {
    "contactEyebrow": "保持联系",
    "contactTitle": "好的想法，往往始于一次交流",
    "contactBody": "如果你也关注研究、产品策略、数据分析，或者只是想交换一些有趣的想法，欢迎交流。",
    "contactPending": "联系方式与社交链接将在本人确认后补充。",
    "email": "",
    "profileUrl": "",
    "profileLabel": ""
  },
  "footer": {
    "footerCredit": "用好奇心与耐心制作。",
    "backTop": "回到顶部 ↑",
    "footerName": "Zheng Zhang"
  }
};

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function getText(object, path) {
  const value = path.split('.').reduce((part, key) =>
    isObject(part) && Object.prototype.hasOwnProperty.call(part, key) ? part[key] : undefined, object);
  return typeof value === 'string' ? value : '';
}

function collectEnglishDefaults() {
  const defaults = {
    ui: {
      languageNext: '中文', languageAction: '切换为中文', languageTitle: '中文',
      themeLightAction: 'Switch to light theme', themeDarkAction: 'Switch to dark theme'
    },
    contact: {email: '', profileUrl: '', profileLabel: ''}
  };
  const remember = (path, value) => {
    const [group, key] = path.split('.');
    if (!defaults[group]) defaults[group] = {};
    defaults[group][key] = value;
  };
  for (const [binding, attribute] of [
    ['data-i18n', null], ['data-i18n-content', 'content'], ['data-i18n-aria', 'aria-label']
  ]) {
    for (const node of document.querySelectorAll(`[${binding}]`)) {
      remember(node.getAttribute(binding), attribute ? node.getAttribute(attribute) : node.textContent);
    }
  }
  for (const image of document.querySelectorAll('[data-image]')) {
    remember(image.dataset.image, '');
    const [group, key] = image.dataset.imageAlt.split('.');
    if (!Object.prototype.hasOwnProperty.call(defaults[group], key)) remember(image.dataset.imageAlt, image.alt);
  }
  return defaults;
}

// Missing or invalid individual fields retain their original value. Accept
// only known fields and strings; render editable strings as text, never HTML.
function mergeContent(defaults, incoming) {
  const result = {};
  for (const [key, value] of Object.entries(defaults)) {
    const candidate = isObject(incoming) && Object.prototype.hasOwnProperty.call(incoming, key) ? incoming[key] : undefined;
    result[key] = isObject(value) ? mergeContent(value, candidate) :
      (typeof candidate === 'string' ? candidate : value);
  }
  return result;
}

const defaultContent = {en: collectEnglishDefaults()};
defaultContent.zh = mergeContent(defaultContent.en, DEFAULT_ZH);
const content = {en: defaultContent.en, zh: defaultContent.zh};
let language = 'en';
let theme = 'light';
try { theme = window.localStorage.getItem('zz-theme') === 'dark' ? 'dark' : 'light'; } catch {}

function updateThemeLabel() {
  const label = getText(content[language], theme === 'dark' ? 'ui.themeLightAction' : 'ui.themeDarkAction');
  const button = document.querySelector('#theme-toggle');
  button.setAttribute('aria-label', label);
  button.title = label;
}

function setTheme(next) {
  theme = next;
  document.documentElement.dataset.theme = next;
  updateThemeLabel();
  document.querySelector('meta[name="theme-color"]').content = next === 'dark' ? '#131d21' : '#f7f7f3';
  try { window.localStorage.setItem('zz-theme', next); } catch {}
}

function imageURL(value) {
  if (!value.trim()) return '';
  try {
    const url = new URL(value, document.baseURI);
    return ['http:', 'https:', 'file:'].includes(url.protocol) && url.origin === window.location.origin ? url.href : '';
  } catch { return ''; }
}

function updateImages(strings) {
  for (const image of document.querySelectorAll('[data-image]')) {
    const source = imageURL(getText(strings, image.dataset.image));
    image.alt = getText(strings, image.dataset.imageAlt);
    if (!source) {
      image.hidden = true;
      image.removeAttribute('src');
    } else if (image.getAttribute('src') !== source) {
      // Keep the original placeholder visible until a replacement really loads.
      image.hidden = true;
      image.loading = 'eager';
      image.onload = () => { image.hidden = false; };
      image.onerror = () => { image.hidden = true; };
      image.src = source;
    }
  }
}

function updateContact(strings) {
  const email = getText(strings, 'contact.email').trim();
  const address = document.querySelector('#contact-email');
  const validEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email);
  address.hidden = !validEmail;
  address.textContent = validEmail ? email : '';
  if (validEmail) address.href = `mailto:${encodeURIComponent(email).replace(/%40/g, '@')}`;
  else address.removeAttribute('href');

  const profile = document.querySelector('#contact-profile');
  let profileURL = '';
  try {
    const url = new URL(getText(strings, 'contact.profileUrl'));
    if (['http:', 'https:'].includes(url.protocol)) profileURL = url.href;
  } catch {}
  profile.hidden = !profileURL;
  profile.textContent = profileURL ? (getText(strings, 'contact.profileLabel').trim() || profileURL) : '';
  if (profileURL) profile.href = profileURL;
  else profile.removeAttribute('href');

  document.querySelector('#contact-separator').hidden = !(validEmail && profileURL);
  document.querySelector('#contact-links').hidden = !validEmail && !profileURL;
  document.querySelector('.contact-pending').hidden = validEmail || Boolean(profileURL);
}

function setLanguage(next) {
  language = next === 'zh' ? 'zh' : 'en';
  const strings = content[language];
  for (const node of document.querySelectorAll('[data-i18n]')) node.textContent = getText(strings, node.dataset.i18n);
  for (const node of document.querySelectorAll('[data-i18n-content]')) node.content = getText(strings, node.dataset.i18nContent);
  for (const node of document.querySelectorAll('[data-i18n-aria]')) node.setAttribute('aria-label', getText(strings, node.dataset.i18nAria));
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelector('#language-label').textContent = getText(strings, 'ui.languageNext');
  document.querySelector('#language-toggle').setAttribute('aria-label', getText(strings, 'ui.languageAction'));
  document.querySelector('#language-toggle').title = getText(strings, 'ui.languageTitle');
  updateThemeLabel();
  updateImages(strings);
  updateContact(strings);
}

async function loadJSON(path) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 4500);
  try {
    const response = await fetch(path, {cache: 'no-cache', signal: controller.signal});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!isObject(data)) throw new Error('Expected a JSON object');
    return data;
  } finally { window.clearTimeout(timeout); }
}

function loadContent(lang) {
  const state = `content${lang === 'en' ? 'En' : 'Zh'}`;
  document.documentElement.dataset[state] = 'loading';
  return loadJSON(`content/${lang}.json`).then(data => {
    content[lang] = mergeContent(defaultContent[lang], data);
    document.documentElement.dataset[state] = 'loaded';
    if (language === lang) setLanguage(lang);
  }).catch(error => {
    document.documentElement.dataset[state] = 'fallback';
    console.warn(`Using original ${lang} content: ${error.message}`);
  });
}

const FONT_LIMITS = {
  "body": [14, 22],
  "bodyCopy": [12, 22],
  "cardBody": [11, 20],
  "detailText": [10, 18],
  "smallText": [9, 16],
  "microText": [8, 14],
  "navigation": [11, 16],
  "control": [10, 16],
  "heroTitle": [60, 120],
  "heroTitleTablet": [40, 72],
  "heroTitleMobile": [48, 88],
  "heroDeck": [24, 44],
  "heroDeckTablet": [20, 32],
  "heroDeckMobile": [20, 36],
  "heroDescription": [12, 20],
  "heroDescriptionTablet": [12, 20],
  "heroDescriptionMobile": [12, 20],
  "secondaryName": [16, 28],
  "sectionTitle": [36, 68],
  "sectionTitleTablet": [28, 48],
  "sectionIntro": [20, 36],
  "educationTitle": [12, 20],
  "experienceTitle": [16, 28],
  "experienceTitleMobile": [15, 24],
  "experienceBody": [12, 20],
  "researchTitle": [18, 34],
  "researchTitleMobile": [16, 28],
  "researchBody": [12, 20],
  "projectTitle": [18, 32],
  "awardTitle": [12, 20],
  "awardTitleTablet": [11, 16],
  "interestTitle": [14, 24],
  "contactTitle": [40, 68],
  "contactTitleMobile": [28, 48]
};

function loadStyle() {
  document.documentElement.dataset.contentStyle = 'loading';
  return loadJSON('content/style.json').then(settings => {
    // CSS defines the allow-list and defaults. Editable JSON cannot inject CSS.
    const defaults = getComputedStyle(document.documentElement);
    for (const [key, value] of Object.entries(settings)) {
      if (!Object.prototype.hasOwnProperty.call(FONT_LIMITS, key) || typeof value !== 'number' || !Number.isFinite(value)) continue;
      const property = `--font-${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`;
      if (!defaults.getPropertyValue(property).trim()) continue;
      const [minimum, maximum] = FONT_LIMITS[key];
      if (value >= minimum && value <= maximum) document.documentElement.style.setProperty(property, `${value}px`);
    }
    document.documentElement.dataset.contentStyle = 'loaded';
  }).catch(error => {
    document.documentElement.dataset.contentStyle = 'fallback';
    console.warn(`Using original font sizes: ${error.message}`);
  });
}

setLanguage(language);
setTheme(theme);
document.querySelector('#language-toggle').addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
document.querySelector('#theme-toggle').addEventListener('click', () => setTheme(theme === 'light' ? 'dark' : 'light'));
const filters = [...document.querySelectorAll('[data-filter]')];
filters.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  for (const item of filters) {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  }
  for (const item of document.querySelectorAll('[data-category]')) item.hidden = selected !== 'all' && item.dataset.category !== selected;
}));
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.main-nav a')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  }, {rootMargin: '-20% 0px -60% 0px'});
  for (const link of links) {
    const target = document.querySelector(link.hash);
    if (target) observer.observe(target);
  }
}
document.querySelector('#year').textContent = new Date().getFullYear();
loadContent('en');
loadContent('zh');
loadStyle();
