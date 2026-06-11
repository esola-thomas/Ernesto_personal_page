// One-off brand asset generation: run `node scripts/generate-assets.mjs`
// Rasterizes the OG card and favicon into the PNG formats social platforms
// and iOS require (SVG og:image / apple-touch-icon are not supported).
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const ogSvg = await readFile(new URL("./og-card.svg", import.meta.url));
await sharp(ogSvg, { density: 144 })
  .resize(1200, 630)
  .png()
  .toFile("public/og-default.png");

const faviconSvg = await readFile("public/favicon.svg");
for (const size of [180, 192, 512]) {
  const name = size === 180 ? "apple-touch-icon.png" : `icon-${size}.png`;
  await sharp(faviconSvg, { density: 300 }).resize(size, size).png().toFile(`public/${name}`);
}

// Headshot: regenerate only when a new source photo is provided.
// Drop a high-res original at scripts/headshot-source.jpg and re-run.
import { existsSync } from "node:fs";
if (existsSync("scripts/headshot-source.jpg")) {
  await sharp("scripts/headshot-source.jpg")
    .resize(480, 480)
    .jpeg({ quality: 88 })
    .toFile("public/images/ernesto-sola-thomas.jpg");
} else {
  console.warn("WARNING: scripts/headshot-source.jpg not found — headshot NOT regenerated");
}

console.log("assets generated");
