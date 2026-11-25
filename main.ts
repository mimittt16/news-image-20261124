// The World in One Day — Tuesday, 24 November 2026.
//
// The front page for this day lives in this repository as entry.png.
// This program checks the image against the competition limits and
// copies it to the output directory the grader reads.
//
// Run it locally with:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BYTE_LIMIT = 1048576;
const SIDE_LIMIT = 1024;
// The eight bytes every PNG file starts with.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(fileURLToPath(import.meta.url));
const imagePath = join(here, 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const targetPath = join(outputDir, 'entry.png');

if (!existsSync(imagePath)) {
  throw new Error('entry.png is missing from the repository');
}

const image = readFileSync(imagePath);

if (image.length < 8 || !image.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error('entry.png does not start with the PNG signature');
}
if (image.length > BYTE_LIMIT) {
  throw new Error(`entry.png is ${image.length} bytes, above the ${BYTE_LIMIT} byte limit`);
}
if (image.length < 24 || image.subarray(12, 16).toString('latin1') !== 'IHDR') {
  throw new Error('entry.png has no IHDR chunk in its header');
}
const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);
if (width === 0 || height === 0 || width > SIDE_LIMIT || height > SIDE_LIMIT) {
  throw new Error(`entry.png is ${width}x${height}, outside the ${SIDE_LIMIT}x${SIDE_LIMIT} limit`);
}

// Second check on the header: the IHDR chunk's CRC32 must match, so a
// corrupted header is refused. Third check: walk every chunk, verifying
// each chunk's CRC32, and confirm the file ends exactly at the IEND
// chunk, so a corrupt chunk anywhere is refused and nothing may trail
// the image. CRC32 is the IEEE 802.3 polynomial over the chunk type
// plus its data.
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
if (crc32(image.subarray(12, 29)) !== image.readUInt32BE(29)) {
  throw new Error('entry.png IHDR chunk CRC mismatch');
}
let offset = 8;
let sawIEND = false;
while (offset + 8 <= image.length) {
  const chunkLength = image.readUInt32BE(offset);
  const chunkType = image.subarray(offset + 4, offset + 8).toString('latin1');
  if (offset + 12 + chunkLength > image.length) {
    throw new Error(`entry.png chunk ${chunkType} is truncated`);
  }
  if (crc32(image.subarray(offset + 4, offset + 8 + chunkLength)) !== image.readUInt32BE(offset + 8 + chunkLength)) {
    throw new Error(`entry.png chunk ${chunkType} CRC mismatch`);
  }
  offset += 12 + chunkLength;
  if (chunkType === 'IEND') { sawIEND = true; break; }
}
if (!sawIEND || offset !== image.length) {
  throw new Error('entry.png does not end cleanly at the IEND chunk');
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(imagePath, targetPath);
const copied = statSync(targetPath).size;
if (copied !== image.length) {
  throw new Error(`copied entry.png is ${copied} bytes, expected ${image.length}`);
}
console.log(`wrote entry.png (${copied} bytes, ${width}x${height})`);
