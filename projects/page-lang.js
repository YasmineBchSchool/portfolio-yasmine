/* =========================================================
   TAALKNOP VOOR DE PROJECTPAGINA'S — NL / EN
   - Zet onderaan rechts een knopje NL | EN.
   - De Engelse teksten staan per pagina in window.PL_EN
     (Nederlandse tekst → Engelse tekst).
   - Elementen met data-en="..." wisselen ook mee.
   - Je keuze wordt onthouden op alle projectpagina's.
   ========================================================= */
(() => {
  const DICT = window.PL_EN || {};
  const SAVE_KEY = "portfolio-lang";
  // eerst je keuze op de projectpagina's, daarna wat de homepagina eventueel bewaard heeft
  const READ_KEYS = [SAVE_KEY, "lang", "language", "siteLang", "site-lang", "locale"];

  const readLang = () => {
    for (const k of READ_KEYS) {
      try {
        const v = (localStorage.getItem(k) || "").toLowerCase();
        if (v.startsWith("en")) return "en";
        if (v.startsWith("nl")) return "nl";
      } catch (e) { /* geen opslag beschikbaar */ }
    }
    return "nl";
  };

  /* ---------- teksten op de pagina zoeken ---------- */
  const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"]);
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const isLetterText = (n) => n.nodeType === 3 && /\p{L}/u.test(n.textContent);
  const items = [];

  const walk = (el) => {
    if (SKIP.has(el.tagName)) return;
    if (el.matches(".myrole, .bi, .pl-switch, [data-pl-skip], [data-en], [lang]:not(html)")) return;
    if ([...el.childNodes].some(isLetterText)) {
      const en = DICT[norm(el.textContent)];
      if (en !== undefined) {
        // met een icoon erin: alleen de tekst wisselen, het icoon blijft staan
        const keepKids = !!el.querySelector("svg, img");
        const textNodes = keepKids ? [...el.childNodes].filter(isLetterText) : null;
        items.push({ el, en, nl: el.innerHTML, keepKids, textNodes, nlTexts: textNodes && textNodes.map((n) => n.textContent) });
      }
      return;
    }
    [...el.children].forEach(walk);
  };
  walk(document.body);

  const attrItems = [...document.querySelectorAll("[data-en]")].map((el) => ({ el, nl: el.innerHTML, en: el.dataset.en }));

  /* ---------- knopje ---------- */
  const css = document.createElement("style");
  css.textContent = `
    .pl-switch {
      position: fixed; right: 1rem; bottom: 1rem; z-index: 150;
      display: flex; gap: 2px; padding: 3px;
      background: var(--pl-bg, rgba(0,0,0,.72));
      border: 1px solid var(--pl-line, rgba(255,255,255,.18));
      border-radius: var(--pl-r, 999px);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      font: 600 0.72rem/1 system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
      letter-spacing: .08em;
    }
    .pl-switch button {
      border: 0; cursor: pointer; padding: .5rem .7rem;
      border-radius: var(--pl-r, 999px);
      background: transparent; color: var(--pl-fg, #fff); opacity: .65;
      font: inherit; letter-spacing: inherit;
      transition: background .25s, color .25s, opacity .25s;
    }
    .pl-switch button:hover { opacity: 1; }
    .pl-switch button[aria-pressed="true"] { background: var(--pl-fg, #fff); color: var(--pl-on, #000); opacity: 1; }
    /* rol-blok: alleen de gekozen taal laten zien */
    html[data-pl="en"] .myrole [lang="nl"], html[data-pl="nl"] .myrole [lang="en"],
    html[data-pl="en"] .bi [lang="nl"], html[data-pl="nl"] .bi [lang="en"] { display: none !important; }
    html[data-pl] .myrole__cols, html[data-pl] .bi { grid-template-columns: 1fr !important; max-width: 46rem; }
    html[data-pl] .myrole__lang, html[data-pl] .bi__lang { display: none !important; }
  `;
  document.head.appendChild(css);

  const box = document.createElement("div");
  box.className = "pl-switch";
  box.setAttribute("role", "group");
  box.setAttribute("aria-label", "Taal / Language");
  box.innerHTML = `<button type="button" data-l="nl" lang="nl">NL</button><button type="button" data-l="en" lang="en">EN</button>`;
  document.body.appendChild(box);

  /* ---------- wisselen ---------- */
  let current = null;
  function apply(lang) {
    if (lang === current) return;
    current = lang;
    items.forEach((it) => {
      if (it.keepKids) {
        it.textNodes.forEach((n, i) => {
          n.textContent = lang === "en" ? (i === 0 ? ` ${it.en} ` : "") : it.nlTexts[i];
        });
      } else {
        it.el.innerHTML = lang === "en" ? it.en : it.nl;
      }
    });
    attrItems.forEach((it) => { it.el.innerHTML = lang === "en" ? it.en : it.nl; });
    document.documentElement.lang = lang;
    document.documentElement.dataset.pl = lang;
    box.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.l === lang)));
    try { localStorage.setItem(SAVE_KEY, lang); } catch (e) { /* niks */ }
    document.dispatchEvent(new CustomEvent("pl-change", { detail: lang }));
  }

  box.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-l]");
    if (b) apply(b.dataset.l);
  });

  // voor scripts op de pagina: PL.t("Nederlands", "English")
  window.PL = {
    get lang() { return current; },
    t: (nl, en) => (current === "en" ? en : nl),
    set: apply,
  };

  apply(readLang());
})();