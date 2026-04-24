const SOURCE_DARK = "spaciva_dark.png";
const SOURCE_LIGHT = "spaciva_light.png";
const OUT_DARK = "spaciva-wordmark-dark.png";
const OUT_LIGHT = "spaciva-wordmark-light.png";

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function colorDistance(r1, g1, b1, r2, g2, b2) {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function luma(r, g, b) {
  // Perceived luminance (sRGB-ish)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getBackgroundColor(data, width, height, channels) {
  const border = Math.max(8, Math.round(Math.min(width, height) * 0.03));
  let count = 0;
  let rSum = 0;
  let gSum = 0;
  let bSum = 0;

  const samplePixel = (x, y) => {
    const idx = (y * width + x) * channels;
    const a = data[idx + 3];
    if (a < 16) return;
    rSum += data[idx];
    gSum += data[idx + 1];
    bSum += data[idx + 2];
    count += 1;
  };

  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const isBorder = x < border || x >= width - border || y < border || y >= height - border;
      if (!isBorder) continue;
      samplePixel(x, y);
    }
  }

  if (count === 0) return { r: 255, g: 255, b: 255 };
  return {
    r: Math.round(rSum / count),
    g: Math.round(gSum / count),
    b: Math.round(bSum / count),
  };
}

function getBackgroundLuma(data, width, height, channels) {
  const border = Math.max(8, Math.round(Math.min(width, height) * 0.03));
  const samples = [];
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const isBorder = x < border || x >= width - border || y < border || y >= height - border;
      if (!isBorder) continue;
      const idx = (y * width + x) * channels;
      const a = data[idx + 3];
      if (a < 16) continue;
      samples.push(luma(data[idx], data[idx + 1], data[idx + 2]));
    }
  }
  if (samples.length === 0) return 255;
  samples.sort((a, b) => a - b);
  return samples[Math.floor(samples.length / 2)];
}

function createLumaMatte(data, width, height, channels, mode) {
  // mode: 'keepBright' (dark bg) | 'keepDark' (light bg)
  const out = Buffer.from(data);
  const bgL = getBackgroundLuma(data, width, height, channels);

  // More aggressive separation to handle gradients/noise.
  const softness = 16;
  const threshold =
    mode === "keepBright"
      ? clamp(bgL + 120, 140, 230)
      : clamp(bgL - 120, 40, 170);

  for (let i = 0; i < width * height; i++) {
    const idx = i * channels;
    const r = out[idx];
    const g = out[idx + 1];
    const b = out[idx + 2];
    const a = out[idx + 3];
    if (a === 0) continue;

    const L = luma(r, g, b);

    let alpha;
    if (mode === "keepBright") {
      alpha = ((L - threshold) / softness) * 255;
    } else {
      alpha = ((threshold - L) / softness) * 255;
    }
    out[idx + 3] = Math.round(clamp(alpha, 0, 255));
  }

  return out;
}

function findAlphaBounds(data, width, height, channels) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const a = data[idx + 3];
      if (a < 24) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < 0 || maxY < 0) return null;
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function findIconTextSplitY(data, width, height, channels) {
  // Compute alpha mass per row to find a valley between icon (top) and text (bottom).
  const row = new Array(height).fill(0);
  for (let y = 0; y < height; y++) {
    let sum = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const a = data[idx + 3];
      if (a > 24) sum += a;
    }
    row[y] = sum;
  }

  const max = Math.max(...row);
  if (max <= 0) return null;

  // Search for the lowest point in the middle band.
  const start = Math.floor(height * 0.18);
  const end = Math.floor(height * 0.65);
  let bestY = null;
  let bestVal = Infinity;
  for (let y = start; y < end; y++) {
    const val = row[y];
    if (val < bestVal) {
      bestVal = val;
      bestY = y;
    }
  }

  // Only treat as a real split if the valley is meaningfully low.
  if (bestY == null) return null;
  if (bestVal > max * 0.15) return null;
  return bestY;
}

function findProjectionBounds(data, width, height, channels) {
  const row = new Array(height).fill(0);
  const col = new Array(width).fill(0);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const a = data[idx + 3];
      if (a < 24) continue;
      row[y] += a;
      col[x] += a;
    }
  }

  const maxRow = Math.max(...row);
  const maxCol = Math.max(...col);
  if (maxRow <= 0 || maxCol <= 0) return null;

  const rowCut = maxRow * 0.22;
  const colCut = maxCol * 0.22;

  let top = 0;
  while (top < height && row[top] < rowCut) top++;
  let bottom = height - 1;
  while (bottom >= 0 && row[bottom] < rowCut) bottom--;

  let left = 0;
  while (left < width && col[left] < colCut) left++;
  let right = width - 1;
  while (right >= 0 && col[right] < colCut) right--;

  if (right <= left || bottom <= top) return null;
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

async function processOne({ sharp, path, inputFile, outputFile }) {
  const inputPath = path.resolve(__dirname, "public", inputFile);
  const outputPath = path.resolve(__dirname, "public", outputFile);

  const { data: orig, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const mode = inputFile.toLowerCase().includes("light") ? "keepDark" : "keepBright";
  const matte = createLumaMatte(orig, width, height, channels, mode);
  const bounds = findAlphaBounds(matte, width, height, channels);
  if (!bounds) {
    throw new Error(`No foreground detected in ${inputFile}.`);
  }

  // Tight crop
  const extracted = await sharp(matte, { raw: { width, height, channels } })
    .extract(bounds)
    .toBuffer({ resolveWithObject: true });

  const exWidth = extracted.info.width;
  const exHeight = extracted.info.height;
  const exChannels = extracted.info.channels;

  // Remove the top icon by cropping from the valley down.
  const splitY = findIconTextSplitY(extracted.data, exWidth, exHeight, exChannels);
  const paddingTop = 10;
  const cropTop = splitY != null ? clamp(splitY - paddingTop, 0, exHeight - 1) : 0;
  const cropHeight = exHeight - cropTop;

  const withoutIcon = await sharp(extracted.data, {
    raw: { width: exWidth, height: exHeight, channels: exChannels },
  })
    .extract({ left: 0, top: cropTop, width: exWidth, height: cropHeight })
    .toBuffer({ resolveWithObject: true });

  // Crop again to the main text block (avoids tiny decorative artifacts).
  const mainBounds = findProjectionBounds(
    withoutIcon.data,
    withoutIcon.info.width,
    withoutIcon.info.height,
    withoutIcon.info.channels
  );

  const pad = 8;
  const finalBounds = mainBounds
    ? {
        left: clamp(mainBounds.left - pad, 0, withoutIcon.info.width - 1),
        top: clamp(mainBounds.top - pad, 0, withoutIcon.info.height - 1),
        width: clamp(mainBounds.width + pad * 2, 1, withoutIcon.info.width),
        height: clamp(mainBounds.height + pad * 2, 1, withoutIcon.info.height),
      }
    : { left: 0, top: 0, width: withoutIcon.info.width, height: withoutIcon.info.height };

  await sharp(withoutIcon.data, {
    raw: {
      width: withoutIcon.info.width,
      height: withoutIcon.info.height,
      channels: withoutIcon.info.channels,
    },
  })
    .extract(finalBounds)
    .trim({ threshold: 12 })
    .png()
    .toFile(outputPath);

  return outputPath;
}

async function main() {
  const [{ default: sharp }, path] = await Promise.all([
    import("sharp"),
    import("node:path"),
  ]);

  console.log("\nSPACIVA logo processor");
  console.log(`- Input (dark):  public/${SOURCE_DARK}`);
  console.log(`- Input (light): public/${SOURCE_LIGHT}`);
  console.log(`- Output (dark): public/${OUT_DARK}`);
  console.log(`- Output (light): public/${OUT_LIGHT}\n`);

  const darkOut = await processOne({ sharp, path, inputFile: SOURCE_DARK, outputFile: OUT_DARK });
  const lightOut = await processOne({ sharp, path, inputFile: SOURCE_LIGHT, outputFile: OUT_LIGHT });

  console.log("Done!");
  console.log(`Created: ${darkOut}`);
  console.log(`Created: ${lightOut}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
