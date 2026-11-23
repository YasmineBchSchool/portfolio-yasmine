/* =========================================================
   TAALKIEZER — EN / NL / FR / 中文 / العربية
   - Zet data-i18n="sleutel" op een element → tekst wordt vertaald
   - Zet <div data-lang-switcher></div> waar de knop moet komen
   - Keuze wordt onthouden op alle pagina's
   - <html data-i18n-fixed> = alleen vertalen, layout niet omdraaien
     (gebruikt op de TDP pagina, want dat is je Nederlandse design)
   ========================================================= */

const LANGS = [
  { code: "en", label: "EN", name: "English" },
  { code: "nl", label: "NL", name: "Nederlands" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "zh", label: "中文", name: "中文" },
  { code: "ar", label: "عربي", name: "العربية" },
];

const I18N = {
  /* ---------------- ENGLISH ---------------- */
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "hero.kicker": "Portfolio",

    "about.heading": "About me",
    "about.intro": "Hi, I'm Yasmine! I'm a Communication &amp; Multimedia Design student with a background in software development.",
    "about.p1": "I originally started in tech, but along the way I discovered that I'm more interested in the creative and strategic side of things. I enjoy understanding people, exploring ideas and figuring out how to turn research into meaningful designs.",
    "about.p2": "My main interests are branding, strategy and research, but I also have experience in UI/UX design and a growing interest in AI.",
    "about.p3": "I'm naturally curious, always looking to learn something new and open to exploring different creative directions.",

    "skills.heading": "Skills",
    "skills.hint": "Grab one and throw it. Click the empty space for a surprise.",
    "skills.focus": "Focus",
    "skills.branding": "Branding",
    "skills.strategy": "Strategy",
    "skills.research": "Research",
    "skills.uiux": "UI/UX design",
    "skills.tools": "Tools",
    "skills.also": "Also",
    "skills.ai": "AI in design",
    "skills.dev": "Software development",
    "skills.interaction": "Interaction design",
    "skills.prototyping": "Prototyping",
    "reel.design": "Design",
    "reel.ai": "and a little AI",
    "reel.hint": "Click to skip",
    "reel.next": "Next",

    "projects.heading": "Projects",
    "type.brandingweb": "Branding &amp; web",
    "type.app": "App design",
    "type.identity": "Visual identity",
    "type.ai": "AI design",
    "type.interaction": "Interaction design",
    "type.event": "Event concept",

    "contact.title": "Let's work together!",
    "contact.sub": "Internship, collaboration or just want to chat? Send me an email.",
    "footer.top": "Back to top",

    "float.back": "Back to portfolio",
    "float.figma": "View in Figma",

    "p.all": "All projects",
    "p.role": "Role",
    "p.year": "Year",
    "p.team": "Team",
    "p.tools": "Tools",
    "p.process": "Process",
    "p.research": "Research",
    "p.concept": "Concept",
    "p.execution": "Execution",
    "p.next": "Next project",
  },

  /* ---------------- NEDERLANDS ---------------- */
  nl: {
    "nav.about": "Over mij",
    "nav.skills": "Skills",
    "nav.projects": "Projecten",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.close": "Sluiten",
    "hero.kicker": "Portfolio",

    "about.heading": "Over mij",
    "about.intro": "Hoi, ik ben Yasmine! Ik studeer Communication &amp; Multimedia Design en heb een achtergrond in softwareontwikkeling.",
    "about.p1": "Ik ben begonnen in de tech, maar onderweg ontdekte ik dat ik meer geïnteresseerd ben in de creatieve en strategische kant. Ik vind het leuk om mensen te begrijpen, ideeën te verkennen en uit te zoeken hoe je onderzoek vertaalt naar betekenisvolle designs.",
    "about.p2": "Mijn grootste interesses zijn branding, strategie en onderzoek, maar ik heb ook ervaring met UI/UX-design en een groeiende interesse in AI.",
    "about.p3": "Ik ben van nature nieuwsgierig, altijd op zoek naar iets nieuws om te leren en sta open voor verschillende creatieve richtingen.",

    "skills.heading": "Skills",
    "skills.hint": "Pak er een en gooi hem weg. Klik in de lege ruimte voor een verrassing.",
    "skills.focus": "Focus",
    "skills.branding": "Branding",
    "skills.strategy": "Strategie",
    "skills.research": "Onderzoek",
    "skills.uiux": "UI/UX-design",
    "skills.tools": "Tools",
    "skills.also": "Ook",
    "skills.ai": "AI in design",
    "skills.dev": "Softwareontwikkeling",
    "skills.interaction": "Interaction design",
    "skills.prototyping": "Prototyping",
    "reel.design": "Design",
    "reel.ai": "en een beetje AI",
    "reel.hint": "Klik voor de volgende",
    "reel.next": "Volgende",

    "projects.heading": "Projecten",
    "type.brandingweb": "Branding &amp; web",
    "type.app": "App design",
    "type.identity": "Visuele identiteit",
    "type.ai": "AI-design",
    "type.interaction": "Interaction design",
    "type.event": "Eventconcept",

    "contact.title": "Laten we samenwerken!",
    "contact.sub": "Stage, samenwerking of gewoon even sparren? Stuur me een mailtje.",
    "footer.top": "Terug naar boven",

    "float.back": "Terug naar portfolio",
    "float.figma": "Bekijk in Figma",

    "p.all": "Alle projecten",
    "p.role": "Rol",
    "p.year": "Jaar",
    "p.team": "Team",
    "p.tools": "Tools",
    "p.process": "Proces",
    "p.research": "Onderzoek",
    "p.concept": "Concept",
    "p.execution": "Uitwerking",
    "p.next": "Volgend project",
  },

  /* ---------------- FRANÇAIS ---------------- */
  fr: {
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "nav.close": "Fermer",
    "hero.kicker": "Portfolio",

    "about.heading": "À propos de moi",
    "about.intro": "Bonjour, je suis Yasmine ! Je suis étudiante en Communication &amp; Multimedia Design, avec une formation en développement logiciel.",
    "about.p1": "J'ai commencé dans la tech, mais en chemin j'ai découvert que c'est surtout le côté créatif et stratégique qui m'intéresse. J'aime comprendre les gens, explorer des idées et trouver comment transformer la recherche en designs qui ont du sens.",
    "about.p2": "Mes principaux centres d'intérêt sont le branding, la stratégie et la recherche, mais j'ai aussi de l'expérience en design UI/UX et un intérêt croissant pour l'IA.",
    "about.p3": "Je suis curieuse de nature, toujours prête à apprendre quelque chose de nouveau et ouverte à différentes directions créatives.",

    "skills.heading": "Compétences",
    "skills.hint": "Attrapez-en une et lancez-la. Cliquez dans le vide pour une surprise.",
    "skills.focus": "Spécialités",
    "skills.branding": "Branding",
    "skills.strategy": "Stratégie",
    "skills.research": "Recherche",
    "skills.uiux": "Design UI/UX",
    "skills.tools": "Outils",
    "skills.also": "Aussi",
    "skills.ai": "IA et design",
    "skills.dev": "Développement logiciel",
    "skills.interaction": "Design d'interaction",
    "skills.prototyping": "Prototypage",
    "reel.design": "Design",
    "reel.ai": "et un peu d'IA",
    "reel.hint": "Cliquez pour passer",
    "reel.next": "Suivant",

    "projects.heading": "Projets",
    "type.brandingweb": "Branding &amp; web",
    "type.app": "Design d'application",
    "type.identity": "Identité visuelle",
    "type.ai": "Design IA",
    "type.interaction": "Design d'interaction",
    "type.event": "Concept d'événement",

    "contact.title": "Travaillons ensemble !",
    "contact.sub": "Un stage, une collaboration ou simplement envie d'échanger ? Envoyez-moi un e-mail.",
    "footer.top": "Retour en haut",

    "float.back": "Retour au portfolio",
    "float.figma": "Voir sur Figma",

    "p.all": "Tous les projets",
    "p.role": "Rôle",
    "p.year": "Année",
    "p.team": "Équipe",
    "p.tools": "Outils",
    "p.process": "Processus",
    "p.research": "Recherche",
    "p.concept": "Concept",
    "p.execution": "Réalisation",
    "p.next": "Projet suivant",
  },

  /* ---------------- 中文 (简体) ---------------- */
  zh: {
    "nav.about": "关于我",
    "nav.skills": "技能",
    "nav.projects": "项目",
    "nav.contact": "联系",
    "nav.menu": "菜单",
    "nav.close": "关闭",
    "hero.kicker": "作品集",

    "about.heading": "关于我",
    "about.intro": "你好，我是 Yasmine！我是一名传播与多媒体设计专业的学生，拥有软件开发背景。",
    "about.p1": "我最初从技术领域起步，但在这个过程中我发现，自己更感兴趣的是创意和策略方面。我喜欢了解人、探索想法，并思考如何把研究转化为有意义的设计。",
    "about.p2": "我的主要兴趣是品牌、策略和研究，同时我也有 UI/UX 设计经验，并对人工智能越来越感兴趣。",
    "about.p3": "我天生好奇，总在寻找学习新事物的机会，也乐于探索不同的创意方向。",

    "skills.heading": "技能",
    "skills.hint": "抓起一个扔出去。点击空白处有惊喜。",
    "skills.focus": "专长",
    "skills.branding": "品牌",
    "skills.strategy": "策略",
    "skills.research": "研究",
    "skills.uiux": "UI/UX 设计",
    "skills.tools": "工具",
    "skills.also": "其他",
    "skills.ai": "AI 与设计",
    "skills.dev": "软件开发",
    "skills.interaction": "交互设计",
    "skills.prototyping": "原型设计",
    "reel.design": "设计",
    "reel.ai": "再加一点 AI",
    "reel.hint": "点击切换",
    "reel.next": "下一个",

    "projects.heading": "项目",
    "type.brandingweb": "品牌与网页",
    "type.app": "应用设计",
    "type.identity": "视觉识别",
    "type.ai": "AI 设计",
    "type.interaction": "交互设计",
    "type.event": "活动策划",

    "contact.title": "一起合作吧！",
    "contact.sub": "实习、合作，或者只是想聊聊？欢迎给我发邮件。",
    "footer.top": "回到顶部",

    "float.back": "返回作品集",
    "float.figma": "在 Figma 中查看",

    "p.all": "全部项目",
    "p.role": "角色",
    "p.year": "年份",
    "p.team": "团队",
    "p.tools": "工具",
    "p.process": "过程",
    "p.research": "研究",
    "p.concept": "概念",
    "p.execution": "执行",
    "p.next": "下一个项目",
  },

  /* ---------------- العربية ---------------- */
  ar: {
    "nav.about": "عنّي",
    "nav.skills": "المهارات",
    "nav.projects": "المشاريع",
    "nav.contact": "تواصل",
    "nav.menu": "القائمة",
    "nav.close": "إغلاق",
    "hero.kicker": "معرض الأعمال",

    "about.heading": "نبذة عنّي",
    "about.intro": "مرحبًا، أنا ياسمين! أدرس تصميم الاتصال والوسائط المتعددة، ولديّ خلفية في تطوير البرمجيات.",
    "about.p1": "بدأت مسيرتي في مجال التكنولوجيا، لكنني اكتشفت مع الوقت أن الجانب الإبداعي والاستراتيجي هو ما يثير اهتمامي أكثر. أحب فهم الناس واستكشاف الأفكار ومعرفة كيف أحوّل البحث إلى تصاميم ذات معنى.",
    "about.p2": "اهتماماتي الرئيسية هي العلامات التجارية والاستراتيجية والبحث، ولديّ أيضًا خبرة في تصميم UI/UX واهتمام متزايد بالذكاء الاصطناعي.",
    "about.p3": "أنا فضولية بطبعي، أسعى دائمًا لتعلّم شيء جديد ومنفتحة على استكشاف اتجاهات إبداعية مختلفة.",

    "skills.heading": "المهارات",
    "skills.hint": "امسك واحدة وارمها. انقر على المساحة الفارغة لمفاجأة.",
    "skills.focus": "التخصص",
    "skills.branding": "العلامات التجارية",
    "skills.strategy": "الاستراتيجية",
    "skills.research": "البحث",
    "skills.uiux": "تصميم UI/UX",
    "skills.tools": "الأدوات",
    "skills.also": "أيضًا",
    "skills.ai": "الذكاء الاصطناعي في التصميم",
    "skills.dev": "تطوير البرمجيات",
    "skills.interaction": "تصميم التفاعل",
    "skills.prototyping": "النماذج الأولية",
    "reel.design": "تصميم",
    "reel.ai": "وقليل من الذكاء الاصطناعي",
    "reel.hint": "انقر للتالي",
    "reel.next": "التالي",

    "projects.heading": "المشاريع",
    "type.brandingweb": "هوية تجارية وويب",
    "type.app": "تصميم تطبيقات",
    "type.identity": "هوية بصرية",
    "type.ai": "تصميم بالذكاء الاصطناعي",
    "type.interaction": "تصميم التفاعل",
    "type.event": "فكرة فعالية",

    "contact.title": "لنعمل معًا!",
    "contact.sub": "تدريب أو تعاون أو مجرد دردشة؟ أرسل لي بريدًا إلكترونيًا.",
    "footer.top": "العودة إلى الأعلى",

    "float.back": "العودة إلى معرض الأعمال",
    "float.figma": "عرض في Figma",

    "p.all": "كل المشاريع",
    "p.role": "الدور",
    "p.year": "السنة",
    "p.team": "الفريق",
    "p.tools": "الأدوات",
    "p.process": "المراحل",
    "p.research": "البحث",
    "p.concept": "الفكرة",
    "p.execution": "التنفيذ",
    "p.next": "المشروع التالي",
  },
};

/* ---------------- stijl van de taalkiezer ---------------- */
(function injectStyles() {
  const css = `
  .lang { position: relative; font-size: 0.875rem; }
  .lang__btn {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: none; border: 1px solid rgba(255,255,255,0.35); color: inherit;
    border-radius: 999px; padding: 0.35rem 0.85rem; font: inherit; cursor: pointer;
    transition: border-color .3s, background .3s;
  }
  .lang__btn:hover, .lang.is-open .lang__btn { border-color: rgba(255,255,255,0.8); }
  .lang__btn svg { width: 14px; height: 14px; }
  .lang__menu {
    position: absolute; top: calc(100% + 0.5rem); inset-inline-end: 0;
    min-width: 10rem; list-style: none; margin: 0; padding: 0.4rem;
    background: rgba(10,10,10,0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.15); border-radius: 12px;
    opacity: 0; visibility: hidden; transform: translateY(-6px);
    transition: opacity .25s, transform .25s, visibility .25s; z-index: 200;
  }
  .lang.is-open .lang__menu { opacity: 1; visibility: visible; transform: none; }
  .lang__menu button {
    width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 1rem;
    background: none; border: 0; color: #ece3d6; font: inherit; text-align: start;
    padding: 0.55rem 0.75rem; border-radius: 8px; cursor: pointer;
  }
  .lang__menu button:hover { background: rgba(255,255,255,0.08); }
  .lang__menu button[aria-current="true"]::after { content: "✓"; opacity: .7; }
  html[lang="ar"] * { letter-spacing: 0 !important; }
  html[lang="zh"] body, html[lang="ar"] body { line-height: 1.75; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();

/* ---------------- logica ---------------- */
const STORAGE_KEY = "yb-lang";

function getSavedLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && I18N[saved]) return saved;
  } catch (e) {}
  // eerste bezoek: taal van de browser, anders Engels
  const browser = (navigator.language || "en").slice(0, 2);
  return I18N[browser] ? browser : "en";
}

function setLang(code) {
  const dict = I18N[code] || I18N.en;
  const html = document.documentElement;

  if (!html.hasAttribute("data-i18n-fixed")) {
    html.lang = code;
    html.dir = code === "ar" ? "rtl" : "ltr";
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = dict[key] ?? I18N.en[key];
    if (value != null) el.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    const value = dict[key] ?? I18N.en[key];
    if (value != null) el.setAttribute("aria-label", value);
  });

  document.querySelectorAll(".lang").forEach((sw) => {
    const current = LANGS.find((l) => l.code === code);
    sw.querySelector(".lang__current").textContent = current.label;
    sw.querySelectorAll(".lang__menu button").forEach((b) =>
      b.setAttribute("aria-current", b.dataset.code === code)
    );
  });

  try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
  document.dispatchEvent(new CustomEvent("langchange", { detail: code }));
}

function buildSwitchers() {
  document.querySelectorAll("[data-lang-switcher]").forEach((holder) => {
    holder.classList.add("lang");
    holder.innerHTML = `
      <button class="lang__btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Language">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>
        <span class="lang__current">EN</span>
      </button>
      <ul class="lang__menu">
        ${LANGS.map((l) => `<li><button type="button" data-code="${l.code}" lang="${l.code}">${l.name}</button></li>`).join("")}
      </ul>`;

    const btn = holder.querySelector(".lang__btn");
    const close = () => { holder.classList.remove("is-open"); btn.setAttribute("aria-expanded", false); };

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = holder.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
    });
    holder.querySelectorAll(".lang__menu button").forEach((b) =>
      b.addEventListener("click", () => { setLang(b.dataset.code); close(); })
    );
    document.addEventListener("click", (e) => { if (!holder.contains(e.target)) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  });
}

buildSwitchers();
setLang(getSavedLang());