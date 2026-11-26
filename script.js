// ---------- Hero video: altijd vanzelf afspelen (ook op iPhone) ----------
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  // Safari wil dit soms als eigenschap én niet alleen in de HTML
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.playsInline = true;
  heroVideo.setAttribute("muted", "");
  heroVideo.setAttribute("playsinline", "");
  heroVideo.setAttribute("webkit-playsinline", "");

  const tryPlay = () => {
    const p = heroVideo.play();
    if (p && p.catch) p.catch(() => {}); // geblokkeerd? dan wachten op een tik/scroll
  };

  tryPlay();
  heroVideo.addEventListener("loadeddata", tryPlay);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tryPlay(); });
  window.addEventListener("pageshow", tryPlay);

  // Energiebesparingsmodus blokkeert autoplay: start bij de eerste aanraking of scroll
  const unlock = () => {
    tryPlay();
    if (!heroVideo.paused) {
      ["touchstart", "click", "scroll"].forEach((ev) => window.removeEventListener(ev, unlock));
    }
  };
  ["touchstart", "click", "scroll"].forEach((ev) =>
    window.addEventListener(ev, unlock, { passive: true })
  );
}

// ---------- Navbar: achtergrond na de hero ----------
const nav = document.getElementById("nav");
const hero = document.getElementById("home");

const onScroll = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > hero.offsetHeight - 80);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Mobiel menu ----------
// haalt de vertaalde tekst op (uit lang.js)
const currentText = (key) => {
  const code = document.documentElement.lang || "en";
  return (I18N[code] && I18N[code][key]) || I18N.en[key];
};
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
  toggle.dataset.i18n = open ? "nav.close" : "nav.menu";
  toggle.textContent = currentText(toggle.dataset.i18n);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", false);
    toggle.dataset.i18n = "nav.menu";
    toggle.textContent = currentText("nav.menu");
  })
);

// ---------- Actieve link in de navbar ----------
const navAnchors = links.querySelectorAll("a");
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) =>
        a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

/* =========================================================
   ANIMATIES BIJ SCROLLEN (met GSAP)
   Let op: de animaties voor de hero, about, skills, de projectenlijst
   en contact staan in index.html. Hier staan alleen de dingen
   die daar niet in zitten, zodat niks dubbel geanimeerd wordt.
   ========================================================= */
(() => {
  if (!window.gsap || !window.ScrollTrigger) return; // geen internet? dan gewoon zonder animaties
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);

  // titels schuiven omhoog uit een masker
  gsap.utils.toArray(".mask__in").forEach((el) => {
    gsap.from(el, {
      yPercent: 110,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  // projecten: lijnen tekenen zichzelf
  const list = document.querySelector(".projects__list");
  if (list) {
    gsap.fromTo(list, { "--draw": 0 }, { "--draw": 1, duration: 1.2, ease: "expo.inOut", scrollTrigger: { trigger: list, start: "top 85%" } });
    gsap.utils.toArray(".projects__list li").forEach((li) => {
      gsap.fromTo(li, { "--draw": 0 }, { "--draw": 1, duration: 1.1, ease: "expo.inOut", scrollTrigger: { trigger: li, start: "top 88%" } });
    });
  }
})();