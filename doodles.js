/*
  Hand-drawn SVG doodles: the "you" character in every scene, hobby icons and page decorations.
  The character's look comes from PORTFOLIO.look in data.js.
*/
window.Doodles = (() => {
  const svg = (vb, body, cls = "") =>
    `<svg class="doodle ${cls}" viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

  // A thick outlined limb: ink outline underneath, colour on top.
  const limb = (d, color, w = 16) => `<path d="${d}" stroke-width="${w + 6}"/><path d="${d}" stroke="${color}" stroke-width="${w}"/>`;
  const hand = (x, y, r, skin) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${skin}"/>`;

  function head(L, { x, y, s = 1, kid = false, mouth = "smile", helmet = false }) {
    const { hair, skin } = L;
    const short = `<path d="M-36 -4 C-40 -40 -14 -50 4 -48 C28 -46 42 -30 36 -2 C30 -20 16 -26 0 -24 C-14 -24 -28 -18 -36 -4 Z" fill="${hair}"/>`;
    const tops = {
      short,
      // Full hair with a fringe swept across the forehead.
      swept: `<path d="M-39 4 C-46 -34 -20 -56 6 -54 C34 -52 48 -32 39 2 C37 -10 32 -20 25 -24 C14 -12 -4 -10 -22 -14 C-30 -10 -35 -4 -39 4 Z" fill="${hair}"/><path d="M-6 -44 q12 8 24 20 M-20 -38 q10 10 14 20 M6 -50 q14 4 22 16" stroke-width="2" opacity=".55"/>`,
      long: short,
      bun: short + `<circle cx="0" cy="-50" r="12" fill="${hair}"/>`,
      curly: [[-32, -12, 10], [-24, -30, 13], [-6, -40, 14], [12, -40, 14], [27, -30, 12], [34, -12, 10]]
        .map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${hair}"/>`)
        .join(""),
      buzz: `<path d="M-34 -10 C-34 -36 -14 -42 0 -42 C14 -42 34 -36 34 -10 C24 -24 12 -28 0 -28 C-12 -28 -24 -24 -34 -10 Z" fill="${hair}" opacity=".6"/>`,
      none: "",
    };
    const back = L.hairStyle === "long" ? `<path d="M-40 -8 C-48 30 -46 62 -38 84 L38 84 C46 62 48 30 40 -8 Z" fill="${hair}"/>` : "";
    const beard = L.beard && !kid ? `<path d="M-32 8 C-30 40 -12 50 0 50 C12 50 30 40 32 8 C24 26 12 30 0 30 C-12 30 -24 26 -32 8 Z" fill="${hair}"/>` : "";
    const glasses = L.glasses
      ? `<g class="specs"><circle cx="-13" cy="0" r="11" fill="#fff" fill-opacity=".3"/><circle cx="13" cy="0" r="11" fill="#fff" fill-opacity=".3"/><path d="M-2 -1 h4 M-24 -3 l-10 -3 M24 -3 l10 -3" stroke-width="2.5"/></g>`
      : "";
    const stubble = L.stubble && !kid ? `<path d="M-31 10 C-27 38 -12 47 0 47 C12 47 27 38 31 10 C22 24 10 28 0 28 C-10 28 -22 24 -31 10 Z M-14 14 q14 -6 28 0 v3 q-14 -4 -28 0z" fill="${hair}" stroke="none" opacity=".16"/>` : "";
    const mouthPath =
      mouth === "open" ? `<path d="M-14 16 q14 19 28 0 z" fill="#fff"/><path d="M-10 19 h20" stroke-width="1.5"/>` : `<path d="M-11 19 q11 10 22 0"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${back}
      <ellipse cx="-34" cy="4" rx="6" ry="9" fill="${skin}"/><ellipse cx="34" cy="4" rx="6" ry="9" fill="${skin}"/>
      <ellipse rx="34" ry="${kid ? 36 : 38}" fill="${skin}"/>
      ${stubble}${beard}${tops[L.hairStyle] ?? short}
      <path d="M-21 -12 q7 -5 14 0 M7 -12 q7 -5 14 0" stroke-width="2.5"/>
      <g class="eyes"><circle cx="-13" cy="0" r="3.4" fill="currentColor"/><circle cx="13" cy="0" r="3.4" fill="currentColor"/></g>
      ${glasses}
      <path d="M0 5 q-4 8 2 10" stroke-width="2.5"/>
      ${mouthPath}
      ${helmet ? `<path d="M-41 -2 C-46 -46 -14 -60 4 -58 C36 -56 50 -34 43 -2 C30 -9 -28 -9 -41 -2 Z" fill="#1b1f27"/><path d="M-30 -38 C-10 -52 18 -52 36 -34" stroke="#ff6a13" stroke-width="6"/>` : ""}
      <g class="shades"><path d="M-27 -8 h23 v7 q0 10 -11.5 10 q-11.5 0 -11.5 -10z M4 -8 h23 v7 q0 10 -11.5 10 q-11.5 0 -11.5 -10z" fill="currentColor"/><path d="M-4 -6 h8 M-27 -6 l-8 -3 M27 -6 l8 -3"/></g>
    </g>`;
  }

  // Shirt collar + optional lanyard, shared by the head-and-shoulders poses.
  const torso = (L, top) => `
    <path d="M106 ${top - 50} h28 v56 h-28z" fill="${L.skin}"/>
    <path d="M48 264 C50 ${top + 28} 78 ${top} 120 ${top} C162 ${top} 190 ${top + 28} 192 264 Z" fill="${L.shirt}"/>
    ${L.lanyard ? `<path d="M108 ${top + 2} L98 264 M132 ${top + 2} L142 264" stroke="${L.lanyard}" stroke-width="6"/>` : ""}
    <path d="M106 ${top} l-10 16 l20 6 z M134 ${top} l10 16 l-20 6 z" fill="${L.shirt}"/>`;

  // Head-and-shoulders. pose "thumb" = thumbs-up (prologue), "wave" = goodbye (epilogue).
  const wave = (L, filter, pose = "wave") => {
    const arm =
      pose === "thumb"
        ? `<g class="thumb">${limb("M176 212 C198 196 206 172 204 146", L.shirt)}
            <path d="M190 128 q-2 -24 8 -26 q8 0 5 13 l-2 11" fill="${L.skin}"/>
            <path d="M186 128 h26 q7 0 7 8 v14 q0 9 -9 9 h-20 q-7 0 -7 -7 v-18 q0 -6 3 -6z" fill="${L.skin}"/>
            <path d="M188 138 h22 M188 147 h22" stroke-width="2"/></g>`
        : `<g class="wave">${limb("M176 212 C196 190 206 162 208 134", L.shirt)}${hand(208, 122, 12, L.skin)}<path d="M199 108 l-3 -8 M208 106 v-9 M217 108 l3 -8" stroke-width="2.5"/></g>`;
    return svg(
      "0 0 240 262",
      `<g filter="url(#${filter})">${arm}${torso(L, 158)}${head(L, { x: 120, y: 98, mouth: "open" })}</g>`
    );
  };

  // At a laptop: the kid version breaks it, the grown-up version has stickers and coffee.
  const laptop = (L, kid) =>
    svg(
      "0 0 260 232",
      `<g filter="url(#wobble)">
        <path d="M118 ${kid ? 104 : 96} h24 v34 h-24z" fill="${L.skin}"/>
        <path d="${kid ? "M76 232 C78 164 100 126 130 126 C160 126 182 164 184 232 Z" : "M56 232 C58 150 88 118 130 118 C172 118 202 150 204 232 Z"}" fill="${L.shirt}"/>
        ${head(L, kid ? { x: 130, y: 86, s: 1.02, kid: true, mouth: "open" } : { x: 130, y: 76, s: 0.9 })}
        <path d="M80 220 L88 154 H172 L180 220 Z" fill="${kid ? "#cfc9bb" : "#dfe6f3"}"/>
        ${
          kid
            ? `<path d="M96 168 h68 M96 176 h68" stroke-width="2"/><circle cx="130" cy="198" r="9" fill="#ff6a13"/>
               <g class="smoke"><path d="M168 124 c-14 -4 -10 -22 4 -18 c2 -12 22 -10 20 2 c12 0 12 16 0 16 z" fill="#fff"/><path d="M188 90 c-8 -2 -6 -13 2 -11 c1 -7 13 -6 12 1 c7 0 7 10 0 10 z" fill="#fff"/></g>
               <text x="206" y="84" font-family="Permanent Marker, Impact, sans-serif" font-size="26" fill="currentColor" stroke="none">?!</text>`
            : `<circle cx="110" cy="176" r="10" fill="#ff6a13"/><rect x="132" y="166" width="28" height="16" rx="3" fill="#1b1f27" transform="rotate(-8 146 174)"/>
               <path d="M120 202 l7 -9 7 9 -7 9z" fill="#6b7f3a"/><path d="M146 198 l-5 5 5 5 M154 198 l5 5 -5 5" stroke-width="2"/>
               <g transform="translate(206 184)"><path d="M0 0 h28 v26 q0 8 -8 8 h-12 q-8 0 -8 -8z" fill="#fff"/><path d="M28 6 q10 0 10 8 q0 8 -10 8"/>
               <g class="steam"><path d="M8 -6 q-4 -6 0 -12 q4 -6 0 -12 M19 -6 q-4 -6 0 -12 q4 -6 0 -12" stroke-width="2.5"/></g></g>`
        }
        <path d="M6 222 H254"/>
      </g>`
    );

  // Holding up a trophy.
  const trophy = (L) =>
    svg(
      "0 -44 240 306",
      `<g filter="url(#wobble)">
        ${limb("M74 214 C58 160 66 80 90 26", L.shirt)}${limb("M166 214 C182 160 174 80 150 26", L.shirt)}
        ${torso(L, 178)}
        ${head(L, { x: 120, y: 108, mouth: "open" })}
        <path d="M96 -10 h48 v14 q0 30 -24 32 q-24 -2 -24 -32z" fill="#ffd34d"/>
        <path d="M96 -4 q-14 0 -12 12 q2 10 14 10 M144 -4 q14 0 12 12 q-2 10 -14 10"/>
        <path d="M116 36 h8 v10 h-8z M106 46 h28 v9 h-28z" fill="#ffd34d"/>
        <path d="M120 0 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1z" fill="#fff" stroke-width="2"/>
        ${hand(90, 18, 11, L.skin)}${hand(150, 18, 11, L.skin)}
        <g class="sparkles" stroke-width="2.5"><path d="M54 -20 v14 M47 -13 h14"/><path d="M190 -4 v14 M183 3 h14"/><path d="M178 -36 v10 M173 -31 h10"/><path d="M62 30 v10 M57 35 h10"/></g>
      </g>`
    );

  // Riding a motorbike, helmet on (side view, facing right). Wheels are rotated by the scroll timeline.
  const bike = (L) => {
    const jacket = "#3a3f47";
    const wheel = (cx) =>
      `<g class="wheel"><circle cx="${cx}" cy="170" r="36" fill="#2b2f36"/><circle cx="${cx}" cy="170" r="22" fill="#fff"/><path d="M${cx} 148 v44 M${cx - 22} 170 h44 M${cx - 15} 155 l30 30 M${cx + 15} 155 l-30 30" stroke-width="2"/><circle cx="${cx}" cy="170" r="5" fill="currentColor"/></g>`;
    return svg(
      "0 -34 300 248",
      `<g filter="url(#wobble)">
        ${wheel(62)}${wheel(236)}
        ${limb("M118 160 L40 156", "#9aa0a8", 7)}
        <path d="M62 170 L132 148" stroke-width="7"/>
        <path d="M112 132 h62 l10 22 h-58 z" fill="#4a4f58"/>
        <path d="M74 118 q6 -12 40 -12 l40 2 l6 14 l-82 8 q-6 -4 -4 -12 z" fill="#1b1f27"/>
        <path d="M144 106 q22 -22 56 -10 l8 16 q-32 12 -62 8 z" fill="#ff6a13"/>
        <path d="M236 170 L206 92" stroke-width="7"/>
        <circle cx="214" cy="110" r="8" fill="#ffd34d"/>
        <path d="M206 92 l-14 -10"/>
        ${limb("M108 104 L152 118 L140 152", L.pants || "#3b4a6b", 13)}
        <path d="M128 148 h22 q6 0 6 6 v4 h-30 z" fill="#1b1f27"/>
        ${limb("M106 102 L150 54", jacket, 24)}
        ${limb("M150 58 L180 76 L196 84", jacket, 12)}${hand(198, 84, 7, "#1b1f27")}
        ${head(L, { x: 162, y: 20, s: 0.62, helmet: true })}
      </g>`,
      "bike"
    );
  };

  // Peeking over an edge.
  const peek = (L) =>
    svg(
      "0 0 200 118",
      `<g filter="url(#wobble)">${head(L, { x: 100, y: 64, s: 0.9 })}<path d="M4 112 H196"/>${hand(60, 108, 10, L.skin)}${hand(140, 108, 10, L.skin)}<path d="M54 100 v6 M60 99 v7 M66 100 v6 M134 100 v6 M140 99 v7 M146 100 v6" stroke-width="2"/></g>`
    );

  const plane = () =>
    svg("0 0 64 40", `<path d="M2 20 L62 2 L40 38 L30 24 Z" fill="#fff"/><path d="M62 2 L30 24 L28 36 L36 28"/>`, "plane");

  // Hobby icons (64×64). Unknown names fall back to the emoji in data.js.
  const blob = (c) => `<circle cx="32" cy="34" r="24" fill="${c}" stroke="none"/>`;
  const icons = {
    camera: blob("#ffc59e") + `<rect x="10" y="22" width="44" height="30" rx="6" fill="#fff"/><path d="M22 22 l4 -7 h12 l4 7"/><circle cx="32" cy="37" r="9"/><circle cx="32" cy="37" r="3" fill="currentColor"/><circle cx="47" cy="29" r="1.5" fill="currentColor"/>`,
    chess: blob("#c9d3de") + `<circle cx="32" cy="15" r="7" fill="#fff"/><path d="M24 29 h16 l-3 -7 h-10z M27 29 l-4 18 h18 l-4 -18" fill="#fff"/><rect x="18" y="47" width="28" height="7" rx="2" fill="#fff"/>`,
    bike: blob("#c5cba0") + `<circle cx="16" cy="42" r="10" fill="#fff"/><circle cx="48" cy="42" r="10" fill="#fff"/><path d="M16 42 L28 26 L40 42 Z M28 26 L25 18 M20 18 h10 M40 42 L45 20 h7"/>`,
    motorbike: blob("#e3c79a") + `<circle cx="15" cy="44" r="10" fill="#2b2f36"/><circle cx="15" cy="44" r="4" fill="#fff"/><circle cx="50" cy="44" r="10" fill="#2b2f36"/><circle cx="50" cy="44" r="4" fill="#fff"/><path d="M15 44 L26 36 h18 l6 8"/><path d="M14 28 q8 -4 16 -2 l2 6 h-18z" fill="currentColor"/><path d="M30 28 q8 -8 16 -2 l1 6 h-17z" fill="#ff6a13"/><path d="M46 30 l4 -10 h6"/>`,
    gym: blob("#c9d3de") + `<path d="M18 34 h28" stroke-width="4"/><rect x="11" y="20" width="8" height="28" rx="2" fill="currentColor"/><rect x="45" y="20" width="8" height="28" rx="2" fill="currentColor"/><rect x="4" y="25" width="7" height="18" rx="2" fill="#ff6a13"/><rect x="53" y="25" width="7" height="18" rx="2" fill="#ff6a13"/>`,
    running: blob("#c5cba0") + `<path d="M12 44 q0 -12 10 -14 l8 -8 q6 4 10 2 l2 8 q14 2 16 8 q2 6 -2 6 h-40 q-4 0 -4 -2z" fill="#fff"/><path d="M10 48 h48" stroke-width="4"/><path d="M27 27 l4 4 M31 24 l4 4" stroke-width="2"/><path d="M0 30 h8 M2 37 h6" stroke="#ff6a13"/>`,
    music: blob("#c9d3de") + `<rect x="8" y="24" width="48" height="24" rx="3" fill="#fff"/><path d="M16 24 v14 M24 24 v14 M32 24 v14 M40 24 v14 M48 24 v14"/><path d="M46 6 v12" /><circle cx="43" cy="18" r="3" fill="currentColor"/><path d="M46 6 l7 3"/>`,
    cooking: blob("#e3c79a") + `<circle cx="26" cy="38" r="15" fill="#fff"/><path d="M41 38 h17"/><circle cx="26" cy="38" r="6" fill="#ffd34d"/><path d="M20 16 q4 -4 0 -8 M30 16 q4 -4 0 -8" stroke-width="2.5"/>`,
    book: blob("#c9d3de") + `<path d="M8 20 q12 -6 24 0 v30 q-12 -6 -24 0z M56 20 q-12 -6 -24 0 v30 q12 -6 24 0z" fill="#fff"/><path d="M14 28 q6 -2 12 0 M14 36 q6 -2 12 0 M38 28 q6 -2 12 0" stroke-width="2"/>`,
    code: blob("#c9d3de") + `<path d="M22 22 l-10 10 10 10 M42 22 l10 10 -10 10 M36 18 l-8 28"/>`,
    coffee: blob("#e3c79a") + `<path d="M14 26 h30 v16 q0 10 -10 10 h-10 q-10 0 -10 -10z" fill="#fff"/><path d="M44 30 q10 0 10 6 q0 6 -10 6 M22 18 q-3 -4 0 -8 M32 18 q-3 -4 0 -8" />`,
    game: blob("#c9d3de") + `<path d="M12 26 h40 q8 0 8 10 q0 14 -8 14 q-6 0 -10 -6 h-20 q-4 6 -10 6 q-8 0 -8 -14 q0 -10 8 -10z" fill="#fff"/><path d="M20 36 h10 M25 31 v10" /><circle cx="42" cy="34" r="2" fill="currentColor"/><circle cx="48" cy="39" r="2" fill="currentColor"/>`,
    travel: blob("#c5cba0") + `<circle cx="32" cy="34" r="18" fill="#fff"/><path d="M14 34 h36 M32 16 q-10 18 0 36 q10 -18 0 -36"/>`,
  };
  const icon = (name, emoji = "✏️") => (icons[name] ? svg("0 0 64 64", icons[name], "icon") : `<span class="emoji">${emoji}</span>`);

  const decos = {
    bolt: ["0 0 40 40", `<path d="M23 2 L8 23 h11 l-3 15 L32 16 h-11 z" fill="#ff6a13"/>`],
    gear: ["0 0 40 40", `<path d="M17 3 h6 l1 5 4 2 4 -3 4 4 -3 4 2 4 5 1 v6 l-5 1 -2 4 3 4 -4 4 -4 -3 -4 2 -1 5 h-6 l-1 -5 -4 -2 -4 3 -4 -4 3 -4 -2 -4 -5 -1 v-6 l5 -1 2 -4 -3 -4 4 -4 4 3 4 -2z" fill="#c9d3de"/><circle cx="20" cy="20" r="6" fill="#fff"/>`],
    target: ["0 0 40 40", `<circle cx="20" cy="20" r="15"/><circle cx="20" cy="20" r="8"/><circle cx="20" cy="20" r="2" fill="currentColor"/><path d="M20 0 v8 M20 32 v8 M0 20 h8 M32 20 h8"/>`],
    cross: ["0 0 40 40", `<path d="M8 8 L32 32 M32 8 L8 32" stroke-width="5"/>`],
    arrow: ["0 0 80 50", `<path d="M4 8 C30 2 60 10 70 38"/><path d="M58 32 L70 40 L75 27"/>`],
    squiggle: ["0 0 70 20", `<path d="M2 10 q8 -10 16 0 t16 0 t16 0 t16 0"/>`],
    brackets: ["0 0 50 40", `<path d="M14 6 q-8 0 -8 8 v4 l-4 2 4 2 v4 q0 8 8 8 M36 6 q8 0 8 8 v4 l4 2 -4 2 v4 q0 8 -8 8"/>`],
  };
  const deco = (name) => (decos[name] ? svg(decos[name][0], decos[name][1], "deco-svg") : "");

  // Shared SVG filters: a static wobble, and a "boiling" line effect for the hero.
  const filters = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3.5"/></filter>
    <filter id="boil"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="1" result="n"><animate attributeName="seed" values="1;2;3" dur="0.45s" calcMode="discrete" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" in2="n" scale="3.5"/></filter>
  </svg>`;

  return { wave, laptop, trophy, bike, peek, plane, icon, deco, filters };
})();
