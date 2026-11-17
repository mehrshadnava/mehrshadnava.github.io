(() => {
  const D = window.PORTFOLIO;
  const Doo = window.Doodles;
  ["name", "look", "origin", "work", "projects", "achievements", "hobbies", "contact"].forEach((k) =>
    console.assert(D && D[k], `data.js is missing "${k}"`)
  );

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, "0");
  const chips = (list = []) => `<ul class="chips">${list.map((t) => `<li>${t}</li>`).join("")}</ul>`;
  const decoNames = ["bolt", "gear", "target", "cross"];

  /* ---------- Doodles ---------- */
  document.body.insertAdjacentHTML("afterbegin", Doo.filters);
  const L = D.look;
  const scenes = {
    thumb: () => Doo.wave(L, "boil", "thumb"),
    wave: () => Doo.wave(L, "wobble"),
    "laptop-kid": () => Doo.laptop(L, true),
    laptop: () => Doo.laptop(L, false),
    trophy: () => Doo.trophy(L),
    bike: () => Doo.bike(L),
    peek: () => Doo.peek(L),
    plane: () => Doo.plane(),
  };
  $$("[data-scene]").forEach((el) => (el.innerHTML = scenes[el.dataset.scene]?.() ?? ""));
  $$("[data-doodle]").forEach((el) => (el.innerHTML = Doo.deco(el.dataset.doodle)));
  $$("[data-note]").forEach((el) => (el.innerHTML = D.notes?.[el.dataset.note] ?? ""));
  $(".note-hero").insertAdjacentHTML("beforeend", Doo.deco("arrow"));

  /* ---------- Content from data.js ---------- */
  document.title = `${D.name} — ${D.role}`;
  $$("[data-initials]").forEach((el) => (el.textContent = D.initials));
  $$("[data-name]").forEach((el) => (el.textContent = D.name));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  // No email given → "Say hi" goes to LinkedIn (or the first social link).
  const sayHi = D.email ? `mailto:${D.email}` : (D.socials.find((s) => /linkedin/i.test(s.label)) || D.socials[0])?.url || "#contact";
  $$("[data-mailto]").forEach((el) => {
    el.href = sayHi;
    if (!D.email) (el.target = "_blank"), (el.rel = "noopener");
    if (!el.textContent) el.textContent = D.email || "let's connect →";
  });

  const words = D.name.split(" ");
  $(".hero-title").innerHTML = words
    .map((w, i) => `<span class="hero-line"><span>${i === words.length - 1 && i > 0 ? `<em>${w}</em>` : w}</span></span>`)
    .join("");
  $(".hero-role").innerHTML = `<b>${D.role}.</b> ${D.tagline}`;

  const wordSpans = (text = "") => text.split(/\s+/).filter(Boolean).map((w) => `<span class="w">${w}</span>`).join(" ");
  $(".origin-text").innerHTML =
    wordSpans(D.origin.story) + (D.origin.highlight ? `<span class="origin-hl-line"><span class="origin-hl">${wordSpans(D.origin.highlight)}</span></span>` : "");
  $(".facts").innerHTML = D.origin.facts.map(([k, v]) => `<div class="fact"><dt>${k}</dt><dd>${v}</dd></div>`).join("");

  $(".work-track").insertAdjacentHTML(
    "beforeend",
    D.work
      .map(
        (j, i) => `<article class="job tape">
          <span class="job-index" aria-hidden="true">#${i + 1}</span>
          <span class="job-period">${j.period}</span>
          <h3 class="job-role">${j.role}</h3>
          <p class="job-company">@ ${j.company}</p>
          <p>${j.summary}</p>
          <ul class="hl">${j.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
          ${chips(j.stack)}
        </article>`
      )
      .join("")
  );

  $(".deck-list").innerHTML = D.projects
    .map((p, i) => `<li><span class="n">#${i + 1}</span><span>${p.title}</span><i class="bar"><i class="fill"></i></i></li>`)
    .join("");
  $(".deck").innerHTML = D.projects
    .map(
      (p, i) => `<article class="card" style="--c:${p.color || "var(--legal)"}">
        <div class="card-inner">
          <div class="face front tape" aria-hidden="true">
            ${Doo.deco(decoNames[i % decoNames.length])}
            <span class="num">#${i + 1}</span>
            <span class="title">${p.title}</span>
            <span class="kick">${p.kicker}</span>
          </div>
          <div class="face back tape">
            <span class="kick">${p.kicker}</span>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            ${chips(p.stack)}
            <div class="links">${(p.links || []).map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`).join("")}</div>
          </div>
        </div>
      </article>`
    )
    .join("");

  const circle = `<svg class="circle" viewBox="0 0 200 130" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path pathLength="1" d="M40 22 C90 2 182 16 190 62 C198 112 96 128 42 114 C2 102 6 44 58 26 C80 18 110 16 128 20"/></svg>`;
  $(".stats").innerHTML = D.achievements.stats
    .map(
      (s) => `<div class="stat reveal">${circle}
        <div class="stat-value"><span class="stat-num" data-value="${s.value}" data-decimals="${s.decimals || 0}">${s.value.toFixed(s.decimals || 0)}</span>${s.suffix ? `<sup>${s.suffix}</sup>` : ""}</div>
        <p>${s.label}</p>
      </div>`
    )
    .join("");
  const check = `<svg class="check" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7 q11 -2 22 0 q2 10 0 20 q-11 2 -22 0 q-2 -10 0 -20z"/><path class="tick" pathLength="1" stroke-width="3.5" d="M8 15 l6 8 l14 -20"/></svg>`;
  $(".milestones").innerHTML = D.achievements.milestones
    .map((m) => `<li class="reveal">${check}<span class="year">${m.year}</span><h3>${m.title}</h3><p>${m.detail}</p></li>`)
    .join("");

  $(".hobby-grid").innerHTML = D.hobbies
    .map((h) => `<div class="hobby tape"><div class="pic">${Doo.icon(h.icon, h.emoji)}</div><h3>${h.title}</h3><p>${h.text}</p></div>`)
    .join("");

  $(".contact-heading").innerHTML = `<strong>${D.contact.heading}</strong> ${D.contact.text}`;
  $(".socials").innerHTML = D.socials.map((s) => `<li><a class="sketch" href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`).join("");

  const sections = $$("main > section");
  $(".rail").innerHTML = sections
    .map((s) => `<a href="#${s.id}" data-label="${s.dataset.title}" aria-label="${s.dataset.title}"></a>`)
    .join("");

  /* ---------- Header label, progress bar, rail ---------- */
  const label = $(".chapter-label");
  const bar = $(".progress");
  const dots = $$(".rail a");
  // Pinned sections are wrapped in a .pin-spacer that holds their full scroll length.
  const box = (s) => (s.parentElement.classList.contains("pin-spacer") ? s.parentElement : s);
  let current = -1;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    const mid = innerHeight / 2;
    const i = sections.findIndex((s) => {
      const r = box(s).getBoundingClientRect();
      return r.top <= mid && r.bottom > mid;
    });
    if (i < 0 || i === current) return;
    current = i;
    const s = sections[i];
    label.textContent = i === 0 ? "Prologue" : `Ch. ${+s.dataset.num} · ${s.dataset.title}`;
    dots.forEach((d, j) => d.classList.toggle("active", j === i));
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Easter eggs ---------- */
  const bubble = $(".bubble");
  const lines = D.speech?.length ? D.speech : ["Hi!"];
  let said = 0;
  bubble.textContent = lines[0];
  const me = $(".me");
  me.addEventListener("click", () => {
    bubble.textContent = lines[(said = (said + 1) % lines.length)];
    me.classList.remove("jump");
    void me.offsetWidth; // restart the CSS animation
    me.classList.add("jump");
  });

  const toast = $(".toast");
  let toastTimer;
  const say = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  };
  const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let k = 0;
  addEventListener("keydown", (e) => {
    k = e.key.toLowerCase() === konami[k].toLowerCase() ? k + 1 : e.key === konami[0] ? 1 : 0;
    if (k < konami.length) return;
    k = 0;
    const on = document.documentElement.classList.toggle("cool");
    say(on ? "😎 cheat code accepted: +100 cool" : "okay, back to normal");
  });

  console.log(
    "%c✏️ Hey, fellow dev!%c\nLooking under the hood? Everything here is plain HTML, CSS & a little GSAP.\nSay hi → " + (D.email || sayHi),
    "font: 700 18px Caveat, cursive; color: #ff7a59",
    "font: 13px Nunito, sans-serif; color: #1f2a44"
  );

  /* ---------- Motion (skipped if GSAP failed to load or the user prefers reduced motion) ---------- */
  const motion = window.gsap && window.ScrollTrigger && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!motion) return;
  document.documentElement.classList.add("motion");
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  let lenis;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
      const target = $(a.getAttribute("href"));
      if (!target || !lenis) return;
      e.preventDefault();
      lenis.scrollTo(box(target), { duration: 1.6 });
    })
  );

  // "Write in" helpers: margin notes, highlighter swipes.
  const onEnter = (el, fn, start = "top 82%") => ScrollTrigger.create({ trigger: el, start, once: true, onEnter: fn });
  const mark = (el) => onEnter(el, () => el.classList.add("on"));

  // Prologue: intro, then the yellow blob behind you swallows the page and becomes Chapter 01.
  gsap.from(".hero-line > span", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.1, delay: 0.15 });
  gsap.from(".kicker, .hero-role, .scroll-cue > *", { opacity: 0, y: 16, duration: 0.8, stagger: 0.1, delay: 0.45 });
  // Intros animate inner elements so they never fight the scroll timeline below over the same properties.
  gsap.from(".me .doodle", { scale: 0.7, rotation: -8, opacity: 0, duration: 1.1, ease: "back.out(1.7)", delay: 0.2 });
  gsap.from(".deco > svg", { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.08, delay: 0.6 });
  setTimeout(() => {
    $(".hero-title").classList.add("on");
    $(".note-hero").classList.add("on");
  }, 1100);

  const orb = $(".hero-orb");
  const hero = $("#hero");
  gsap.set(orb, { x: 0, y: 0, xPercent: -50, yPercent: -50 });
  const orbScale = () => {
    let x = orb.offsetLeft, y = orb.offsetTop; // orb is centred on its left/top via xPercent/yPercent
    for (let el = orb.offsetParent; el && el !== hero; el = el.offsetParent) (x += el.offsetLeft), (y += el.offsetTop);
    const far = Math.max(Math.hypot(x, y), Math.hypot(innerWidth - x, y), Math.hypot(x, innerHeight - y), Math.hypot(innerWidth - x, innerHeight - y));
    return (far * 2 * 1.08) / orb.offsetWidth;
  };
  gsap
    .timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "+=130%", scrub: 0.6, pin: true, invalidateOnRefresh: true } })
    .to(".hero-line", { xPercent: (i) => (i % 2 ? 40 : -40), opacity: 0, ease: "power2.in", duration: 1 }, 0)
    .to(".hero-fade", { opacity: 0, y: -30, duration: 0.5 }, 0)
    .to(".deco", { y: () => -innerHeight * 0.6, rotation: (i) => (i % 2 ? 90 : -90), opacity: 0, duration: 0.8, stagger: 0.04 }, 0)
    .fromTo(".me, .bubble, .note-hero", { scale: 1, opacity: 1 }, { scale: 0.4, opacity: 0, duration: 0.6, ease: "power2.in" }, 0.15)
    .to(orb, { scale: orbScale, rotation: 30, ease: "power2.in", duration: 1.2 }, 0.1)
    .fromTo(".hero-next", { opacity: 0, y: 40, rotation: -4 }, { opacity: 1, y: 0, rotation: 0, duration: 0.5 }, 0.9);

  // 01 Origin: the story lights up word by word; then the note gets scribbled in.
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#origin", start: "top top", end: "+=150%", scrub: 0.5, pin: true,
        onUpdate: (st) => st.progress > 0.55 && $$("#origin .note, .origin-hl").forEach((el) => el.classList.add("on")),
      },
    })
    .to(".origin-text .w", { opacity: 1, stagger: 0.1, ease: "none" })
    .from(".fact", { y: 30, opacity: 0, stagger: 0.3, duration: 1 }, ">-0.5");

  // 02 Work: vertical scroll drives a horizontal row of index cards; a pencil draws the timeline.
  const track = $(".work-track");
  const rail = $(".work-rail");
  const dist = () => Math.max(0, track.scrollWidth - innerWidth);
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#work", start: "top top", end: () => "+=" + dist(), scrub: 0.6, pin: true, invalidateOnRefresh: true,
        onEnter: () => $$("#work .h2, #work .note").forEach((el) => el.classList.add("on")),
      },
    })
    .to(track, { x: () => -dist(), ease: "none" }, 0)
    .to(".work-progress", { scaleX: 1, ease: "none" }, 0)
    .to(".pencil", { x: () => rail.offsetWidth, ease: "none" }, 0);

  // 03 Projects: deal the deck, then flip each card and toss it aside.
  const cards = $$(".card");
  const fills = $$(".deck-list .fill");
  gsap.set(cards, { rotation: (i) => [-3, 2, -1.5, 3, -2][i % 5], zIndex: (i) => cards.length - i });
  const deal = gsap.timeline({
    scrollTrigger: {
      trigger: "#projects", start: "top top", end: () => "+=" + cards.length * 90 + "%", scrub: 0.6, pin: true,
      onEnter: () => $$("#projects .h2, #projects .note").forEach((el) => el.classList.add("on")),
    },
  });
  deal.from(cards, { y: () => innerHeight, rotation: (i) => (i % 2 ? 25 : -25), stagger: 0.12, duration: 1, ease: "power2.out" });
  cards.forEach((c, i) => {
    deal.to($(".card-inner", c), { rotationY: 180, duration: 1, ease: "power2.inOut" }).to(fills[i], { scaleX: 1, duration: 1 }, "<");
    if (i < cards.length - 1) deal.to(c, { x: () => -innerWidth, rotation: -18, duration: 1, ease: "power2.in" }, "+=0.6");
  });
  deal.to({}, { duration: 0.6 }); // hold on the last card

  // 04 Achievements: counters, hand-drawn circles, checklist ticks.
  $$(".stat-num").forEach((el) => {
    const d = +el.dataset.decimals;
    const o = { v: 0 };
    el.textContent = (0).toFixed(d);
    gsap.to(o, {
      v: +el.dataset.value, duration: 2, ease: "power3.out",
      onUpdate: () => (el.textContent = o.v.toFixed(d)),
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });
  const reveal = (sel) =>
    ScrollTrigger.batch(sel, {
      start: "top 88%",
      once: true,
      onEnter: (b) => {
        gsap.to(b, { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: "power3.out" });
        b.forEach((el, i) => setTimeout(() => el.classList.add("on"), 150 + i * 80));
      },
    });
  reveal("#achievements .reveal");

  // 05 Hobbies: polaroids get tossed onto the table while you cycle past.
  mark($("#hobbies .h2"));
  const hobbies = $$(".hobby");
  gsap.set(hobbies, { rotation: (i) => [-4, 3, -2, 5, -3, 2][i % 6] });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#hobbies", start: "top top", end: "+=150%", scrub: 0.6, pin: true,
        onUpdate: (st) => st.progress > 0.7 && $(".note-hobbies").classList.add("on"),
      },
    })
    .from(hobbies, {
      y: () => innerHeight, x: (i) => (i % 2 ? 1 : -1) * 160, rotation: (i) => (i % 2 ? 40 : -40),
      stagger: 0.25, duration: 1, ease: "power2.out",
    }, 0)
    .fromTo(".rider", { x: () => -$(".rider").offsetWidth }, { x: () => innerWidth, ease: "none", duration: 2.6 }, 0)
    .to(".rider .wheel", { rotation: 1080, transformOrigin: "50% 50%", ease: "none", duration: 2.6 }, 0);

  // 06 Epilogue
  reveal("#contact .reveal");

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  ScrollTrigger.addEventListener("refresh", onScroll);
})();
