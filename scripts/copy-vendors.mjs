import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const files = [
  ['node_modules/gsap/dist/gsap.min.js', 'vendor/gsap.min.js'],
  ['node_modules/gsap/dist/ScrollTrigger.min.js', 'vendor/ScrollTrigger.min.js'],
  ['node_modules/swiper/swiper-bundle.min.js', 'vendor/swiper-bundle.min.js'],
  ['node_modules/swiper/swiper-bundle.min.css', 'vendor/swiper-bundle.min.css']
];

await mkdir(join(root, 'vendor'), { recursive: true });
for (const [source, destination] of files) {
  await copyFile(join(root, source), join(root, destination));
}

console.log(`Copied ${files.length} local browser assets to vendor/.`);