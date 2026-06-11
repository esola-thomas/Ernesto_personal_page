// Per-essay OG cards: run `node scripts/generate-og.mjs` (also wired as npm prebuild).
// CI runs `astro build` directly (no prebuild) and lacks the Space Grotesk font,
// so generated PNGs under public/og/writing/ are committed, like og-default.png.
import sharp from "sharp";
import { readFile, readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const PILLAR_LABELS = {
  en: { "regulated-ai": "Regulated AI", "silicon-to-software": "Silicon to Software", "founder-journey": "Founder Journey" },
  es: { "regulated-ai": "IA Regulada", "silicon-to-software": "Del Silicio al Software", "founder-journey": "Camino de Fundador" }
};

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm = {};
  for (const key of ["title", "draft", "ogImage", "pillar"]) {
    const line = match[1].match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
    if (line) fm[key] = line[1].trim().replace(/^["']|["']$/g, "");
  }
  return fm;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function wrapTitle(title, maxChars = 30, maxLines = 3) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (line && (line + " " + word).length > maxChars) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, "") + "…";
  }
  return lines;
}

function cardSvg({ title, eyebrow, pillarLabel }) {
  let lines = wrapTitle(title, 30, 99);
  let fontSize = lines.length >= 3 ? 52 : lines.length === 2 ? 60 : 64;
  if (lines.length > 3) {
    lines = wrapTitle(title, 36, 4);
    fontSize = 44;
  }
  const lineHeight = fontSize * 1.18;
  const titleStartY = 330 - ((lines.length - 1) * lineHeight) / 2;
  const titleSpans = lines
    .map((line, i) => `<text x="92" y="${Math.round(titleStartY + i * lineHeight)}" font-family="Space Grotesk" font-weight="bold" font-size="${fontSize}" fill="#EAEAEA">${escapeXml(line)}</text>`)
    .join("\n  ");
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1100 80) scale(700 420)">
      <stop offset="0" stop-color="#00FF7F" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#00FF7F" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 600) scale(600 360)">
      <stop offset="0" stop-color="#00FF7F" stop-opacity="0.10"/>
      <stop offset="1" stop-color="#00FF7F" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0A0A0A"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <g stroke="#1F3D2E" stroke-width="2" fill="none">
    <path d="M 920 540 H 1040 L 1090 490 V 380"/>
    <path d="M 960 580 H 1080 L 1130 530 V 420"/>
    <circle cx="1090" cy="380" r="5" fill="#1F3D2E"/>
    <circle cx="1130" cy="420" r="5" fill="#1F3D2E"/>
    <path d="M 80 120 H 180 L 220 80 H 320"/>
    <circle cx="320" cy="80" r="5" fill="#1F3D2E"/>
  </g>
  <g transform="translate(92,96)">
    <rect width="72" height="72" rx="16" fill="#0A0A0A" stroke="#00FF7F" stroke-width="3"/>
    <rect x="17" y="17" width="38" height="8" rx="3" fill="#00FF7F"/>
    <rect x="17" y="32" width="27" height="8" rx="3" fill="#00FF7F"/>
    <rect x="17" y="47" width="38" height="8" rx="3" fill="#00FF7F"/>
  </g>
  <text x="188" y="142" font-family="Space Grotesk" font-weight="500" font-size="28" fill="#00FF7F">// ${escapeXml(eyebrow)}</text>
  ${titleSpans}
  <text x="92" y="492" font-family="Space Grotesk" font-weight="500" font-size="28" fill="#00FF7F">${escapeXml(pillarLabel)}</text>
  <rect x="92" y="520" width="64" height="6" rx="3" fill="#00FF7F"/>
  <text x="92" y="572" font-family="Space Grotesk" font-size="26" fill="#777777">ernesto.solathomas.com · Ernesto Sola-Thomas</text>
</svg>`;
}

async function listEssays(dir) {
  if (!existsSync(dir)) return [];
  return (await readdir(dir, { withFileTypes: true }))
    .filter((e) => e.isFile() && /\.mdx?$/.test(e.name))
    .map((e) => e.name);
}

const enDir = new URL("../src/content/writing/", import.meta.url);
const esDir = new URL("../src/content/writing/es/", import.meta.url);
const enFiles = await listEssays(enDir);
const esFiles = await listEssays(esDir);

for (const name of enFiles) {
  if (!esFiles.includes(name)) console.warn(`WARNING: ${name} has no es/ counterpart; its hreflang alternate will 404`);
}
for (const name of esFiles) {
  if (!enFiles.includes(name)) console.warn(`WARNING: es/${name} has no en counterpart; its hreflang alternate will 404`);
}

let generated = 0;
for (const [locale, dir, files] of [["en", enDir, enFiles], ["es", esDir, esFiles]]) {
  const outDir = `public/og/writing/${locale === "es" ? "es/" : ""}`;
  for (const name of files) {
    const raw = await readFile(new URL(name, dir), "utf8");
    const fm = parseFrontmatter(raw);
    if (!fm.title || fm.draft === "true" || fm.ogImage) continue;
    await mkdir(outDir, { recursive: true });
    const slug = name.replace(/\.mdx?$/, "");
    const svg = cardSvg({
      title: fm.title,
      eyebrow: locale === "es" ? "Escritos" : "Writing",
      pillarLabel: PILLAR_LABELS[locale][fm.pillar] ?? ""
    });
    await sharp(Buffer.from(svg), { density: 144 }).resize(1200, 630).png().toFile(`${outDir}${slug}.png`);
    generated++;
  }
}

console.log(`og cards generated: ${generated} (drafts and ogImage overrides skipped)`);
