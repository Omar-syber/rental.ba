#!/usr/bin/env node
// Converts a walkthrough video into the numbered frame sequence Phase 1 of
// the Hero scroll animation scrubs through. Run:
//
//   node scripts/extract-hero-frames.mjs <path-to-video> [--frames=96] [--width=1600]
//
// Requires ffmpeg + ffprobe on PATH. Frames are written to
// public/hero-sequence/frame-XXXX.jpg and public/hero-sequence/manifest.json
// is (re)written to describe them. Until this has been run against a real
// video, manifest.json stays in its placeholder state and HeroSequence.js
// falls back to the static hero frame instead of a scrubbed sequence.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "hero-sequence");
const manifestPath = path.join(outDir, "manifest.json");

function fail(msg) {
  console.error(`\n[hero-frames] ${msg}\n`);
  process.exit(1);
}

function run(cmd, args) {
  const result = spawnSync(cmd, args, { encoding: "utf8" });
  if (result.error) fail(`Failed to run "${cmd}": ${result.error.message}`);
  return result;
}

const [, , videoArg, ...rest] = process.argv;
if (!videoArg) {
  fail(
    "Usage: node scripts/extract-hero-frames.mjs <path-to-video> [--frames=96] [--width=1280] [--quality=6]"
  );
}

const videoPath = path.resolve(process.cwd(), videoArg);
if (!existsSync(videoPath)) fail(`Video not found: ${videoPath}`);

const frameCount = Number(rest.find((a) => a.startsWith("--frames="))?.split("=")[1]) || 96;
// 1280px and qscale 6 keep a ~96-frame sequence in the low tens of MB
// instead of 50MB+ — every frame is preloaded before scrubbing starts
// (HeroSequence.js), so total payload directly sets the hero's load time.
const width = Number(rest.find((a) => a.startsWith("--width="))?.split("=")[1]) || 1280;
const quality = Number(rest.find((a) => a.startsWith("--quality="))?.split("=")[1]) || 6;

for (const bin of ["ffmpeg", "ffprobe"]) {
  const check = run(bin, ["-version"]);
  if (check.status !== 0) fail(`"${bin}" not found on PATH. Install ffmpeg first.`);
}

const durationResult = run("ffprobe", [
  "-v", "error",
  "-show_entries", "format=duration",
  "-of", "default=noprint_wrappers=1:nokey=1",
  videoPath,
]);
const duration = parseFloat(durationResult.stdout.trim());
if (!duration || duration <= 0) fail("Could not read video duration via ffprobe.");

const fps = frameCount / duration;

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

console.log(
  `[hero-frames] Extracting ~${frameCount} frames from ${path.basename(videoPath)} ` +
    `(${duration.toFixed(1)}s @ ${fps.toFixed(2)}fps, width ${width}px)...`
);

const extract = run("ffmpeg", [
  "-y",
  "-i", videoPath,
  "-vf", `fps=${fps},scale=${width}:-2`,
  "-qscale:v", String(quality),
  path.join(outDir, "frame-%04d.jpg"),
]);
if (extract.status !== 0) fail(`ffmpeg extraction failed:\n${extract.stderr}`);

const frames = readdirSync(outDir)
  .filter((f) => /^frame-\d{4}\.jpg$/.test(f))
  .sort();
if (frames.length === 0) fail("ffmpeg produced no frames.");

const probeFirst = run("ffprobe", [
  "-v", "error",
  "-select_streams", "v:0",
  "-show_entries", "stream=width,height",
  "-of", "csv=s=x:p=0",
  path.join(outDir, frames[0]),
]);
const [probedWidth, probedHeight] = probeFirst.stdout.trim().split("x").map(Number);

const manifest = {
  placeholder: false,
  count: frames.length,
  pattern: "frame-%04d.jpg",
  width: probedWidth || width,
  height: probedHeight || null,
  source: path.basename(videoPath),
  generatedAt: new Date().toISOString(),
};
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(`[hero-frames] Wrote ${frames.length} frames + manifest.json to public/hero-sequence/`);
