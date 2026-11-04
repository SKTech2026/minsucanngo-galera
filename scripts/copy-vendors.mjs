import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const files = [
  ['node_modules/gsap/dist/gsap.min.js', 'vendor/gsap.min.js'],
  ['node_modules/gsap/dist/ScrollTrigger.min.js', 'vendor/ScrollTrigger.min.js'],
  ['node_modules/swiper/swiper-bundle.min.js', 'vendor/swiper-bundle.min.js'],
  ['node_modules/swiper/swiper-bundle.min.css', 'vendor/swiper-bundle.min.css'],
  ['node_modules/html5-qrcode/html5-qrcode.min.js', 'vendor/html5-qrcode.min.js'],
  ['node_modules/jszip/dist/jszip.min.js', 'vendor/jszip.min.js']
];

await mkdir(join(root, 'vendor'), { recursive: true });
for (const [source, destination] of files) {
  await copyFile(join(root, source), join(root, destination));
}

await build({
  entryPoints: [join(root, 'node_modules/qrcode/lib/browser.js')],
  bundle: true,
  platform: 'browser',
  format: 'iife',
  globalName: 'QRCode',
  minify: true,
  outfile: join(root, 'vendor/qrcode-generator.min.js')
});

console.log(`Copied ${files.length} local browser assets and built the QR generator in vendor/.`);