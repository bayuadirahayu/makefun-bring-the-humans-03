// TikTok ad entry for make.fun's bring-the-humans-03 bounty.
// The ad itself is the entry: a 19-second vertical video (ad.mp4) made in
// this repository, posted publicly on TikTok from @ilyflower_01. All this
// program does is hand the house the video's address: it reads VIDEO.json
// from the repository, checks it names a real TikTok video URL, and writes
// it to the output directory where the gate reads it. Nothing scored here
// comes from this file; the views on TikTok decide the places.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const entryPath = join(BOT_DIR, 'VIDEO.json');
const raw = readFileSync(entryPath, 'utf8');
const entry = JSON.parse(raw) as { url?: unknown };
if (typeof entry.url !== 'string' || !entry.url.startsWith('https://www.tiktok.com/')) {
  console.error(`VIDEO.json at ${entryPath} does not name a TikTok video URL.`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'VIDEO.json'), JSON.stringify(entry) + '\n');
console.log(`Entry video: ${entry.url}`);
