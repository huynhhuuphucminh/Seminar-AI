// Builds slides/Slide_Seminar_PSO.pptx (plan: docs/slides_notes/DanYSlide_V3_Opus.md).
// Speaker notes are read from docs/slides_notes/Script_DocThu_V3.md.
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
const NAVY = "1B2A41", DK2 = "324A5F", LT2 = "EEF3F6", TEAL = "2E7D8C", ORANGE = "F2A541",
  LIGHT = "8FB8C4", RED = "C8553D", GREY = "5C6F82", PALE = "DDE7EC", WHITE = "FFFFFF";
const HEAD = "Cambria", BODY = "Calibri", MONO = "Courier New";

// ---------- speaker notes from the read-through script ----------
const script = fs.readFileSync(path.join(ROOT, "docs", "slides_notes", "Script_DocThu_V3.md"), "utf8")
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
pres.theme = { headFontFace: HEAD, bodyFontFace: BODY };

pres.defineSlideMaster({
  title: "CONTENT", background: { color: WHITE },
  objects: [],
  slideNumber: { x: 9.2, y: 5.25, w: 0.5, h: 0.25, fontFace: BODY, fontSize: 10, color: GREY, align: "right" },
});
pres.defineSlideMaster({ title: "DARK", background: { color: NAVY }, objects: [] });

// ---------- helpers ----------
const T = (s, text, opt) => s.addText(text, Object.assign({ isTextBox: true, fontFace: BODY, color: NAVY, margin: 0, valign: "top" }, opt));
function header(s, title, who) {
  T(s, title, { x: 0.5, y: 0.25, w: 7.6, h: 0.7, fontFace: HEAD, fontSize: 28, bold: true, align: "center", valign: "middle" });
  if (who) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.2, y: 0.38, w: 1.3, h: 0.32, rectRadius: 0.06, fill: { color: who === "Backup" ? GREY : TEAL }, line: { color: who === "Backup" ? GREY : TEAL } });
    T(s, who, { x: 8.2, y: 0.38, w: 1.3, h: 0.32, fontSize: 10, bold: true, color: WHITE, align: "center", valign: "middle" });
  }
}
const source = (s, text) => T(s, text, { x: 0.5, y: 5.22, w: 8.4, h: 0.28, fontSize: 10, italic: true, color: GREY });
const card = (s, x, y, w, h, color) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: color || LT2 }, line: { color: color || LT2 } });
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
  const w = 2.1, gap = 0.2, y = 1.0, h = 0.34;
  steps.forEach((t, i) => {
    const x = 0.5 + i * (w + gap);
    const on = act.includes(i + 1), done = !on && i + 1 < last;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.17,
      fill: { color: on ? TEAL : done ? PALE : WHITE }, line: { color: on ? TEAL : PALE, width: 1 } });
    T(s, t, { x, y, w, h, fontSize: 12, bold: on, color: on ? WHITE : done ? DK2 : GREY, align: "center", valign: "middle" });
    if (i < 3) T(s, "›", { x: x + w, y: y - 0.02, w: gap, h, fontSize: 16, color: GREY, align: "center", valign: "middle" });
  });
}

// ===================== Slide 0: title =====================
let s = pres.addSlide({ masterName: "DARK" });
T(s, "Particle Swarm Optimization", { x: 0.6, y: 1.55, w: 8.8, h: 0.9, fontFace: HEAD, fontSize: 40, bold: true, color: WHITE, align: "center", valign: "middle" });
T(s, "How individual memory and social information balance exploration and exploitation", { x: 0.7, y: 2.6, w: 8.6, h: 0.4, fontSize: 17, color: LIGHT });
T(s, "CS420 Introduction to AI · Seminar S01 · November 2026", { x: 0.7, y: 3.25, w: 8.6, h: 0.3, fontSize: 14, color: WHITE });
T(s, "Văn Tuấn Khải (24125032) · Huỳnh Hữu Phúc Minh (24125068) · Lê Lương Quốc Trung (24125084)", { x: 0.7, y: 3.55, w: 8.6, h: 0.3, fontSize: 14, color: ORANGE });
notes(s, 0);

// ===================== Slide 1: problem =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "The problem: find the global minimum", "Member 1");
s.addImage({ path: FIG("slide_intro_landscape.png"), x: 0.5, y: 1.05, w: 4.9, h: 3.35, altText: "One-dimensional Rastrigin curve: a downhill local search stops in a local minimum while the global minimum is at x = 0" });
const pts1 = [
  ["Goal: ", "find x that minimises f(x) in a bounded domain"],
  ["Hard when: ", "no usable gradient, many local minima"],
  ["Examples: ", "tuning hyper-parameters, scheduling, design"],
];
pts1.forEach(([b, t], i) => T(s, [{ text: b, options: { bold: true, color: TEAL } }, { text: t }], { x: 5.7, y: 1.1 + i * 0.52, w: 3.8, h: 0.48, fontSize: 15 }));
card(s, 5.7, 2.75, 3.8, 1.65, NAVY);
T(s, "Guiding question", { x: 5.9, y: 2.85, w: 3.4, h: 0.3, fontSize: 13, bold: true, color: ORANGE });
T(s, "How does PSO combine individual experience and social information to balance exploration and exploitation?", { x: 5.9, y: 3.15, w: 3.45, h: 1.15, fontSize: 15, color: WHITE });
T(s, [{ text: "Scope: ", options: { bold: true } }, { text: "global-best PSO on two 2-D test functions, compared with Hill Climbing and Random Search" }],
  { x: 0.5, y: 4.55, w: 9.0, h: 0.5, fontSize: 13, color: DK2 });
source(s, "Figure: team illustration (1-D slice of Rastrigin). Question: assignment S01");
notes(s, 1);

// ===================== Slide 2: climber vs swarm =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Hill Climbing vs a particle swarm", "Member 1");
s.addImage({ path: FIG("slide_climber_vs_swarm.png"), x: 0.5, y: 1.05, w: 5.05, h: 2.43, altText: "Left: Hill Climbing moves one point and rejects a worse step. Right: a PSO particle with position, velocity, personal best and global best" });
const rows2 = [["", "Hill Climbing", "PSO"],
  ["Keeps", "one point", "N particles, each a candidate xᵢ"],
  ["Moves by", "Gaussian step (σ = 0.3), kept only if better", "velocity vᵢ; every move is kept"],
  ["Remembers", "current point only", "own best pbestᵢ + shared gbest"],
  ["Cost per step", "1 evaluation", "N evaluations"]];
s.addTable(rows2.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0, color: i === 0 ? WHITE : NAVY, fill: { color: i === 0 ? NAVY : j === 0 ? LT2 : WHITE },
  fontSize: 11.5, fontFace: BODY, valign: "middle" } }))),
  { x: 5.75, y: 1.05, w: 3.75, colW: [1.05, 1.2, 1.5], rowH: [0.32, 0.48, 0.62, 0.48, 0.32], border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.05 });
card(s, 0.5, 3.8, 9.0, 0.95);
T(s, [{ text: "Key difference: ", options: { bold: true, color: TEAL } },
  { text: "Hill Climbing never accepts a worse step, so it cannot leave a local minimum. PSO accepts every move; only the memories wait for an improvement. Because each PSO step costs N evaluations, we compare both with the same total budget." }],
  { x: 0.7, y: 3.88, w: 8.6, h: 0.8, fontSize: 14, valign: "middle" });
source(s, "Origin: simulations of bird flocks searching for food (Kennedy & Eberhart, 1995, pp. 1942–1944). Figure: team illustration");
notes(s, 2);

// ===================== Slide 3: version 1, if-rule =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Version 1: an \"if\" rule", "Member 1");
ladder(s, 1);
card(s, 0.5, 1.55, 5.3, 1.7);
T(s, "For each coordinate (1995 \"cornfield\" simulation):", { x: 0.7, y: 1.62, w: 5.0, h: 0.3, fontSize: 13, bold: true, color: TEAL });
const ifr = [["if x > pbest:", "v ← v − rand()·p_inc"], ["if x < pbest:", "v ← v + rand()·p_inc"],
  ["if x > gbest:", "v ← v − rand()·g_inc"], ["if x < gbest:", "v ← v + rand()·g_inc"]];
ifr.forEach(([a, b], i) => {
  T(s, a, { x: 0.8, y: 1.98 + i * 0.3, w: 1.75, h: 0.28, fontFace: MONO, fontSize: 13, color: i < 2 ? TEAL : RED, bold: true });
  T(s, b, { x: 2.6, y: 1.98 + i * 0.3, w: 3.1, h: 0.28, fontFace: MONO, fontSize: 13 });
});
// 1-D diagram: same push near or far
T(s, "Only the direction counts", { x: 6.1, y: 1.6, w: 3.4, h: 0.3, fontSize: 14, bold: true, align: "center" });
s.addShape(pres.shapes.LINE, { x: 6.2, y: 2.75, w: 3.2, h: 0, line: { color: GREY, width: 1.25 } });
s.addShape(pres.shapes.STAR_5_POINT, { x: 6.27, y: 2.63, w: 0.25, h: 0.25, fill: { color: ORANGE }, line: { color: NAVY, width: 0.75 } });
T(s, "pbest", { x: 6.05, y: 2.9, w: 0.7, h: 0.25, fontSize: 11, color: DK2, align: "center" });
s.addShape(pres.shapes.OVAL, { x: 6.9, y: 2.66, w: 0.18, h: 0.18, fill: { color: TEAL }, line: { color: TEAL } });
T(s, "near", { x: 6.7, y: 2.9, w: 0.6, h: 0.25, fontSize: 11, color: DK2, align: "center" });
arrowLine(s, 7.0, 2.4, 6.45, RED);
s.addShape(pres.shapes.OVAL, { x: 9.0, y: 2.66, w: 0.18, h: 0.18, fill: { color: TEAL }, line: { color: TEAL } });
T(s, "far", { x: 8.8, y: 2.9, w: 0.6, h: 0.25, fontSize: 11, color: DK2, align: "center" });
arrowLine(s, 9.1, 2.4, 8.55, RED);
T(s, "same random push", { x: 6.1, y: 3.15, w: 3.4, h: 0.3, fontSize: 12, italic: true, color: RED, align: "center" });
// lessons
card(s, 0.5, 3.5, 9.0, 1.55, NAVY);
T(s, "What the authors learned", { x: 0.7, y: 3.58, w: 8.6, h: 0.3, fontSize: 14, bold: true, color: ORANGE });
const les = ["pbest and gbest are both necessary", "g_inc ≫ p_inc: the flock rushes into local minima", "p_inc ≫ g_inc: individuals wander", "roughly equal pulls work best"];
les.forEach((t, i) => T(s, "• " + t, { x: 0.8 + (i % 2) * 4.4, y: 3.98 + Math.floor(i / 2) * 0.45, w: 4.3, h: 0.4, fontSize: 14, color: WHITE }));
source(s, "Kennedy & Eberhart (1995), pp. 1944–1945 (Sects. 3.2–3.3)");
notes(s, 3);

// ===================== Slide 4: version 2, distance and factor 2 =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Version 2: pull by distance, then factor 2", "Member 1");
ladder(s, [2, 3]);
const v2 = [
  ["②", "v ← v + rand()·p_inc·(pbest − x) + rand()·g_inc·(gbest − x)", "Pull grows with distance: easier to understand, worked better"],
  ["③", "v ← v + 2·rand()·(pbest − x) + 2·rand()·(gbest − x)", "The 1995 PSO: no way to guess which increment is larger, so both → 2; mean pull 1, overshoot about half the time"],
  ["✕", "v ← 2·rand()·(pbest − x) + 2·rand()·(gbest − x)", "Test without the old v: \"quite ineffective at finding global optima\""],
];
v2.forEach(([n, f, d], i) => {
  const y = 1.55 + i * 0.86;
  card(s, 0.5, y, 6.2, 0.76, i === 2 ? "FBEDEA" : LT2);
  T(s, n, { x: 0.6, y: y + 0.08, w: 0.4, h: 0.32, fontSize: 16, bold: true, color: i === 2 ? RED : TEAL, align: "center" });
  T(s, f, { x: 1.05, y: y + 0.06, w: 5.6, h: 0.3, fontFace: HEAD, fontSize: 13, bold: true });
  T(s, d, { x: 1.05, y: y + 0.37, w: 5.6, h: 0.36, fontSize: 12, color: DK2 });
});
// 1-D diagram: pull proportional to distance
T(s, "Pull ∝ distance", { x: 6.95, y: 1.55, w: 2.55, h: 0.3, fontSize: 14, bold: true, align: "center" });
s.addShape(pres.shapes.LINE, { x: 7.0, y: 2.65, w: 2.5, h: 0, line: { color: GREY, width: 1.25 } });
s.addShape(pres.shapes.STAR_5_POINT, { x: 7.05, y: 2.53, w: 0.25, h: 0.25, fill: { color: ORANGE }, line: { color: NAVY, width: 0.75 } });
T(s, "pbest", { x: 6.85, y: 2.8, w: 0.65, h: 0.25, fontSize: 11, color: DK2, align: "center" });
s.addShape(pres.shapes.OVAL, { x: 7.55, y: 2.56, w: 0.18, h: 0.18, fill: { color: TEAL }, line: { color: TEAL } });
arrowLine(s, 7.65, 2.38, 7.4, TEAL);
s.addShape(pres.shapes.OVAL, { x: 9.2, y: 2.56, w: 0.18, h: 0.18, fill: { color: TEAL }, line: { color: TEAL } });
arrowLine(s, 9.3, 2.12, 7.4, TEAL);
T(s, "near: gentle · far: strong", { x: 6.95, y: 3.05, w: 2.55, h: 0.3, fontSize: 12, italic: true, color: TEAL, align: "center" });
card(s, 6.95, 3.45, 2.55, 1.3, NAVY);
T(s, [{ text: "Momentum is essential\n", options: { bold: true, color: ORANGE, fontSize: 14 } },
  { text: "The old velocity carries particles past their targets into unexplored regions.", options: { color: WHITE, fontSize: 13 } }],
  { x: 7.1, y: 3.55, w: 2.3, h: 1.1 });
source(s, "Kennedy & Eberhart (1995), pp. 1945–1946 (Sects. 3.5–3.7)");
notes(s, 4);

// ===================== Slide 5: version 3, speed limit then inertia weight =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Version 3: speed limit, then inertia", "Member 1");
ladder(s, 4);
T(s, [{ text: "Problem: ", options: { bold: true, color: RED } },
  { text: "in the 1995 rule the old v has weight 1 and the pulls strength 2, so speeds grow without control." }],
  { x: 0.5, y: 1.45, w: 9.0, h: 0.32, fontSize: 14, valign: "middle" });
// Fix 1: speed limit
card(s, 0.5, 1.85, 3.15, 1.35);
T(s, "Fix 1: speed limit", { x: 0.65, y: 1.92, w: 2.9, h: 0.3, fontSize: 14, bold: true, color: TEAL });
T(s, "vᵢ ← clip(vᵢ, −v_max, +v_max)", { x: 0.65, y: 2.22, w: 2.9, h: 0.32, fontFace: HEAD, fontSize: 14.5, bold: true, valign: "middle" });
T(s, "per coordinate. Works, but a good v_max depends on the problem; it cuts the swings instead of calming them.", { x: 0.65, y: 2.56, w: 2.9, h: 0.6, fontSize: 11.5, color: DK2 });
T(s, "›", { x: 3.65, y: 2.3, w: 0.25, h: 0.4, fontSize: 22, color: GREY, align: "center", valign: "middle" });
// Fix 2: inertia weight
card(s, 3.9, 1.85, 5.6, 1.35);
T(s, [{ text: "Fix 2: inertia weight ω", options: { bold: true, color: TEAL } }, { text: "  (Shi & Eberhart, 1998)", options: { color: GREY } }],
  { x: 4.05, y: 1.92, w: 5.3, h: 0.3, fontSize: 14 });
T(s, [
  { text: "vᵢ ← " }, { text: "ω·vᵢ", options: { color: GREY } }, { text: " + " },
  { text: "c₁r₁(pbestᵢ − xᵢ)", options: { color: TEAL } }, { text: " + " },
  { text: "c₂r₂(gbest − xᵢ)", options: { color: RED } }, { text: ",  xᵢ ← xᵢ + vᵢ" },
], { x: 4.0, y: 2.22, w: 5.4, h: 0.42, fontFace: HEAD, fontSize: 15, bold: true, align: "center", valign: "middle" });
T(s, [{ text: "inertia", options: { color: GREY, bold: true } }, { text: "  ·  " },
  { text: "cognitive: own experience", options: { color: TEAL, bold: true } }, { text: "  ·  " },
  { text: "social: swarm's knowledge", options: { color: RED, bold: true } }],
  { x: 4.0, y: 2.65, w: 5.4, h: 0.26, fontSize: 12, align: "center", valign: "middle" });
T(s, "1995 PSO = special case ω = 1, c₁ = c₂ = 2", { x: 4.0, y: 2.9, w: 5.4, h: 0.25, fontSize: 11.5, italic: true, color: DK2, align: "center", valign: "middle" });
const rows5 = [["Symbol", "Meaning", "Range"],
  ["ω", "inertia weight; 1 − ω acts like friction", "usually 0.4–0.9"],
  ["c₁, c₂", "strength of the pulls to pbest and gbest", "≥ 0"],
  ["r₁, r₂", "random, new for each particle, coordinate, iteration", "U(0, 1)"],
  ["v_max", "speed limit per coordinate", "with ω: wide"]];
s.addTable(rows5.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0, color: i === 0 ? WHITE : NAVY, fill: { color: i === 0 ? NAVY : WHITE }, fontSize: 12, fontFace: j === 0 && i > 0 ? HEAD : BODY, valign: "middle", align: j === 1 ? "left" : "center" } }))),
  { x: 0.5, y: 3.35, w: 5.9, colW: [0.8, 3.85, 1.25], rowH: 0.3, border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.05 });
card(s, 6.6, 3.35, 2.9, 1.5, NAVY);
T(s, [{ text: "Large ω explores, small ω refines\n", options: { bold: true, color: ORANGE } },
  { text: "With ω, v_max can be set wide, as wide as the search range (V_max = X_max). Common by 2007: ω ≈ 0.73, c₁ = c₂ ≈ 1.5.", options: { color: WHITE } }],
  { x: 6.75, y: 3.43, w: 2.65, h: 1.45, fontSize: 12.5 });
source(s, "v_max: Poli, Kennedy & Blackwell (2007), Sects. 2.2, 2.4; ω: Shi & Eberhart (1998), via Poli et al., Sect. 2.3");
notes(s, 5);

// ===================== Slide 6: one step by hand, iteration 0 =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "One step by hand: iteration 0", "Member 2");
T(s, [{ text: "Fitness = f(x) = x²", options: { bold: true, color: TEAL } }, { text: " (lower is better),  one dimension,  ω = 0.7,  c₁ = c₂ = 1.5,  no velocity limit" }], { x: 0.5, y: 1.05, w: 9.0, h: 0.35, fontSize: 15, fontFace: HEAD });
const rows6a = [["Particle", "x(0)", "v(0)", "r₁", "r₂", "f(x(0)) = x(0)²", "pbest"],
  ["P1", "3", "0.5", "0.4", "0.6", "3² = 9", "3"],
  ["P2", "−2", "−0.5", "0.8", "0.3", "(−2)² = 4  ★ gbest", "−2"]];
s.addTable(rows6a.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0 || (i === 2 && j === 5), color: i === 0 ? WHITE : (i === 2 && j === 5 ? ORANGE : NAVY),
  fill: { color: i === 0 ? NAVY : WHITE }, fontSize: 14, fontFace: BODY, align: "center", valign: "middle" } }))),
  { x: 0.5, y: 1.55, w: 9.0, colW: [1.1, 1.0, 1.0, 0.9, 0.9, 2.6, 1.5], rowH: 0.4, border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.05 });
{
  const X0 = 4.69, U = 1.2333, xl = (v) => X0 + v * U, LY = 3.55;
  s.addShape(pres.shapes.LINE, { x: 1.0, y: LY, w: 8.0, h: 0, line: { color: GREY, width: 1.25 } });
  [-3, -2, -1, 0, 1, 2, 3].forEach((v) => {
    s.addShape(pres.shapes.LINE, { x: xl(v), y: LY - 0.06, w: 0, h: 0.12, line: { color: GREY, width: 1 } });
    T(s, v < 0 ? "−" + -v : String(v), { x: xl(v) - 0.3, y: LY + 0.1, w: 0.6, h: 0.25, fontSize: 11, color: GREY, align: "center" });
  });
  T(s, "optimum", { x: xl(0) - 0.5, y: LY + 0.32, w: 1.0, h: 0.22, fontSize: 10, italic: true, color: GREY, align: "center" });
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
notes(s, 6);

// ===================== Slide 6b: one step by hand, iteration 0 -> 1 =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "One step by hand: iteration 0 → 1", "Member 2");
const rows7 = [["Step", "P1", "P2 (gbest)"],
  ["Inertia  ω·v", "0.7·0.5 = 0.35", "0.7·(−0.5) = −0.35"],
  ["Cognitive  c₁r₁(pbest − x)", "1.5·0.4·(3 − 3) = 0", "1.5·0.8·(−2 − (−2)) = 0"],
  ["Social  c₂r₂(gbest − x)", "1.5·0.6·(−2 − 3) = −4.5", "1.5·0.3·(−2 − (−2)) = 0"],
  ["v(1) = sum of the three", "0.35 + 0 − 4.5 = −4.15", "−0.35 + 0 + 0 = −0.35"],
  ["x(1) = x + v(1)", "3 + (−4.15) = −1.15", "−2 + (−0.35) = −2.35"],
  ["f(x(1)) = x(1)²", "(−1.15)² = 1.3225", "(−2.35)² = 5.5225"]];
s.addTable(rows7.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0 || i === 5, color: i === 0 ? WHITE : (i === 5 && j > 0 ? TEAL : NAVY),
  fill: { color: i === 0 ? NAVY : (i === 5 ? LT2 : WHITE) }, fontSize: 12, fontFace: BODY,
  align: j === 0 ? "left" : "center", valign: "middle" } }))),
  { x: 0.5, y: 1.1, w: 5.9, colW: [2.1, 1.9, 1.9], rowH: 0.4, border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.05 });
{
  const X0 = 8.0, U = 0.42, xl = (v) => X0 + v * U, LY = 2.6;
  T(s, [{ text: "Fitness = f(x) = x²", options: { bold: true, color: TEAL } }, { text: ", lower is better" }], { x: 6.6, y: 1.15, w: 2.9, h: 0.3, fontSize: 12.5, fontFace: HEAD });
  s.addShape(pres.shapes.LINE, { x: 6.6, y: LY, w: 2.9, h: 0, line: { color: GREY, width: 1.25 } });
  [-3, -2, -1, 0, 1, 2, 3].forEach((v) => {
    s.addShape(pres.shapes.LINE, { x: xl(v), y: LY - 0.05, w: 0, h: 0.1, line: { color: GREY, width: 1 } });
    T(s, v < 0 ? "−" + -v : String(v), { x: xl(v) - 0.2, y: LY + 0.08, w: 0.4, h: 0.22, fontSize: 10, color: GREY, align: "center" });
  });
  T(s, "optimum", { x: xl(0) - 0.4, y: LY + 0.28, w: 0.8, h: 0.2, fontSize: 9, italic: true, color: GREY, align: "center" });
  s.addShape(pres.shapes.OVAL, { x: xl(3) - 0.08, y: LY - 0.08, w: 0.16, h: 0.16, fill: { color: TEAL }, line: { color: TEAL } });
  s.addShape(pres.shapes.OVAL, { x: xl(-2) - 0.08, y: LY - 0.08, w: 0.16, h: 0.16, fill: { color: ORANGE }, line: { color: ORANGE } });
  arrowLine(s, xl(3), LY - 0.28, xl(-1.15), TEAL);
  T(s, "P1: 3 → −1.15, overshoots (f 9 → 1.32)", { x: 6.6, y: LY - 0.62, w: 2.9, h: 0.26, fontSize: 11, bold: true, color: TEAL, align: "right" });
  arrowLine(s, xl(-2), LY - 0.28, xl(-2.35), RED);
  T(s, "P2: −2 → −2.35, worse (f 4 → 5.52)", { x: 6.6, y: LY + 0.52, w: 2.9, h: 0.26, fontSize: 11, bold: true, color: RED });
}
card(s, 0.5, 4.38, 9.0, 0.72);
T(s, [{ text: "One particle gets worse, yet the swarm gets better: ", options: { bold: true } },
  { text: "gbest moves from −2 to −1.15 (f 4 → 1.32)." }],
  { x: 0.7, y: 4.42, w: 8.6, h: 0.64, fontSize: 15, valign: "middle" });
source(s, "Team worked example (report Table 2)");
notes(s, "6b");

// ===================== Slide 7: setup =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Test problems and setup", "Member 2");
[["Sphere", "Σᵢ xᵢ² = x₁² + x₂²", "f(3, −1) = 9 + 1 = 10", "Unimodal: tests speed", "slide_func_sphere.png"],
 ["Rastrigin", "10n + Σᵢ (xᵢ² − 10 cos 2πxᵢ)", "f(1, 0) = 20 + (1 − 10) + (0 − 10) = 1", "Multimodal: tests trapping", "slide_func_rastrigin.png"]].forEach(([n, f, ex, d, img], i) => {
  const x = 0.5 + i * 2.85;
  card(s, x, 1.05, 2.7, 3.2);
  T(s, n, { x: x + 0.15, y: 1.1, w: 2.4, h: 0.32, fontFace: HEAD, fontSize: 17, bold: true });
  T(s, "fitness function", { x: x + 1.3, y: 1.15, w: 1.3, h: 0.28, fontSize: 11, bold: true, color: TEAL, align: "right", valign: "middle" });
  T(s, "f(x) = " + f, { x: x + 0.15, y: 1.42, w: 2.45, h: 0.3, fontFace: HEAD, fontSize: i ? 11 : 12.5 });
  s.addImage({ path: FIG(img), x: x + 0.53, y: 1.76, w: 1.64, h: 1.54, altText: n + " contour plot with the minimum at the origin" });
  T(s, [{ text: "e.g. ", options: { italic: true } }, { text: ex }], { x: x + 0.15, y: 3.36, w: 2.45, h: 0.28, fontFace: HEAD, fontSize: i ? 10.5 : 12 });
  T(s, d, { x: x + 0.15, y: 3.72, w: 2.45, h: 0.4, fontSize: 12.5, bold: true, color: DK2 });
});
T(s, "Both: n = 2, x ∈ [−5.12, 5.12]², minimum f = 0 at (0, 0). A particle's fitness is f at its position; lower is better", { x: 0.5, y: 4.35, w: 5.55, h: 0.5, fontSize: 12, italic: true, color: DK2 });
// right column: loop + settings + budget
T(s, "Loop", { x: 6.3, y: 1.05, w: 3.2, h: 0.28, fontSize: 13, bold: true, color: TEAL });
["Initialise x, v at random", "Evaluate f", "Update pbest, gbest", "Move every particle, repeat"].forEach((t, i) => {
  badge(s, 6.3, 1.38 + i * 0.38, i + 1, 0.3);
  T(s, t, { x: 6.7, y: 1.38 + i * 0.38, w: 2.8, h: 0.3, fontSize: 12.5, valign: "middle" });
});
T(s, "Our settings", { x: 6.3, y: 2.95, w: 3.2, h: 0.28, fontSize: 13, bold: true, color: TEAL });
T(s, "ω = 0.7, c₁ = c₂ = 1.5 (2007 standard, rounded); v_max = 10.24 (domain width); positions put back on the boundary", { x: 6.3, y: 3.23, w: 3.2, h: 0.8, fontSize: 12 });
T(s, "2,020", { x: 6.3, y: 4.05, w: 1.5, h: 0.6, fontFace: HEAD, fontSize: 30, bold: true, color: TEAL, valign: "middle" });
T(s, "evaluations per run: 20 particles × 100 iterations + 20 at start; seeds 0–4", { x: 7.8, y: 4.05, w: 1.75, h: 0.9, fontSize: 11, color: DK2 });
source(s, "Functions and settings: team design (report Sect. 3); figures: team illustration");
notes(s, 7);

// ===================== Slide 8: five particles =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Five particles: iteration 0 → 1", "Member 2");
s.addImage({ path: FIG("slide_swarm_step01.png"), x: 0.5, y: 1.0, w: 3.6, h: 4.15, altText: "Five particles on Sphere moving from iteration 0 to 1; particles 3 and 5 improve, gbest drops from 8.26 to 0.37" });
const rows8 = [["P", "(x₁, x₂) iter 0", "f", "(x₁, x₂) iter 1", "f"],
  ["1", "(2.81, −0.63)", "8.26 ★", "(0.95, 5.12)", "27.12"],
  ["2", "(3.67, 2.02)", "17.57", "(5.12, 5.12)", "52.43"],
  ["3", "(−4.16, 4.87)", "40.99", "(−0.06, −0.60)", "0.37 ★"],
  ["4", "(2.67, 2.93)", "15.73", "(3.48, −5.12)", "38.34"],
  ["5", "(−3.81, −0.51)", "14.76", "(3.14, 1.26)", "11.45"]];
const better = { 3: true, 5: true };
s.addTable(rows8.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || c.includes("★"), color: i === 0 ? WHITE : (j === 4 && i > 0 ? (better[i] ? TEAL : RED) : NAVY),
  fill: { color: i === 0 ? NAVY : WHITE }, fontSize: 12.5, fontFace: BODY, align: "center", valign: "middle" } }))),
  { x: 4.4, y: 1.05, w: 5.1, colW: [0.4, 1.35, 0.75, 1.5, 1.1], rowH: 0.34, border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.03 });
T(s, "Sphere, f(x) = x₁² + x₂², seed 42, ω = 0.7, c₁ = c₂ = 1.5.  ★ = gbest", { x: 4.4, y: 3.15, w: 5.1, h: 0.28, fontSize: 11, italic: true, color: GREY });
[["8.26 → 0.37", "gbest after one step"], ["2 of 5", "particles improve"]].forEach(([big, small], i) => {
  T(s, big, { x: 4.4 + i * 2.6, y: 3.5, w: 2.5, h: 0.5, fontFace: HEAD, fontSize: 24, bold: true, color: i ? RED : TEAL });
  T(s, small, { x: 4.4 + i * 2.6, y: 3.98, w: 2.5, h: 0.28, fontSize: 12, color: DK2 });
});
T(s, "5.12 = moved back to the boundary. gbest stays 0.37 up to iteration 5. Code matches a hand recomputation of particle 2.", { x: 4.4, y: 4.38, w: 5.1, h: 0.7, fontSize: 12, color: DK2 });
source(s, "Team experiment (report Table 3, Figure 1; results/swarm_states_sphere_seed42.csv)");
notes(s, 8);

// ===================== Slide 9: inertia =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "How much inertia?", "Member 3");
s.addImage({ path: FIG("fig_omega_sphere.png"), x: 0.5, y: 1.0, w: 4.35, h: 2.82, altText: "Sphere: mean best fitness against iteration for omega 0.4, 0.7 and 0.9 over five seeds" });
s.addImage({ path: FIG("fig_omega_rastrigin.png"), x: 5.15, y: 1.0, w: 4.35, h: 2.82, altText: "Rastrigin: mean best fitness against iteration for omega 0.4, 0.7 and 0.9 over five seeds" });
const rows9 = [["Mean final fitness", "ω = 0.4", "ω = 0.7", "ω = 0.9"],
  ["Sphere", "8.8 × 10⁻³⁰", "1.0 × 10⁻¹²", "3.6 × 10⁻⁴"],
  ["Rastrigin", "≈ 0", "1.1 × 10⁻⁶", "0.164"]];
s.addTable(rows9.map((r, i) => r.map((c, j) => ({ text: c, options: {
  bold: i === 0 || j === 0 || (j === 1 && i > 0), color: i === 0 || (j === 1 && i > 0) ? WHITE : NAVY,
  fill: { color: i === 0 ? NAVY : (j === 1 ? TEAL : WHITE) }, fontSize: 11.5, fontFace: BODY, align: "center", valign: "middle" } }))),
  { x: 0.5, y: 3.98, w: 4.6, colW: [1.45, 1.05, 1.05, 1.05], rowH: 0.34, border: { type: "solid", pt: 0.75, color: PALE }, margin: 0.03 });
const p9 = [["High ω keeps moving: ", "ω = 0.9 settles slowest on both"],
  ["Depends on v_max: ", "with v_max ≤ 5.12 one ω = 0.4 Rastrigin run stalls (0.995)"],
  ["Five seeds only: ", "one bad run can dominate a mean"]];
p9.forEach(([b, t], i) => {
  badge(s, 5.35, 4.0 + i * 0.36, i + 1, 0.28);
  T(s, [{ text: b, options: { bold: true } }, { text: t }], { x: 5.72, y: 3.98 + i * 0.36, w: 3.8, h: 0.32, fontSize: 11.5, valign: "middle" });
});
source(s, "Team experiment: 20 particles, c₁ = c₂ = 1.5, v_max = 10.24, seeds 0–4, bands = min–max (report Tables 6–7)");
notes(s, 9);

// ===================== Slide 10: same budget =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "Same budget, two landscapes", "Member 3");
s.addImage({ path: FIG("fig_compare_sphere.png"), x: 0.5, y: 1.0, w: 4.4, h: 2.48, altText: "Best-so-far fitness against evaluations on Sphere for PSO, Random Search and Hill Climbing" });
s.addImage({ path: FIG("fig_compare_rastrigin.png"), x: 5.1, y: 1.0, w: 4.4, h: 2.48, altText: "Best-so-far fitness against evaluations on Rastrigin for PSO, Random Search and Hill Climbing" });
[["42.6 vs 216", "evaluations to reach 0.01 on Sphere: Hill Climbing first"],
 ["1.0 × 10⁻¹²", "PSO mean final on Sphere (HC 2.6 × 10⁻⁴, RS 1.4 × 10⁻²)"],
 ["5/5 vs 0/5", "Rastrigin runs reaching 0.01: PSO vs each baseline"]].forEach(([b, t], i) => {
  const x = 0.5 + i * 3.08;
  card(s, x, 3.65, 2.84, 1.4);
  T(s, b, { x: x + 0.15, y: 3.72, w: 2.6, h: 0.55, fontFace: HEAD, fontSize: 24, bold: true, valign: "middle" });
  T(s, t, { x: x + 0.15, y: 4.28, w: 2.6, h: 0.7, fontSize: 13, color: DK2 });
});
source(s, "Team experiments: 2,020 evaluations per run, seeds 0–4 (report Tables 4–5, Figure 2)");
notes(s, 10);

// ===================== Slide 11: stuck =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "When the swarm gets stuck", "Member 3");
s.addImage({ path: FIG("fig_local_optimum.png"), x: 0.5, y: 1.0, w: 6.1, h: 3.76, altText: "Diagnostic swarm on Rastrigin collapsing onto a local minimum, with best fitness and swarm diversity compared with the default run" });
const p11 = [["Setting", "Rastrigin, 5 particles, ω = 0.4, c₁ = 0.5, c₂ = 2.5 (strong social pull)"],
  ["Result", "All 20 seeds end above 0.9; seed 0 stops at (0, −0.995), f ≈ 0.995"],
  ["Why", "Diversity 4.18 → 3.0 × 10⁻⁹: nobody explores any more"],
  ["Compare", "Default PSO, same seed: f ≈ 1.6 × 10⁻⁸"]];
p11.forEach(([h, t], i) => {
  T(s, h, { x: 6.8, y: 1.0 + i * 0.85, w: 2.7, h: 0.28, fontSize: 14, bold: true, color: RED });
  T(s, t, { x: 6.8, y: 1.28 + i * 0.85, w: 2.7, h: 0.55, fontSize: 12 });
});
card(s, 0.5, 4.8, 9.0, 0.38, NAVY);
T(s, [{ text: "Premature convergence: ", options: { bold: true, color: ORANGE } },
  { text: "diversity lost before the best basin is found. Several settings changed at once, so no single cause.", options: { color: WHITE } }],
  { x: 0.65, y: 4.8, w: 8.7, h: 0.38, fontSize: 12, valign: "middle" });
source(s, "Team experiment: Rastrigin, seeds 0–19, 505 evaluations per run (report Figure 3, Sect. 4.3)");
notes(s, 11);

// ===================== Slide 12: so what =====================
s = pres.addSlide({ masterName: "CONTENT" });
header(s, "So what? Answer, uses, limits", "Member 3");
[["pbest", "keeps each particle's discoveries: diversity, exploration"],
 ["gbest", "pulls the swarm to the best region: focus, exploitation"],
 ["ω", "sets how far particles carry on past their targets"]].forEach(([h, t], i) => {
  const x = 0.5 + i * 3.08;
  card(s, x, 1.0, 2.84, 1.2);
  badge(s, x + 0.12, 1.1, i + 1, 0.36);
  T(s, h, { x: x + 0.6, y: 1.1, w: 2.1, h: 0.36, fontFace: HEAD, fontSize: 17, bold: true, valign: "middle" });
  T(s, t, { x: x + 0.15, y: 1.52, w: 2.6, h: 0.62, fontSize: 13, color: DK2 });
});
T(s, [{ text: "Balance is the answer: ", options: { bold: true, color: TEAL } }, { text: "too much social pull with too few particles leads to premature convergence." }],
  { x: 0.5, y: 2.3, w: 9.0, h: 0.32, fontSize: 14 });
T(s, "Real uses (several local optima)", { x: 0.5, y: 2.75, w: 4.4, h: 0.3, fontSize: 14, bold: true, color: TEAL });
T(s, [
  { text: "Solar panels: ", options: { bold: true, breakLine: false } },
  { text: "PSO tracks the maximum power point under partial shading; a local method got stuck on a lower peak in 2 of 3 scenarios (Alshareef et al., 2019)", options: { breakLine: true } },
  { text: "UAV paths: ", options: { bold: true } },
  { text: "a PSO variant (SPSO) had lower mean cost than classic PSO in 6 of 8 scenarios (Phung & Ha, 2021)" }],
  { x: 0.5, y: 3.08, w: 4.4, h: 1.35, fontSize: 12.5, paraSpaceAfter: 6 });
T(s, "Limits of our study", { x: 5.1, y: 2.75, w: 4.4, h: 0.3, fontSize: 14, bold: true, color: RED });
T(s, [
  { text: "2 functions, 2-D, optimum at the centre, 5 seeds", options: { bullet: { indent: 14 }, breakLine: true } },
  { text: "gbest topology only; Hill Climbing without restarts", options: { bullet: { indent: 14 }, breakLine: true } },
  { text: "Next: shifted functions, lbest, swarm size, restarts", options: { bullet: { indent: 14 } } }],
  { x: 5.1, y: 3.08, w: 4.4, h: 1.3, fontSize: 12.5, paraSpaceAfter: 4 });
card(s, 0.5, 4.5, 9.0, 0.62, NAVY);
T(s, "On multimodal functions, shared information beats single-point local search, as long as the social pull does not cause premature convergence.",
  { x: 0.65, y: 4.5, w: 8.7, h: 0.62, fontSize: 13, italic: true, color: WHITE, valign: "middle" });
source(s, "Team experiments; Alshareef et al. (2019); Phung & Ha (2021); Poli et al. (2007), Sect. 7.1");
notes(s, 12);

// ===================== Slide 13: thank you + references =====================
s = pres.addSlide({ masterName: "DARK" });
T(s, "Thank you · Questions?", { x: 0.6, y: 0.4, w: 8.8, h: 0.8, fontFace: HEAD, fontSize: 34, bold: true, color: WHITE, align: "center", valign: "middle" });
const refs = [
  "Kennedy, J. & Eberhart, R. (1995). Particle swarm optimization. Proc. ICNN'95, 1942–1948.",
  "Poli, R., Kennedy, J. & Blackwell, T. (2007). Particle swarm optimization: An overview. Swarm Intelligence 1, 33–57.",
  "Shi, Y. & Eberhart, R. C. (1998). A modified particle swarm optimizer. Proc. IEEE ICEC, 69–73.",
  "Alshareef, M. et al. (2019). Accelerated PSO for photovoltaic MPPT under partial shading. Energies 12(4), 623.",
  "Phung, M. D. & Ha, Q. P. (2021). Safety-enhanced UAV path planning with spherical vector-based PSO. Appl. Soft Comput. 107, 107376.",
];
T(s, refs.map((r, i) => ({ text: r, options: { breakLine: i < refs.length - 1 } })), { x: 0.7, y: 1.45, w: 8.6, h: 2.6, fontSize: 13, color: LIGHT, paraSpaceAfter: 6 });
T(s, "AI tools (Claude, OpenAI Codex) assisted with code, drafting and slides; all numbers were checked by the team against the notebooks.", { x: 0.7, y: 4.25, w: 8.6, h: 0.5, fontSize: 13, color: ORANGE });
T(s, "Backup slides: B1 pseudo-code · B2 variants · B3 v_max sensitivity · B4 fair comparison", { x: 0.7, y: 4.85, w: 8.6, h: 0.3, fontSize: 11, italic: true, color: LIGHT });
s.addNotes("Take questions. Backup slides B1 to B4 follow.");

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
  bold: i === 0 || j === 0, color: i === 0 ? WHITE : NAVY, fill: { color: i === 0 ? NAVY : (j === 0 ? LT2 : WHITE) }, fontSize: 12, fontFace: BODY, valign: "middle" } }))),
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
  bold: i === 0 || j === 0 || i === 3, color: i === 0 ? WHITE : NAVY, fill: { color: i === 0 ? NAVY : (i === 3 ? LT2 : WHITE) }, fontSize: 14, fontFace: BODY, align: "center", valign: "middle" } }))),
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
  T(s, h, { x: 0.7, y: 1.0 + i * 0.95, w: 1.9, h: 0.82, fontFace: HEAD, fontSize: 16, bold: true, color: TEAL, valign: "middle" });
  T(s, t, { x: 2.6, y: 1.0 + i * 0.95, w: 6.75, h: 0.82, fontSize: 13.5, valign: "middle" });
});
T(s, [{ text: "Same seeds (0–4) and the same budget for every method. ", options: { bold: true } },
  { text: "Cost is measured in function evaluations, not run time. A random-restart Hill Climbing would be a stronger baseline." }],
  { x: 0.5, y: 3.98, w: 9.0, h: 0.8, fontSize: 14 });
source(s, "Report Sect. 3 and Limitations");
s.addNotes("Backup for questions about the fairness of the comparison with the baselines.");

pres.writeFile({ fileName: OUT }).then((f) => console.log("wrote", f));
