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

// ---------- Zwevende project preview (alleen desktop) ----------
const preview = document.getElementById("preview");
const previewImg = document.getElementById("previewImg");
const canHover = window.matchMedia("(hover: hover) and (min-width: 721px)").matches;

if (canHover) {
  let x = 0, y = 0, cx = 0, cy = 0;

  // preview lichtjes achter de cursor aan laten lopen
  const follow = () => {
    cx += (x - cx) * 0.15;
    cy += (y - cy) * 0.15;
    preview.style.left = `${cx}px`;
    preview.style.top = `${cy}px`;
    requestAnimationFrame(follow);
  };
  follow();

  window.addEventListener("mousemove", (e) => {
    x = e.clientX + 180;
    y = e.clientY;
  });

  document.querySelectorAll(".project").forEach((project) => {
    project.addEventListener("mouseenter", () => {
      previewImg.src = project.dataset.img;
      preview.classList.add("is-visible");
    });
    project.addEventListener("mouseleave", () => {
      preview.classList.remove("is-visible");
    });
  });
}

/* =========================================================
   ANIMATIES — After Effects stijl (met GSAP)
   ========================================================= */
(() => {
  if (!window.gsap) return; // geen internet? dan gewoon zonder animaties
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- 1. KINETIC TYPOGRAPHY REEL (interactief) ---------- */
  const reel = document.getElementById("reel");
  const stage = reel.querySelector(".reel__stage");
  const fx = reel.querySelector(".reel__fx");
  const bg = reel.querySelector(".reel__bg");
  const circle = reel.querySelector(".reel__circle");
  const ring = reel.querySelector(".reel__ring");
  const lines = reel.querySelectorAll(".reel__lines span");
  const cursor = reel.querySelector(".reel__cursor");
  const countEl = reel.querySelector(".reel__count");
  const barEl = reel.querySelector(".reel__bar i");
  const word = (n) => reel.querySelector(`[data-word="${n}"]`);
  const [w1, w2, w3, w4, small] = [1, 2, 3, 4, 5].map(word);
  const chars = (el) => el.querySelectorAll(".ch");
  const SCENES = ["s1", "s2", "s3", "s4"];

  let tl = null;
  let inView = false;
  let repel = []; // { el, qx, qy, qr }

  // tekst in losse letters knippen (Arabisch per woord, anders breken de letters)
  // .ch = wordt geanimeerd door de tijdlijn, .chi = reageert op je muis
  function split(el) {
    const text = reel.querySelector(`[data-reel-src="${el.dataset.word}"]`).textContent.trim();
    const isArabic = /[\u0600-\u06FF]/.test(text);
    const parts = isArabic ? text.split(/(\s+)/) : [...text];
    el.innerHTML = parts.map((p) => `<span class="ch"><span class="chi">${p}</span></span>`).join("");
  }

  // woord laten passen in de breedte van het scherm
  function fit(el) {
    el.style.fontSize = "";
    const max = stage.clientWidth * 0.86;
    const w = el.scrollWidth;
    if (w > max) {
      const size = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${(size * max) / w}px`;
    }
  }

  function buildReel() {
    if (tl) tl.kill();
    [w1, w2, w3, w4, small].forEach((el) => { split(el); fit(el); });

    // muis-reactie per letter
    repel = [...reel.querySelectorAll(".reel__word .chi")].map((el) => ({
      el,
      qx: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
      qy: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
      qr: gsap.quickTo(el, "rotate", { duration: 0.6, ease: "power3.out" }),
    }));

    if (reduce) {
      gsap.set(w1, { autoAlpha: 1 });
      return;
    }

    const honey = getComputedStyle(document.documentElement).getPropertyValue("--honey").trim();
    const rnd = gsap.utils.random;

    tl = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "expo.out" }, onUpdate: updateUI });

    // beginstand
    tl.set(bg, { scaleY: 0, transformOrigin: "50% 100%" })
      .set(circle, { clipPath: "circle(0% at 50% 50%)" })
      .set([w1, w2, w3, w4, small], { autoAlpha: 0, scale: 1, scaleX: 1, x: 0, rotate: 0 })
      .set(w3, { color: "transparent", clipPath: "inset(0% 0% 0% 0%)" })
      .set(lines, { scaleX: 0, transformOrigin: "0% 50%" })
      .set(ring, { autoAlpha: 0 });

    // SCÈNE 1 — letters springen omhoog uit een masker, cirkel draait open
    tl.addLabel("s1")
      .set(w1, { autoAlpha: 1 })
      .fromTo(chars(w1), { yPercent: 120, rotate: 14 }, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.045, ease: "back.out(1.7)" })
      .fromTo(ring, { scale: 0, rotate: -120, autoAlpha: 1 }, { scale: 1, rotate: 0, duration: 1.3 }, "<0.1")
      .to(chars(w1), { yPercent: -120, rotate: -10, duration: 0.5, stagger: 0.03, ease: "power3.in" }, "+=0.9")
      .to(ring, { scale: 1.7, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, "<")
      .set(w1, { autoAlpha: 0 })

    // OVERGANG — honingkleurig vlak wipet omhoog
      .to(bg, { scaleY: 1, duration: 0.8, ease: "expo.inOut" }, "-=0.25")

    // SCÈNE 2 — woord knalt in beeld (zoom + draai + letterafstand)
      .addLabel("s2", "-=0.3")
      .set(w2, { autoAlpha: 1 }, "s2")
      .fromTo(w2, { scale: 2.6, rotate: -14, letterSpacing: "0.4em" }, { scale: 1, rotate: 0, letterSpacing: "-0.01em", duration: 1.1 }, "s2")
      .to(w2, { scaleX: 0, duration: 0.45, ease: "expo.in" }, "+=0.8")
      .set(w2, { autoAlpha: 0, scaleX: 1 })

    // OVERGANG — zwarte cirkel opent vanuit het midden
      .to(circle, { clipPath: "circle(75% at 50% 50%)", duration: 0.9, ease: "expo.inOut" }, "-=0.15")
      .set(bg, { scaleY: 0 })

    // SCÈNE 3 — lijnen schieten erdoor, outline woord rekt uit en vult zich
      .addLabel("s3", "-=0.35")
      .set(w3, { autoAlpha: 1 }, "s3")
      .fromTo(lines, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.7, stagger: 0.08, ease: "expo.inOut" }, "s3")
      .fromTo(w3, { scaleX: 0.12, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1 }, "s3+=0.25")
      .to(w3, { color: honey, duration: 0.5, ease: "power2.out" }, "+=0.15")
      .to(lines, { scaleX: 0, transformOrigin: "100% 50%", duration: 0.6, stagger: 0.06, ease: "expo.inOut" }, "+=0.45")
      .to(w3, { clipPath: "inset(0% 0% 0% 100%)", duration: 0.6, ease: "expo.inOut" }, "<")
      .set(w3, { autoAlpha: 0 })

    // SCÈNE 4 — letters vliegen van overal naar hun plek, daarna typt de tagline
      .addLabel("s4")
      .set(w4, { autoAlpha: 1 })
      .fromTo(
        chars(w4),
        { x: () => rnd(-450, 450), y: () => rnd(-320, 320), rotate: () => rnd(-200, 200), scale: () => rnd(0.3, 2.2), opacity: 0 },
        { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.3, stagger: { each: 0.04, from: "random" } }
      )
      .set(small, { autoAlpha: 1 })
      .fromTo(chars(small), { opacity: 0 }, { opacity: 1, duration: 0.01, stagger: 0.055, ease: "none" }, "-=0.3")
      .to([w4, small], { scale: 0.85, autoAlpha: 0, duration: 0.6, ease: "power3.in" }, "+=1.5")
      .set(circle, { clipPath: "circle(0% at 50% 50%)" })
      .addLabel("end");

    if (inView) tl.play();
  }

  // teller + voortgangsbalk bijwerken
  function updateUI() {
    if (!tl) return;
    const t = tl.time();
    const times = [...SCENES, "end"].map((l) => tl.labels[l]);
    let i = 0;
    while (i < 3 && t >= times[i + 1]) i++;
    const progress = (t - times[i]) / (times[i + 1] - times[i]);
    countEl.innerHTML = `<b>0${i + 1}</b> / 04`;
    barEl.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  }

  buildReel();

  // ---- klik = volgende scène ----
  reel.addEventListener("click", () => {
    if (!tl) return;
    const t = tl.time();
    const next = SCENES.find((l) => tl.labels[l] > t + 0.05) || "s1";
    tl.seek(next).play();
    // klein "klik" effect op de cursor
    gsap.fromTo(cursor, { scale: 0.7 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  });

  // ---- muis: cursor volgt, beeld kantelt, letters wijken uit ----
  const cx = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
  const cy = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
  const tiltX = gsap.quickTo(fx, "rotationX", { duration: 0.8, ease: "power3.out" });
  const tiltY = gsap.quickTo(fx, "rotationY", { duration: 0.8, ease: "power3.out" });
  const ringX = gsap.quickTo(ring, "x", { duration: 1, ease: "power3.out" });
  const ringY = gsap.quickTo(ring, "y", { duration: 1, ease: "power3.out" });

  reel.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") gsap.to(cursor, { scale: 1, duration: 0.4, ease: "back.out(2)" });
  });
  reel.addEventListener("pointerleave", () => {
    gsap.to(cursor, { scale: 0, duration: 0.3 });
    tiltX(0); tiltY(0); ringX(0); ringY(0);
    repel.forEach((r) => { r.qx(0); r.qy(0); r.qr(0); });
  });

  reel.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || reduce) return;
    const r = reel.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    cx(x); cy(y);

    // -1 tot 1 vanaf het midden
    const nx = (x / r.width) * 2 - 1;
    const ny = (y / r.height) * 2 - 1;
    tiltY(nx * 10);
    tiltX(-ny * 8);
    ringX(nx * 40);
    ringY(ny * 40);

    // letters dichtbij de muis worden weggeduwd
    const radius = 200;
    repel.forEach(({ el, qx, qy, qr }) => {
      const b = el.parentElement.getBoundingClientRect();
      if (!b.width) return;
      const dx = b.left + b.width / 2 - e.clientX;
      const dy = b.top + b.height / 2 - e.clientY;
      const d = Math.hypot(dx, dy);
      const f = Math.max(0, 1 - d / radius);
      qx((dx / (d || 1)) * f * 60);
      qy((dy / (d || 1)) * f * 60);
      qr((dx > 0 ? 1 : -1) * f * 18);
    });
  });

  // alleen afspelen als de reel in beeld is
  if (window.ScrollTrigger) {
    ScrollTrigger.create({
      trigger: reel,
      start: "top 75%",
      end: "bottom 25%",
      onToggle: (self) => {
        inView = self.isActive;
        if (tl) inView ? tl.play() : tl.pause();
      },
    });
  }

  // bij andere taal of schermformaat opnieuw opbouwen
  document.addEventListener("langchange", () => requestAnimationFrame(() => { buildReel(); window.ScrollTrigger?.refresh(); }));
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(buildReel, 250); });

  if (reduce || !window.ScrollTrigger) return;

  /* ---------- 2. REVEALS BIJ SCROLLEN ---------- */

  // titels schuiven omhoog uit een masker
  gsap.utils.toArray(".mask__in").forEach((el) => {
    gsap.from(el, {
      yPercent: 110,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  // About: foto wipet omhoog in beeld, beeld zoomt uit
  gsap.utils.toArray(".about__photo").forEach((fig, i) => {
    const tlp = gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 80%" } });
    tlp.fromTo(fig, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", delay: i * 0.15 })
       .fromTo(fig.querySelector("img"), { scale: 1.35 }, { scale: 1, duration: 1.8, ease: "expo.out" }, "<0.2");
  });

  // About: alinea's een voor een
  gsap.from(".about__text p", {
    y: 40,
    opacity: 0,
    duration: 1.1,
    stagger: 0.12,
    ease: "expo.out",
    scrollTrigger: { trigger: ".about__text", start: "top 75%" },
  });

  // Skills: lijstjes rollen omhoog per kolom
  gsap.utils.toArray(".skills__group").forEach((group, i) => {
    gsap.from(group.querySelectorAll("h3, li"), {
      yPercent: 100,
      opacity: 0,
      duration: 0.9,
      stagger: 0.06,
      delay: i * 0.12,
      ease: "expo.out",
      scrollTrigger: { trigger: ".skills__cols", start: "top 80%" },
    });
  });

  // Projects: lijnen tekenen zichzelf, namen schuiven omhoog
  const list = document.querySelector(".projects__list");
  gsap.fromTo(list, { "--draw": 0 }, { "--draw": 1, duration: 1.2, ease: "expo.inOut", scrollTrigger: { trigger: list, start: "top 85%" } });
  gsap.utils.toArray(".projects__list li").forEach((li) => {
    const tli = gsap.timeline({ scrollTrigger: { trigger: li, start: "top 88%" } });
    tli.fromTo(li, { "--draw": 0 }, { "--draw": 1, duration: 1.1, ease: "expo.inOut" })
       .from(li.querySelector(".project__name"), { yPercent: 110, duration: 1, ease: "expo.out" }, "<0.15")
       .from(li.querySelector(".project__type"), { opacity: 0, x: -20, duration: 0.8, ease: "expo.out" }, "<0.2");
  });

  // Contact: mail en socials na de titel
  gsap.from(".contact__sub, .contact__mail, .contact__socials li", {
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.08,
    ease: "expo.out",
    scrollTrigger: { trigger: ".contact__sub", start: "top 90%" },
  });
})();