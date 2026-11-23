// Builds slides/Slide_Seminar_PSO.pptx (plan: docs/slides_notes/DanYSlide_V3_Opus.md).
// Speaker notes are read from docs/slides_notes/Script_DocThu_10phut.md (10-minute version;
// Script_DocThu_V3.md is the earlier 15-minute version).
// Usage (from the repository root):
//   PPTXGENJS=<path to node_modules/pptxgenjs> node slides/build_slides.js [output.pptx]
// After building, remove the ZIP folder entries JSZip writes (they break cloud co-editing):
//   python -c "import zipfile,os;s='slides/Slide_Seminar_PSO.pptx';z=zipfile.ZipFile(s);o=zipfile.ZipFile(s+'.t','w',8);[o.writestr(i,z.read(i)) for i in z.infolist() if not i.filename.endswith('/')];o.close();z.close();os.replace(s+'.t',s)"
// Figures: figs/*.png (notebooks) and figs/slide_*.png (python slides/make_slide_figs.py).
const fs = require("fs");
const path = require("path");
const pptxgen = require(process.env.PPTXGENJS || "pptxgenjs");

const ROOT = path.resolve(__dirname, "..");
const OUT = process.argv[2] || path.join(ROOT, "slides", "Slide_Seminar_PSO.pptx");
const FIG = (f) => path.join(ROOT, "figs", f);

// ---------- palette (same as the previous deck, theme "Swarm") ----------
// warm natural palette: cream background, warm charcoal text, moss accent, terracotta second accent
const NAVY = "33403A", DK2 = "5B5248", LT2 = "F1EADF", TEAL = "3F6E5A", ORANGE = "C8743A",
  LIGHT = "C9D6CC", RED = "B5523B", GREY = "8A8073", PALE = "E4DBCC", WHITE = "FFFFFF", CREAM = "FAF7F2", FOREST = "2E4238";
const HEAD = "Cambria", BODY = "Calibri", MONO = "Courier New";
const TITLE = "Segoe UI Semibold"; // headings; body and formulas use Calibri (sans only, K-Dense design guide)

// ---------- speaker notes from the read-through script ----------
const script = fs.readFileSync(path.join(ROOT, "docs", "slides_notes", "Script_DocThu_10phut.md"), "utf8")
  .split("## Thời gian ước tính")[0];
const NOTES = {};
script.split(/^### Slide (\d+[a-z]?)\.[^\n]*$/m).forEach((chunk, i, arr) => {
  if (i % 2 === 1) {
    NOTES[chunk] = arr[i + 1].replace(/`\[click\]`\s*/g, "").replace(/^##.*$/gm, "").replace(/^---$/gm, "")
      .replace(/\n{3,}/g, "\n\n").trim();
  }
});

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625 in
pres.title = "Particle Swarm Optimization";
pres.author = "Seminar S01 team";
pres.theme = { headFontFace: TITLE, bodyFontFace: BODY };

pres.defineSlideMaster({
  title: "CONTENT", background: { color: CREAM },
  objects: [],
  slideNumber: { x: 9.2, y: 5.25, w: 0.5, h: 0.25, fontFace: BODY, fontSize: 10, color: GREY, align: "right" },
});
pres.defineSlideMaster({ title: "DARK", background: { color: FOREST }, objects: [] });

// ---------- helpers ----------
const T = (s, text, opt) => s.addText(text, Object.assign({ isTextBox: true, fontFace: BODY, color: NAVY, margin: 0, valign: "top" }, opt));
// Particle motif: a few dots drifting towards a star (gbest)
function swarm(s, cx, cy, r, n, seed, onDark) {
  let z = seed;
  const rnd = () => { z = (z * 9301 + 49297) % 233280; return z / 233280; };
  const cols = onDark ? [LIGHT, TEAL, WHITE] : [LIGHT, TEAL, PALE];
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2, d = r * (0.25 + 0.75 * Math.sqrt(rnd())), sz = 0.05 + rnd() * 0.13;
    s.addShape(pres.shapes.OVAL, { x: cx + Math.cos(a) * d * 1.25 - sz / 2, y: cy + Math.sin(a) * d - sz / 2, w: sz, h: sz,
      fill: { color: cols[i % 3], transparency: Math.round(15 + rnd() * 50) }, line: { type: "none" } });
  }
  const st = r * 0.32;
  s.addShape(pres.shapes.STAR_5_POINT, { x: cx - st / 2, y: cy - st / 2, w: st, h: st, fill: { color: ORANGE }, line: { type: "none" } });
}
function header(s, title) {
  T(s, title, { x: 0.5, y: 0.3, w: 9.0, h: 0.6, fontFace: TITLE, fontSize: 28, color: NAVY, align: "left", valign: "middle" });
}
const source = (s, text) => T(s, text, { x: 0.5, y: 5.22, w: 8.4, h: 0.28, fontSize: 10, color: GREY });
const card = (s, x, y, w, h, color) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.14, fill: { color: color || LT2 }, line: { color: color || LT2 } });
function badge(s, x, y, n, d) {
  d = d || 0.42;
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: ORANGE }, line: { color: ORANGE } });
  T(s, String(n), { x, y, w: d, h: d, fontSize: 13, bold: true, align: "center", valign: "middle" });
}
const arrowLine = (s, x1, y, x2, color, w) => {
  // horizontal arrow from x1 to x2 (head at x2)
  const left = Math.min(x1, x2), len = Math.abs(x2 - x1);
  s.addShape(pres.shapes.LINE, {
    x: left, y, w: len, h: 0, line: { color, width: w || 2.25,
      beginArrowType: x2 < x1 ? "triangle" : undefined, endArrowType: x2 >= x1 ? "triangle" : undefined },
  });
};
const notes = (s, n, extra) => s.addNotes((NOTES[n] || "") + (extra ? "\n\n" + extra : ""));

// Formula ladder shown on slides 3-5
function ladder(s, active) {
  const act = [].concat(active), last = Math.max(...act);
  const steps = ["① If-rule", "② Pull by distance", "③ Factor 2: 1995 PSO", "④ v_max, then ω"];
  const w = 2.1, gap = 0.2, y = 1.1, h = 0.4;
  steps.forEach((t, i) => {
    const x = 0.5 + i * (w + gap);
    const on = act.includes(i + 1), done = !on && i + 1 < last;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.2,
      fill: { color: on ? TEAL : done ? PALE : WHITE }, line: { color: on ? TEAL : PALE, width: 1 } });
    T(s, t, { x, y, w, h, fontSize: 14, bold: on, color: on ? WHITE : done ? DK2 : GREY, align: "center", valign: "middle" });
    if (i < 3) T(s, "›", { x: x + w, y: y - 0.02, w: gap, h, fontSize: 16, color: GREY, align: "center", valign: "middle" });
  });
}

// ===================== Slide 0: title =====================
let s = pres.addSlide({ masterName: "DARK" });
swarm(s, 7.75, 2.75, 1.55, 26, 7, true);
T(s, "CS420 Introduction to AI · Seminar S01", { x: 0.6, y: 1.2, w: 6.0, h: 0.32, fontSize: 15, bold: true, color: ORANGE });
T(s, "Particle Swarm\nOptimization", { x: 0.6, y: 1.6, w: 6.0, h: 1.6, fontFace: TITLE, fontSize: 44, color: WHITE, valign: "top" });
T(s, "How individual memory and social information balance exploration and exploitation", { x: 0.6, y: 3.25, w: 5.4, h: 0.7, fontSize: 18, color: LIGHT });
T(s, [{ text: "Văn Tuấn Khải · Huỳnh Hữu Phúc Minh · Lê Lương Quốc Trung", options: { breakLine: true } },
  { text: "24125032 · 24125068 · 24125084 · November 2026", options: { color: LIGHT } }], { x: 0.6, y: 4.35, w: 6.8, h: 0.65, fontSize: 14, color: WHITE });
notes(s, 0);

// ===================== Slide 1: problem =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "The problem: find the global minimum");
s.addImage({ path: FIG("slide_intro_landscape.png"), x: 0.5, y: 1.1, w: 5.0, h: 3.42, altText: "One-dimensional Rastrigin curve: a downhill local search stops in a local minimum while the global minimum is at x = 0" });
[["Minimise f(x)", "no gradient, only function values"], ["Local search gets trapped", "it stops at the first local minimum"]].forEach(([b, t], i) => {
  T(s, b, { x: 5.8, y: 1.15 + i * 0.78, w: 3.7, h: 0.34, fontSize: 18, bold: true, color: TEAL });
  T(s, t, { x: 5.8, y: 1.47 + i * 0.78, w: 3.7, h: 0.32, fontSize: 15, color: DK2 });
});
card(s, 5.8, 2.85, 3.7, 1.7, NAVY);
T(s, "Guiding question", { x: 6.0, y: 2.97, w: 3.3, h: 0.3, fontSize: 14, bold: true, color: ORANGE });
T(s, "How does PSO combine individual experience and social information to balance exploration and exploitation?", { x: 6.0, y: 3.28, w: 3.35, h: 1.2, fontSize: 16, color: WHITE });
source(s, "Figure: team illustration (1-D slice of Rastrigin). Question: assignment S01");
notes(s, 1);

// ===================== Slide 2: climber vs swarm =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Hill Climbing vs a particle swarm");
s.addImage({ path: FIG("slide_climber_vs_swarm.png"), x: 0.5, y: 1.15, w: 6.2, h: 2.73, altText: "Left: Hill Climbing moves one point and rejects a worse step. Right: a PSO particle with position, velocity, personal best and global best" });
[["Hill Climbing", ["one point", "keeps only better steps", "1 evaluation per step"]],
 ["PSO", ["N particles, each with x and v", "remembers pbest, shares gbest", "N evaluations per step"]]].forEach(([h, items], i) => {
  const y = 1.15 + i * 1.42;
  card(s, 6.95, y, 2.55, 1.3);
  T(s, h, { x: 7.1, y: y + 0.08, w: 2.3, h: 0.32, fontSize: 16, bold: true, color: i ? TEAL : GREY });
  T(s, items.map((t, k) => ({ text: t, options: { breakLine: k < items.length - 1 } })), { x: 7.1, y: y + 0.42, w: 2.35, h: 0.85, fontSize: 13, color: NAVY, paraSpaceAfter: 2 });
});
T(s, "Every PSO move is accepted; only the memories wait for an improvement.", { x: 0.5, y: 4.2, w: 9.0, h: 0.4, fontSize: 17, bold: true, color: NAVY });
source(s, "Origin: simulations of bird flocks searching for food (Kennedy & Eberhart, 1995, pp. 1942–1944). Figure: team illustration");
notes(s, 2);

// ===================== Slide 3: version 1, if-rule =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Version 1: push by direction only");
ladder(s, 1);
card(s, 0.5, 1.7, 5.3, 1.6);
T(s, [{ text: "if x > best:  ", options: { color: TEAL, bold: true } }, { text: "v ← v − rand()·inc", options: { breakLine: true } },
  { text: "if x < best:  ", options: { color: TEAL, bold: true } }, { text: "v ← v + rand()·inc" }],
  { x: 0.7, y: 1.85, w: 5.0, h: 0.8, fontFace: MONO, fontSize: 15, paraSpaceAfter: 4 });
T(s, "best = pbest (with p_inc) or gbest (with g_inc), per coordinate", { x: 0.7, y: 2.75, w: 5.0, h: 0.45, fontSize: 14, color: DK2 });
// 1-D diagram: same push near or far
T(s, "Near or far: same push", { x: 6.1, y: 1.72, w: 3.4, h: 0.32, fontSize: 16, bold: true, align: "center" });
s.addShape(pres.shapes.LINE, { x: 6.2, y: 2.8, w: 3.2, h: 0, line: { color: GREY, width: 1.25 } });
s.addShape(pres.shapes.STAR_5_POINT, { x: 6.27, y: 2.68, w: 0.25, h: 0.25, fill: { color: ORANGE }, line: { color: NAVY, width: 0.75 } });
T(s, "pbest", { x: 6.05, y: 2.95, w: 0.7, h: 0.26, fontSize: 13, color: DK2, align: "center" });
s.addShape(pres.shapes.OVAL, { x: 6.9, y: 2.71, w: 0.18, h: 0.18, fill: { color: TEAL }, line: { color: TEAL } });
T(s, "near", { x: 6.7, y: 2.95, w: 0.6, h: 0.26, fontSize: 13, color: DK2, align: "center" });
arrowLine(s, 7.0, 2.45, 6.45, RED);
s.addShape(pres.shapes.OVAL, { x: 9.0, y: 2.71, w: 0.18, h: 0.18, fill: { color: TEAL }, line: { color: TEAL } });
T(s, "far", { x: 8.8, y: 2.95, w: 0.6, h: 0.26, fontSize: 13, color: DK2, align: "center" });
arrowLine(s, 9.1, 2.45, 8.55, RED);
card(s, 0.5, 3.6, 9.0, 1.3, NAVY);
T(s, "Lesson from the 1995 paper", { x: 0.75, y: 3.72, w: 8.5, h: 0.32, fontSize: 15, bold: true, color: ORANGE });
T(s, "Both memories are needed, and roughly equal pulls work best.", { x: 0.75, y: 4.08, w: 8.5, h: 0.6, fontSize: 19, color: WHITE });
source(s, "Kennedy & Eberhart (1995), pp. 1944–1945 (Sects. 3.2–3.3)");
notes(s, 3);

// ===================== Slide 4: version 2, distance and factor 2 =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Version 2: pull grows with distance");
ladder(s, [2, 3]);
[["②", "v ← v + rand()·p_inc·(pbest − x) + rand()·g_inc·(gbest − x)", "far: strong pull · near: gentle pull", TEAL, LT2],
 ["③", "v ← v + 2·rand()·(pbest − x) + 2·rand()·(gbest − x)", "the 1995 PSO: mean pull 1, overshoots about half the time", TEAL, LT2],
 ["✕", "v ← 2·rand()·(pbest − x) + 2·rand()·(gbest − x)", "without the old v: \"quite ineffective at finding global optima\" → keep momentum", RED, "F6E3DA"]].forEach(([n, f, d, c, bg], i) => {
  const y = 1.7 + i * 1.02;
  card(s, 0.5, y, 9.0, 0.9, bg);
  T(s, n, { x: 0.65, y, w: 0.5, h: 0.9, fontSize: 20, bold: true, color: c, align: "center", valign: "middle" });
  T(s, f, { x: 1.3, y: y + 0.1, w: 8.0, h: 0.36, fontSize: 17, bold: true });
  T(s, d, { x: 1.3, y: y + 0.48, w: 8.0, h: 0.34, fontSize: 14, color: DK2 });
});
source(s, "Kennedy & Eberhart (1995), pp. 1945–1946 (Sects. 3.5–3.7)");
notes(s, 4);

// ===================== Slide 5: version 3, speed limit then inertia weight =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Version 3: speed limit, then inertia");
ladder(s, 4);
T(s, [
  { text: "vᵢ ← " }, { text: "ω·vᵢ", options: { color: GREY } }, { text: " + " },
  { text: "c₁r₁(pbestᵢ − xᵢ)", options: { color: TEAL } }, { text: " + " },
  { text: "c₂r₂(gbest − xᵢ)", options: { color: RED } }, { text: ",   xᵢ ← xᵢ + vᵢ" },
], { x: 0.5, y: 1.6, w: 9.0, h: 0.5, fontSize: 24, bold: true, align: "center", valign: "middle" });
T(s, [{ text: "inertia", options: { color: GREY, bold: true } }, { text: "   ·   " },
  { text: "cognitive: own experience", options: { color: TEAL, bold: true } }, { text: "   ·   " },
  { text: "social: swarm's knowledge", options: { color: RED, bold: true } }],
  { x: 0.5, y: 2.12, w: 9.0, h: 0.32, fontSize: 15, align: "center", valign: "middle" });
[["Fix 1: speed limit v_max", "clip each coordinate; a good value depends on the problem"],
 ["Fix 2: inertia weight ω < 1", "Shi & Eberhart (1998); the 1995 PSO is ω = 1, c₁ = c₂ = 2"]].forEach(([h, t], i) => {
  const x = 0.5 + i * 4.6;
  card(s, x, 2.6, 4.4, 0.8);
  T(s, h, { x: x + 0.15, y: 2.65, w: 4.1, h: 0.32, fontSize: 15, bold: true, color: TEAL });
  T(s, t, { x: x + 0.15, y: 2.97, w: 4.1, h: 0.38, fontSize: 13, color: DK2 });
});
const rows5 = [["Symbol", "Meaning", "Range"],
  ["ω", "inertia weight; 1 − ω acts like friction", "usually 0.4–0.9"],
  ["c₁, c₂", "strength of the pulls to pbest and gbest", "≥ 0"],
  ["r₁, r₂", "random, new for each particle, coordinate and iteration", "U(0, 1)"],
  ["v_max", "speed limit per coordinate", "with ω: wide (domain width)"]];
s.addTable(rows5.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0, color: i === 0 ? WHITE : NAVY, fill: { color: i === 0 ? TEAL : WHITE }, fontSize: 13, fontFace: BODY, valign: "middle", align: j === 1 ? "left" : "center" } }))),
  { x: 0.5, y: 3.55, w: 9.0, colW: [1.1, 5.2, 2.7], rowH: 0.31, border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.05 });
source(s, "Poli, Kennedy & Blackwell (2007), Sects. 2.2–2.4; Shi & Eberhart (1998)");
notes(s, 5);

// ===================== Slide 6: one step by hand, iteration 0 -> 1 =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "One update by hand: f(x) = x²");
const rows7 = [["Step", "P1", "P2 (gbest)"],
  ["Inertia  ω·v", "0.7·0.5 = 0.35", "0.7·(−0.5) = −0.35"],
  ["Cognitive  c₁r₁(pbest − x)", "1.5·0.4·(3 − 3) = 0", "1.5·0.8·(−2 + 2) = 0"],
  ["Social  c₂r₂(gbest − x)", "1.5·0.6·(−2 − 3) = −4.5", "1.5·0.3·(−2 + 2) = 0"],
  ["v(1) = sum", "0.35 + 0 − 4.5 = −4.15", "−0.35 + 0 + 0 = −0.35"],
  ["x(1) = x + v(1)", "3 − 4.15 = −1.15", "−2 − 0.35 = −2.35"],
  ["f(x(1)) = x(1)²", "1.3225", "5.5225"]];
s.addTable(rows7.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0 || i === 5, color: i === 0 ? WHITE : (i === 5 && j > 0 ? TEAL : NAVY),
  fill: { color: i === 0 ? TEAL : (i === 5 ? LT2 : WHITE) }, fontSize: 14, fontFace: BODY,
  align: j === 0 ? "left" : "center", valign: "middle" } }))),
  { x: 0.5, y: 1.1, w: 6.1, colW: [2.3, 1.9, 1.9], rowH: 0.42, border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.06 });
{
  T(s, [{ text: "ω = 0.7,  c₁ = c₂ = 1.5", options: { breakLine: true } },
    { text: "P1: x = 3,  v = 0.5,  r = (0.4, 0.6)", options: { breakLine: true } },
    { text: "P2: x = −2,  v = −0.5,  r = (0.8, 0.3)" }], { x: 6.85, y: 1.12, w: 2.7, h: 0.95, fontSize: 13, color: DK2, paraSpaceAfter: 3 });
  const X0 = 8.2, U = 0.36, xl = (v) => X0 + v * U, LY = 2.95;
  s.addShape(pres.shapes.LINE, { x: 6.9, y: LY, w: 2.6, h: 0, line: { color: GREY, width: 1.25 } });
  [-3, -2, -1, 0, 1, 2, 3].forEach((v) => {
    s.addShape(pres.shapes.LINE, { x: xl(v), y: LY - 0.05, w: 0, h: 0.1, line: { color: GREY, width: 1 } });
    T(s, v < 0 ? "−" + -v : String(v), { x: xl(v) - 0.2, y: LY + 0.08, w: 0.4, h: 0.24, fontSize: 12, color: GREY, align: "center" });
  });
  s.addShape(pres.shapes.OVAL, { x: xl(3) - 0.08, y: LY - 0.08, w: 0.16, h: 0.16, fill: { color: TEAL }, line: { color: TEAL } });
  s.addShape(pres.shapes.OVAL, { x: xl(-2) - 0.08, y: LY - 0.08, w: 0.16, h: 0.16, fill: { color: ORANGE }, line: { color: ORANGE } });
  arrowLine(s, xl(3), LY - 0.28, xl(-1.15), TEAL);
  T(s, "P1: 3 → −1.15", { x: 6.9, y: LY - 0.62, w: 2.6, h: 0.28, fontSize: 13, bold: true, color: TEAL, align: "right" });
  arrowLine(s, xl(-2), LY - 0.28, xl(-2.35), RED);
  T(s, "P2: −2 → −2.35", { x: 6.9, y: LY + 0.4, w: 2.6, h: 0.28, fontSize: 13, bold: true, color: RED });
}
T(s, [{ text: "P1 improves (f 9 → 1.32), P2 gets worse (f 4 → 5.52): ", options: { bold: true } }, { text: "the swarm's best still improves." }],
  { x: 0.5, y: 4.2, w: 9.0, h: 0.6, fontSize: 17, valign: "middle" });
source(s, "Team worked example (report Table 2)");
notes(s, 6);

// ===================== Slide 7: setup =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Two test functions, one budget");
[["Sphere", "f(x) = Σᵢ xᵢ²", "f(3, −1) = 9 + 1 = 10", "Unimodal: tests speed", "slide_func_sphere.png"],
 ["Rastrigin", "f(x) = 10n + Σᵢ (xᵢ² − 10 cos 2πxᵢ)", "f(1, 0) = 20 + (1 − 10) + (0 − 10) = 1", "Multimodal: tests trapping", "slide_func_rastrigin.png"]].forEach(([n, f, ex, d, img], i) => {
  const x = 0.5 + i * 2.85;
  card(s, x, 1.1, 2.7, 3.45);
  T(s, n, { x: x + 0.15, y: 1.17, w: 2.4, h: 0.34, fontSize: 18, bold: true });
  T(s, f, { x: x + 0.15, y: 1.5, w: 2.45, h: 0.3, fontSize: i ? 12 : 14 });
  s.addImage({ path: FIG(img), x: x + 0.53, y: 1.85, w: 1.64, h: 1.54, altText: n + " contour plot with the minimum at the origin" });
  T(s, ex, { x: x + 0.15, y: 3.45, w: 2.45, h: 0.3, fontSize: i ? 11 : 13, color: DK2 });
  T(s, d, { x: x + 0.15, y: 3.85, w: 2.45, h: 0.5, fontSize: 14, bold: true, color: TEAL });
});
T(s, "Both: n = 2, domain [−5.12, 5.12]², minimum 0 at (0, 0). Fitness = f at the particle's position.", { x: 0.5, y: 4.62, w: 5.55, h: 0.5, fontSize: 13, color: DK2 });
T(s, "Settings", { x: 6.3, y: 1.1, w: 3.2, h: 0.34, fontSize: 18, bold: true, color: TEAL });
T(s, ["ω = 0.7,  c₁ = c₂ = 1.5", "v_max = 10.24 (domain width)", "20 particles × 100 iterations", "5 seeds (0–4)"].map((t, i, a) => ({ text: t, options: { breakLine: i < a.length - 1 } })),
  { x: 6.3, y: 1.5, w: 3.2, h: 1.4, fontSize: 15, paraSpaceAfter: 4 });
T(s, "2,020", { x: 6.3, y: 3.05, w: 3.2, h: 0.65, fontSize: 36, bold: true, color: TEAL, valign: "middle" });
T(s, "evaluations per run, the same budget for every method", { x: 6.3, y: 3.7, w: 3.2, h: 0.55, fontSize: 14, color: DK2 });
source(s, "Functions and settings: team design (report Sect. 3); figures: team illustration");
notes(s, 7);

// ===================== Slide 8: five particles =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Five particles: iteration 0 → 1");
s.addImage({ path: FIG("slide_swarm_step01.png"), x: 0.5, y: 1.05, w: 3.6, h: 4.15, altText: "Five particles on Sphere moving from iteration 0 to 1; particles 3 and 5 improve, gbest drops from 8.26 to 0.37" });
const rows8 = [["P", "(x₁, x₂) iter 0", "f", "(x₁, x₂) iter 1", "f"],
  ["1", "(2.81, −0.63)", "8.26 ★", "(0.95, 5.12)", "27.12"],
  ["2", "(3.67, 2.02)", "17.57", "(5.12, 5.12)", "52.43"],
  ["3", "(−4.16, 4.87)", "40.99", "(−0.06, −0.60)", "0.37 ★"],
  ["4", "(2.67, 2.93)", "15.73", "(3.48, −5.12)", "38.34"],
  ["5", "(−3.81, −0.51)", "14.76", "(3.14, 1.26)", "11.45"]];
const better = { 3: true, 5: true };
s.addTable(rows8.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || c.includes("★"), color: i === 0 ? WHITE : (j === 4 && i > 0 ? (better[i] ? TEAL : RED) : NAVY),
  fill: { color: i === 0 ? TEAL : WHITE }, fontSize: 13, fontFace: BODY, align: "center", valign: "middle" } }))),
  { x: 4.4, y: 1.1, w: 5.1, colW: [0.4, 1.35, 0.75, 1.5, 1.1], rowH: 0.36, border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.03 });
T(s, "Sphere, seed 42, ω = 0.7, c₁ = c₂ = 1.5. ★ = gbest", { x: 4.4, y: 3.33, w: 5.1, h: 0.28, fontSize: 12, color: GREY });
T(s, "8.26 → 0.37", { x: 4.4, y: 3.7, w: 5.1, h: 0.55, fontSize: 30, bold: true, color: TEAL, valign: "middle" });
T(s, "gbest after one update, although 3 of 5 particles got worse", { x: 4.4, y: 4.25, w: 5.1, h: 0.32, fontSize: 15, color: DK2 });
T(s, "5.12 = put back on the boundary", { x: 4.4, y: 4.62, w: 5.1, h: 0.3, fontSize: 13, color: GREY });
source(s, "Team experiment (report Table 3, Figure 1; results/swarm_states_sphere_seed42.csv)");
notes(s, 8);

// ===================== Slide 9: inertia =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "How much inertia?");
s.addImage({ path: FIG("fig_omega_sphere.png"), x: 0.5, y: 1.05, w: 4.35, h: 2.82, altText: "Sphere: mean best fitness against iteration for omega 0.4, 0.7 and 0.9 over five seeds" });
s.addImage({ path: FIG("fig_omega_rastrigin.png"), x: 5.15, y: 1.05, w: 4.35, h: 2.82, altText: "Rastrigin: mean best fitness against iteration for omega 0.4, 0.7 and 0.9 over five seeds" });
const rows9 = [["Mean final", "ω = 0.4", "ω = 0.7", "ω = 0.9"],
  ["Sphere", "8.8 × 10⁻³⁰", "1.0 × 10⁻¹²", "3.6 × 10⁻⁴"],
  ["Rastrigin", "≈ 0", "1.1 × 10⁻⁶", "0.164"]];
s.addTable(rows9.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0 || (j === 1 && i > 0), color: i === 0 ? WHITE : NAVY,
  fill: { color: i === 0 ? TEAL : (j === 1 ? "DCE8DF" : WHITE) }, fontSize: 13, fontFace: BODY, align: "center", valign: "middle" } }))),
  { x: 0.5, y: 4.0, w: 4.6, colW: [1.15, 1.15, 1.15, 1.15], rowH: 0.36, border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.03 });
T(s, [{ text: "Lower ω converged fastest here.", options: { bold: true, breakLine: true } },
  { text: "With a tighter v_max, one ω = 0.4 Rastrigin run stalls: the best ω depends on the other settings." }],
  { x: 5.4, y: 4.0, w: 4.1, h: 1.08, fontSize: 15, paraSpaceAfter: 4 });
source(s, "Team experiment: 20 particles, c₁ = c₂ = 1.5, v_max = 10.24, seeds 0–4; line = mean, band = min–max (report Tables 6–7)");
notes(s, 9);

// ===================== Slide 10: same budget =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Same budget, two landscapes");
s.addImage({ path: FIG("fig_compare_sphere.png"), x: 0.5, y: 1.05, w: 4.4, h: 2.48, altText: "Best-so-far fitness against evaluations on Sphere for PSO, Random Search and Hill Climbing" });
s.addImage({ path: FIG("fig_compare_rastrigin.png"), x: 5.1, y: 1.05, w: 4.4, h: 2.48, altText: "Best-so-far fitness against evaluations on Rastrigin for PSO, Random Search and Hill Climbing" });
[["43 vs 216", "evaluations to reach 0.01 on Sphere: Hill Climbing is faster"],
 ["10⁻¹²", "PSO final on Sphere, far below both baselines"],
 ["5/5 vs 0/5", "Rastrigin runs reaching 0.01: PSO vs each baseline"]].forEach(([b, t], i) => {
  const x = 0.5 + i * 3.08;
  card(s, x, 3.7, 2.84, 1.38);
  T(s, b, { x: x + 0.15, y: 3.76, w: 2.6, h: 0.55, fontSize: 26, bold: true, color: i === 0 ? GREY : TEAL, valign: "middle" });
  T(s, t, { x: x + 0.15, y: 4.32, w: 2.6, h: 0.7, fontSize: 14, color: DK2 });
});
source(s, "Team experiments: 2,020 evaluations per run, seeds 0–4 (report Tables 4–5, Figure 2)");
notes(s, 10);

// ===================== Slide 11: stuck =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "When the swarm gets stuck");
s.addImage({ path: FIG("fig_local_optimum.png"), x: 0.5, y: 1.05, w: 6.1, h: 3.76, altText: "Diagnostic swarm on Rastrigin collapsing onto a local minimum, with best fitness and swarm diversity compared with the default run" });
[["Setting", "5 particles, ω = 0.4, c₁ = 0.5, c₂ = 2.5"],
 ["Result", "all 20 runs end above 0.9 (best 0.995)"],
 ["Why", "diversity 4.18 → 3 × 10⁻⁹: nobody explores"],
 ["Default PSO", "same seed: f ≈ 1.6 × 10⁻⁸"]].forEach(([h, t], i) => {
  T(s, h, { x: 6.85, y: 1.05 + i * 0.86, w: 2.65, h: 0.3, fontSize: 15, bold: true, color: i === 3 ? TEAL : RED });
  T(s, t, { x: 6.85, y: 1.36 + i * 0.86, w: 2.65, h: 0.5, fontSize: 13 });
});
card(s, 0.5, 4.85, 9.0, 0.34, NAVY);
T(s, [{ text: "Premature convergence. ", options: { bold: true, color: ORANGE } },
  { text: "Several settings changed at once, so no single cause.", options: { color: WHITE } }],
  { x: 0.65, y: 4.85, w: 8.7, h: 0.34, fontSize: 13, valign: "middle" });
source(s, "Team experiment: Rastrigin, seeds 0–19, 505 evaluations per run (report Figure 3, Sect. 4.3)");
notes(s, 11);

// ===================== Slide 12: so what =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Answer, uses and limits");
[["pbest", "keeps diversity: exploration"],
 ["gbest", "focuses the swarm: exploitation"],
 ["ω", "sets how far particles carry on"]].forEach(([h, t], i) => {
  const x = 0.5 + i * 3.08;
  card(s, x, 1.15, 2.84, 1.35);
  T(s, h, { x: x + 0.2, y: 1.25, w: 2.5, h: 0.45, fontSize: 24, bold: true, color: TEAL });
  T(s, t, { x: x + 0.2, y: 1.75, w: 2.5, h: 0.65, fontSize: 16, color: NAVY });
});
T(s, "Too much social pull too early → premature convergence.", { x: 0.5, y: 2.72, w: 9.0, h: 0.42, fontSize: 19, bold: true });
T(s, "Real uses", { x: 0.5, y: 3.4, w: 4.4, h: 0.32, fontSize: 16, bold: true, color: TEAL });
T(s, [{ text: "Solar panels: tracking the maximum power point (Alshareef et al., 2019)", options: { bullet: { indent: 14 }, breakLine: true } },
  { text: "Drones: flight path planning (Phung & Ha, 2021)", options: { bullet: { indent: 14 } } }],
  { x: 0.5, y: 3.78, w: 4.4, h: 1.3, fontSize: 15, paraSpaceAfter: 6 });
T(s, "Limits of our study", { x: 5.1, y: 3.4, w: 4.4, h: 0.32, fontSize: 16, bold: true, color: RED });
T(s, [{ text: "2 functions, 2-D, 5 seeds", options: { bullet: { indent: 14 }, breakLine: true } },
  { text: "gbest topology only; no restarts", options: { bullet: { indent: 14 } } }],
  { x: 5.1, y: 3.78, w: 4.4, h: 1.3, fontSize: 15, paraSpaceAfter: 6 });
source(s, "Team experiments; Alshareef et al. (2019); Phung & Ha (2021)");
notes(s, 12);

// ===================== Slide 13: thank you + references =====================
s = pres.addSlide({ masterName: "DARK" });
T(s, "Thank you", { x: 0.7, y: 0.4, w: 6.5, h: 0.7, fontFace: TITLE, fontSize: 36, color: WHITE, valign: "middle" });
T(s, "Questions are welcome", { x: 0.7, y: 1.05, w: 6.5, h: 0.36, fontSize: 18, color: ORANGE });
T(s, "References", { x: 0.7, y: 1.65, w: 6.0, h: 0.3, fontSize: 14, bold: true, color: LIGHT });
const refs = [
  "Kennedy, J. & Eberhart, R. (1995). Particle swarm optimization. Proc. ICNN'95, 1942–1948.",
  "Poli, R., Kennedy, J. & Blackwell, T. (2007). Particle swarm optimization: An overview. Swarm Intelligence 1, 33–57.",
  "Shi, Y. & Eberhart, R. C. (1998). A modified particle swarm optimizer. Proc. IEEE ICEC, 69–73.",
  "Alshareef, M. et al. (2019). Accelerated PSO for photovoltaic MPPT under partial shading. Energies 12(4), 623.",
  "Phung, M. D. & Ha, Q. P. (2021). Safety-enhanced UAV path planning with spherical vector-based PSO. Appl. Soft Comput. 107, 107376.",
];
T(s, refs.map((r, i) => ({ text: r, options: { breakLine: i < refs.length - 1 } })), { x: 0.7, y: 1.98, w: 8.6, h: 2.3, fontSize: 13, color: WHITE, paraSpaceAfter: 5 });
T(s, "AI tools (Claude, OpenAI Codex) assisted with code, drafting and slides; all numbers were checked by the team against the notebooks.", { x: 0.7, y: 4.4, w: 8.6, h: 0.5, fontSize: 13, color: ORANGE });
s.addNotes("Take questions. Backup slides B0 to B4 follow.");

// ===================== Backup B0: hand example, iteration 0 =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "B0. Hand example: iteration 0", "Backup");
T(s, [{ text: "Fitness = f(x) = x²", options: { bold: true, color: TEAL } }, { text: " (lower is better),  one dimension,  ω = 0.7,  c₁ = c₂ = 1.5,  no velocity limit" }], { x: 0.5, y: 1.05, w: 9.0, h: 0.35, fontSize: 15, fontFace: BODY });
const rows6a = [["Particle", "x(0)", "v(0)", "r₁", "r₂", "f(x(0)) = x(0)²", "pbest"],
  ["P1", "3", "0.5", "0.4", "0.6", "3² = 9", "3"],
  ["P2", "−2", "−0.5", "0.8", "0.3", "(−2)² = 4  ★ gbest", "−2"]];
s.addTable(rows6a.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0 || (i === 2 && j === 5), color: i === 0 ? WHITE : (i === 2 && j === 5 ? ORANGE : NAVY),
  fill: { color: i === 0 ? TEAL : WHITE }, fontSize: 14, fontFace: BODY, align: "center", valign: "middle" } }))),
  { x: 0.5, y: 1.55, w: 9.0, colW: [1.1, 1.0, 1.0, 0.9, 0.9, 2.6, 1.5], rowH: 0.4, border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.05 });
{
  const X0 = 4.69, U = 1.2333, xl = (v) => X0 + v * U, LY = 3.55;
  s.addShape(pres.shapes.LINE, { x: 1.0, y: LY, w: 8.0, h: 0, line: { color: GREY, width: 1.25 } });
  [-3, -2, -1, 0, 1, 2, 3].forEach((v) => {
    s.addShape(pres.shapes.LINE, { x: xl(v), y: LY - 0.06, w: 0, h: 0.12, line: { color: GREY, width: 1 } });
    T(s, v < 0 ? "−" + -v : String(v), { x: xl(v) - 0.3, y: LY + 0.1, w: 0.6, h: 0.25, fontSize: 11, color: GREY, align: "center" });
  });
  T(s, "optimum", { x: xl(0) - 0.5, y: LY + 0.32, w: 1.0, h: 0.22, fontSize: 10, color: GREY, align: "center" });
  s.addShape(pres.shapes.OVAL, { x: xl(3) - 0.1, y: LY - 0.1, w: 0.2, h: 0.2, fill: { color: TEAL }, line: { color: TEAL } });
  s.addShape(pres.shapes.OVAL, { x: xl(-2) - 0.1, y: LY - 0.1, w: 0.2, h: 0.2, fill: { color: ORANGE }, line: { color: ORANGE } });
  T(s, "P1: x = 3, f = 9", { x: xl(3) - 1.2, y: LY - 0.5, w: 1.6, h: 0.28, fontSize: 13, bold: true, color: TEAL, align: "center" });
  T(s, "P2 = gbest: x = −2, f = 4", { x: xl(-2) - 1.2, y: LY - 0.5, w: 2.4, h: 0.28, fontSize: 13, bold: true, color: ORANGE, align: "center" });
}
card(s, 0.5, 4.38, 9.0, 0.72);
T(s, [{ text: "At the start, pbest = x for every particle, ", options: { bold: true } },
  { text: "so the cognitive term c₁r₁(pbest − x) will be 0 in the first update." }],
  { x: 0.7, y: 4.42, w: 8.6, h: 0.64, fontSize: 15, valign: "middle" });
source(s, "Team worked example (report Table 2)");
s.addNotes("Backup for: where do the starting values of the hand example come from? Same numbers as the Start line on the hand-example slide and report Table 2.");

// ===================== Backup B1: pseudo-code =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "B1. PSO pseudo-code", "Backup");
const code = [
  "Input: f, domain [lo, hi]^n, N, T, ω, c1, c2, vmax",
  "1  for each particle i = 1..N:",
  "2      x_i ← uniform random point in [lo, hi]^n",
  "3      v_i ← uniform random vector in [−vmax, vmax]^n",
  "4      pbest_i ← x_i",
  "5  gbest ← argmin_i f(pbest_i)",
  "6  for t = 1..T:",
  "7      for each particle i:",
  "8          draw r1, r2 ~ U(0, 1) for every dimension",
  "9          v_i ← ω v_i + c1 r1 (pbest_i − x_i) + c2 r2 (gbest − x_i)",
  "10         v_i ← clip(v_i, −vmax, vmax)",
  "11         x_i ← clip(x_i + v_i, lo, hi)",
  "12         if f(x_i) < f(pbest_i): pbest_i ← x_i",
  "13     gbest ← argmin_i f(pbest_i)     (synchronous update)",
  "14 return gbest, f(gbest)"];
card(s, 0.5, 1.0, 9.0, 3.55);
T(s, code.map((c, i) => ({ text: c, options: { breakLine: i < code.length - 1 } })), { x: 0.7, y: 1.1, w: 8.6, h: 3.4, fontFace: MONO, fontSize: 12.5 });
source(s, "Team implementation (report Sect. 3; notebooks/PSO_Seminar.ipynb)");
s.addNotes("Backup for questions about the algorithm steps. Line 13 is outside the particle loop: every particle uses the gbest of the previous iteration (synchronous update).");

// ===================== Backup B2: variants =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "B2. Variants and topology", "Backup");
const rowsB2 = [["Variant", "Idea", "Source"],
  ["Inertia weight ω", "multiply the old velocity; often decreased from about 0.9 to 0.4 during a run", "Shi & Eberhart (1998); Poli Sect. 2.3"],
  ["Constriction χ", "scale the whole update so particles converge without v_max; χ ≈ 0.7298 ⇔ ω = 0.7298, c ≈ 1.496", "Clerc & Kennedy (2002); Poli Sect. 2.4"],
  ["gbest vs lbest", "gbest: everyone sees the swarm best, fast. lbest ring: only neighbours, slower but less often trapped", "Poli Sect. 3.1"],
  ["Fully informed PSO", "each particle is pulled by all its neighbours, not only the best one", "Poli Sect. 2.5"],
  ["Diversity control", "variants designed against premature convergence on local optima", "Poli Sect. 4.5"],
  ["Bare-bones PSO", "no velocity: sample the new position around pbest and gbest", "Poli Sect. 4.6"]];
s.addTable(rowsB2.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0, color: i === 0 ? WHITE : NAVY, fill: { color: i === 0 ? TEAL : (j === 0 ? LT2 : WHITE) }, fontSize: 12, fontFace: BODY, valign: "middle" } }))),
  { x: 0.5, y: 1.0, w: 9.0, colW: [1.8, 4.9, 2.3], rowH: [0.34, 0.6, 0.6, 0.6, 0.48, 0.48, 0.48], border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.05 });
source(s, "Poli, Kennedy & Blackwell (2007)");
s.addNotes("Backup for questions about PSO variants. Our team used only the gbest topology with a constant inertia weight.");

// ===================== Backup B3: v_max sensitivity =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "B3. Sensitivity to the velocity limit", "Backup");
const rowsB3 = [["Rastrigin mean final", "ω = 0.4", "ω = 0.7", "ω = 0.9"],
  ["v_max = 2.0", "0.199 (1 run at 0.995)", "2.1 × 10⁻⁷", "8.5 × 10⁻³"],
  ["v_max = 5.12", "0.199 (1 run at 0.995)", "2.0 × 10⁻⁸", "4.4 × 10⁻²"],
  ["v_max = 10.24 (ours)", "0", "1.1 × 10⁻⁶", "0.164"],
  ["no clamp", "0", "9.6 × 10⁻⁹", "6.7 × 10⁻²"]];
s.addTable(rowsB3.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0 || i === 3, color: i === 0 ? WHITE : NAVY, fill: { color: i === 0 ? TEAL : (i === 3 ? LT2 : WHITE) }, fontSize: 14, fontFace: BODY, align: "center", valign: "middle" } }))),
  { x: 0.5, y: 1.05, w: 9.0, colW: [2.4, 2.6, 2.0, 2.0], rowH: 0.45, border: { type: "solid", pt: 0.75, color: PALE } });
T(s, [{ text: "Sphere: ", options: { bold: true } }, { text: "ranking ω = 0.4 < 0.7 < 0.9 holds for every limit. " },
  { text: "Rastrigin: ", options: { bold: true } }, { text: "with v_max ≤ 5.12 one ω = 0.4 run stalls, so ω = 0.7 is best; with 10.24 or no clamp all ω = 0.4 runs reach 0. Initial velocities are drawn from ±10.24 in every case." }],
  { x: 0.5, y: 3.5, w: 9.0, h: 1.2, fontSize: 14 });
source(s, "Team experiment, seeds 0–4 (report Table 7; results/vmax_sensitivity.csv)");
s.addNotes("Backup for: why v_max = 10.24? It equals the domain width, the rule V_max = X_max discussed by Poli et al. Conclusions about omega are tied to this limit.");

// ===================== Backup B4: fair comparison =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "B4. Is the comparison fair?", "Backup");
[["PSO", "20 initial evaluations + 20 particles × 100 iterations = 2,020; best fitness recorded after each 20-evaluation batch"],
 ["Random Search", "2,020 points sampled uniformly from the domain"],
 ["Hill Climbing", "1 uniform start + 2,019 Gaussian proposals (σ = 0.3), clipped to the domain, only strict improvements accepted, no restarts"]].forEach(([h, t], i) => {
  card(s, 0.5, 1.0 + i * 0.95, 9.0, 0.82);
  T(s, h, { x: 0.7, y: 1.0 + i * 0.95, w: 1.9, h: 0.82, fontFace: BODY, fontSize: 16, bold: true, color: TEAL, valign: "middle" });
  T(s, t, { x: 2.6, y: 1.0 + i * 0.95, w: 6.75, h: 0.82, fontSize: 13.5, valign: "middle" });
});
T(s, [{ text: "Same seeds (0–4) and the same budget for every method. ", options: { bold: true } },
  { text: "Cost is measured in function evaluations, not run time. A random-restart Hill Climbing would be a stronger baseline." }],
  { x: 0.5, y: 3.98, w: 9.0, h: 0.8, fontSize: 14 });
source(s, "Report Sect. 3 and Limitations");
s.addNotes("Backup for questions about the fairness of the comparison with the baselines.");

pres.writeFile({ fileName: OUT }).then((f) => console.log("wrote", f));
