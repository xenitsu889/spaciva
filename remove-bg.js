const sharp = require('sharp');
const path = require('path');

async function createLogos() {
  const inputPath = path.resolve(__dirname, 'public/logo-new.png');
  const { data: origData, info } = await sharp(inputPath).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Dark mode logo (white text, transparent bg) — already exists as logo-v2.png
  // Light mode logo (dark text, transparent bg, keep gradient icon)
  const lightData = Buffer.from(origData);

  for (let i = 0; i < width * height; i++) {
    const idx = i * channels;
    const r = lightData[idx], g = lightData[idx+1], b = lightData[idx+2];
    const avg = (r + g + b) / 3;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    const sat = max > 0 ? (max - min) / max : 0;

    // Remove dark gray background
    if (sat < 0.2 && avg < 130) {
      lightData[idx+3] = 0;
      continue;
    }
    // Anti-alias
    if (sat < 0.2 && avg < 160) {
      const factor = (160 - avg) / 30;
      lightData[idx+3] = Math.round(255 * (1 - factor));
      continue;
    }

    // White text → convert to dark navy for light mode
    if (sat < 0.15 && avg > 200) {
      lightData[idx] = 11;
      lightData[idx+1] = 15;
      lightData[idx+2] = 26;
      lightData[idx+3] = 255;
      continue;
    }

    // Colored pixels (gradient icon) - keep and slightly boost
    if (sat > 0.25) {
      lightData[idx] = Math.min(255, Math.round(r * 1.1));
      lightData[idx+1] = Math.min(255, Math.round(g * 1.1));
      lightData[idx+2] = Math.min(255, Math.round(b * 1.1));
      lightData[idx+3] = 255;
    }
  }

  await sharp(lightData, { raw: { width, height, channels } })
    .png()
    .toFile(path.resolve(__dirname, 'public/logo-light.png'));

  console.log('Done! Created logo-light.png');
}

createLogos().catch(console.error);
