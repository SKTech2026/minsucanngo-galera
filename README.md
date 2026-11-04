# MinSUcanNGo Galera

Standalone HTML, CSS, and vanilla JavaScript tourism site.

## Run locally

From this folder, run `python -m http.server 8000` and open `http://localhost:8000`. The map, icons, and web fonts need an internet connection; site photos are local. Camera-based QR scanning requires HTTPS or localhost and browser permission; saved QR images can also be scanned.

## Frontend dependencies

Run `npm install` once, then `npm run build` to copy the pinned GSAP, ScrollTrigger, Swiper, html5-qrcode, and JSZip browser bundles into `vendor/` and bundle the QR generator. The generated vendor files are used by the static site, so deployment does not need Node.js or `node_modules`.

## Assets and contact

All 47 Pexels photos are in `assets/images/`; `assets/images/sources.txt` records the original URLs. The 107 images from the shared DESTINATIONS Drive folder are in `assets/images/drive-destinations/`, organized by category and attraction. The four supplied logos are in `assets/logos/`.

Open `qr-pubmats.html` to preview, filter, and download 1080 x 1350 destination QR posters individually or as a ZIP archive. Each QR opens its destination guide on the website.

The contact form validates fields and opens a drafted email to the address shown on the site. Sending happens in the visitor's email app. No inquiries are stored by this static project.

Run `python validate.py` for the desktop and mobile browser checks (requires Playwright for Python and its Chromium browser).
