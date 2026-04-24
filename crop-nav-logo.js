import sharp from "sharp";
import fs from "node:fs/promises";

function clampInt(v, min, max) {
  return Math.max(min, Math.min(max, v | 0));
}

function regionStats(data, width, height, channels, x0, y0, rw, rh) {
  let r = 0,
    g = 0,
    b = 0,
    n = 0;
  let r2 = 0,
    g2 = 0,
    b2 = 0;

  const x1 = Math.min(width, x0 + rw);
  const y1 = Math.min(height, y0 + rh);

  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const idx = (y * width + x) * channels;
      const rr = data[idx];
      const gg = data[idx + 1];
      const bb = data[idx + 2];
      r += rr;
      g += gg;
      b += bb;
      r2 += rr * rr;
      g2 += gg * gg;
      b2 += bb * bb;
      n++;
    }
  }

  const mean = { r: r / n, g: g / n, b: b / n };
  const std = {
    r: Math.sqrt(Math.max(0, r2 / n - mean.r * mean.r)),
    g: Math.sqrt(Math.max(0, g2 / n - mean.g * mean.g)),
    b: Math.sqrt(Math.max(0, b2 / n - mean.b * mean.b)),
  };
  const stdMax = Math.max(std.r, std.g, std.b);
  return { mean, stdMax };
}

function dist2(a, b) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return dr * dr + dg * dg + db * db;
}

async function autoCropToForeground({ inputPath, outputPath }) {
  // Work on a downscaled copy to stabilize noise/texture.
  const small = sharp(inputPath)
    .ensureAlpha()
    .resize({ width: 320, withoutEnlargement: true, fit: "inside" });

  const { data, info } = await small.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const sampleSize = Math.max(10, Math.round(Math.min(width, height) * 0.06));
  const samples = [
    regionStats(data, width, height, channels, 0, 0, sampleSize, sampleSize),
    regionStats(data, width, height, channels, width - sampleSize, 0, sampleSize, sampleSize),
    regionStats(data, width, height, channels, 0, height - sampleSize, sampleSize, sampleSize),
    regionStats(
      data,
      width,
      height,
      channels,
      width - sampleSize,
      height - sampleSize,
      sampleSize,
      sampleSize
    ),
  ];

  const bgMeans = samples.map((s) => s.mean);
  const noise = Math.max(...samples.map((s) => s.stdMax));
  const threshold = Math.max(24, noise * 6);
  const threshold2 = threshold * threshold;

  let minX = width,
    minY = height,
    maxX = -1,
    maxY = -1;

  // Scan and find pixels sufficiently far from all corner backgrounds.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const a = data[idx + 3];
      if (a < 10) continue;

      const px = { r: data[idx], g: data[idx + 1], b: data[idx + 2] };
      let nearest = Infinity;
      for (const bg of bgMeans) {
        const d = dist2(px, bg);
        if (d < nearest) nearest = d;
      }

      if (nearest > threshold2) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Fallback: no detection, just copy input.
  if (maxX < 0 || maxY < 0) {
    await sharp(inputPath).toFile(outputPath);
    return;
  }

  // Add padding.
  const padX = Math.round((maxX - minX + 1) * 0.12);
  const padY = Math.round((maxY - minY + 1) * 0.16);

  minX = clampInt(minX - padX, 0, width - 1);
  minY = clampInt(minY - padY, 0, height - 1);
  maxX = clampInt(maxX + padX, 0, width - 1);
  maxY = clampInt(maxY + padY, 0, height - 1);

  const cropSmall = {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };

  // Map crop back to original image coordinates.
  const origMeta = await sharp(inputPath).metadata();
  const scale = (origMeta.width ?? width) / width;

  const crop = {
    left: clampInt(Math.round(cropSmall.left * scale), 0, (origMeta.width ?? width) - 1),
    top: clampInt(Math.round(cropSmall.top * scale), 0, (origMeta.height ?? height) - 1),
    width: clampInt(
      Math.round(cropSmall.width * scale),
      1,
      (origMeta.width ?? width) - Math.round(cropSmall.left * scale)
    ),
    height: clampInt(
      Math.round(cropSmall.height * scale),
      1,
      (origMeta.height ?? height) - Math.round(cropSmall.top * scale)
    ),
  };

  await sharp(inputPath).extract(crop).toFile(outputPath);
}

async function main() {
  await autoCropToForeground({
    inputPath: "public/spaciva_dark.png",
    outputPath: "public/spaciva-nav-dark.png",
  });
  await autoCropToForeground({
    inputPath: "public/spaciva_light.png",
    outputPath: "public/spaciva-nav-light.png",
  });

  // Light optimization for navbar usage
  const darkBuf = await sharp("public/spaciva-nav-dark.png")
    .resize({ height: 56, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await fs.writeFile("public/spaciva-nav-dark.png", darkBuf);

  const lightBuf = await sharp("public/spaciva-nav-light.png")
    .resize({ height: 56, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await fs.writeFile("public/spaciva-nav-light.png", lightBuf);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
