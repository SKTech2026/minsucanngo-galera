const posterGrid = document.getElementById('poster-grid');
const posterSearch = document.getElementById('poster-search');
const posterCategory = document.getElementById('poster-category');
const posterCount = document.getElementById('poster-count');
const downloadAllButton = document.getElementById('download-all');
const downloadStatus = document.getElementById('download-status');
const posterWidth = 540;
const posterHeight = 675;
let renderVersion = 0;

function destinationQrUrl(destination) {
  const url = new URL('index.html', window.location.href);
  url.searchParams.set('destination', destination.id);
  url.hash = 'qr-guide';
  return url.href;
}

function loadPosterImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Could not load poster image: ' + source));
    image.src = source;
  });
}

function drawCover(context, image, x, y, width, height) {
  const imageRatio = image.width / image.height;
  const targetRatio = width / height;
  let cropX = 0;
  let cropY = 0;
  let cropWidth = image.width;
  let cropHeight = image.height;
  if (imageRatio > targetRatio) {
    cropWidth = image.height * targetRatio;
    cropX = (image.width - cropWidth) / 2;
  } else {
    cropHeight = image.width / targetRatio;
    cropY = (image.height - cropHeight) / 2;
  }
  context.drawImage(image, cropX, cropY, cropWidth, cropHeight, x, y, width, height);
}

function wrapPosterTitle(context, title, maxWidth) {
  let fontSize = 36;
  let lines = [];
  while (fontSize >= 26) {
    context.font = '800 ' + fontSize + 'px "Baloo 2", sans-serif';
    lines = [];
    let line = '';
    title.split(/\s+/).forEach(word => {
      const testLine = line ? line + ' ' + word : word;
      if (line && context.measureText(testLine).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    });
    if (line) lines.push(line);
    if (lines.length <= 2) break;
    fontSize -= 2;
  }
  return { lines, fontSize };
}

async function buildPoster(destination, pixelRatio = 1) {
  const [photo, logo] = await Promise.all([
    loadPosterImage(destination.img),
    loadPosterImage('assets/logos/minsucanngo-logo.png')
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = posterWidth * pixelRatio;
  canvas.height = posterHeight * pixelRatio;
  const context = canvas.getContext('2d');
  context.scale(pixelRatio, pixelRatio);

  context.fillStyle = '#fffdf7';
  context.fillRect(0, 0, posterWidth, posterHeight);
  context.fillStyle = '#023047';
  context.fillRect(0, 0, posterWidth, 58);
  context.drawImage(logo, 23, 12, 34, 34);
  context.fillStyle = '#ffffff';
  context.font = '800 15px "DM Sans", sans-serif';
  context.fillText('MINSUCANNGO GALERA', 68, 34);
  context.fillStyle = '#bdebea';
  context.font = '700 9px "DM Sans", sans-serif';
  context.textAlign = 'right';
  context.fillText('DESTINATION GUIDE', posterWidth - 24, 34);
  context.textAlign = 'left';

  drawCover(context, photo, 0, 58, posterWidth, 226);
  const overlay = context.createLinearGradient(0, 198, 0, 284);
  overlay.addColorStop(0, 'rgba(2,48,71,0)');
  overlay.addColorStop(1, 'rgba(2,48,71,.76)');
  context.fillStyle = overlay;
  context.fillRect(0, 198, posterWidth, 86);

  const category = catLabels[destination.cat] || destination.cat;
  context.font = '800 12px "DM Sans", sans-serif';
  const badgeWidth = Math.min(280, context.measureText(category.toUpperCase()).width + 26);
  context.fillStyle = '#ffd166';
  context.beginPath();
  context.roundRect(24, 236, badgeWidth, 28, 14);
  context.fill();
  context.fillStyle = '#023047';
  context.fillText(category.toUpperCase(), 37, 255);

  const title = wrapPosterTitle(context, destination.name, posterWidth - 52);
  context.fillStyle = '#023047';
  context.font = '800 ' + title.fontSize + 'px "Baloo 2", sans-serif';
  title.lines.forEach((line, index) => context.fillText(line, 24, 326 + index * 36));
  context.fillStyle = '#52716e';
  context.font = '600 14px "DM Sans", sans-serif';
  context.fillText((destination.area ? destination.area + ' - ' : '') + 'Puerto Galera, Oriental Mindoro', 25, 405);
  context.fillStyle = '#d7e5df';
  context.fillRect(24, 424, posterWidth - 48, 1);

  const qrCanvas = document.createElement('canvas');
  await QRCode.toCanvas(qrCanvas, destinationQrUrl(destination), {
    width: 164,
    margin: 4,
    errorCorrectionLevel: 'M',
    color: { dark: '#023047', light: '#ffffff' }
  });
  context.fillStyle = '#ffffff';
  context.fillRect(24, 441, 174, 174);
  context.drawImage(qrCanvas, 29, 446, 164, 164);
  context.fillStyle = '#006d77';
  context.font = '800 11px "DM Sans", sans-serif';
  context.fillText('SCAN FOR THE GUIDE', 218, 470);
  context.fillStyle = '#023047';
  context.font = '800 27px "Baloo 2", sans-serif';
  context.fillText(destination.id, 218, 510);
  context.fillStyle = '#52716e';
  context.font = '500 12px "DM Sans", sans-serif';
  context.fillText('Open the destination', 218, 540);
  context.fillText('guide on your phone.', 218, 558);
  context.fillText('Puerto Galera', 218, 591);

  context.fillStyle = '#d7e5df';
  context.fillRect(24, 635, posterWidth - 48, 1);
  context.fillStyle = '#006d77';
  context.font = '800 10px "DM Sans", sans-serif';
  context.fillText('ORIENTAL MINDORO  /  PHILIPPINES', 24, 655);
  context.textAlign = 'right';
  context.fillStyle = '#e76f51';
  context.fillText('EXPLORE GALERA', posterWidth - 24, 655);
  context.textAlign = 'left';
  return canvas;
}

function posterFileName(destination) {
  const slug = destination.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return slug + '-' + destination.id.toLowerCase() + '-qr-poster.png';
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Could not create poster image.')), 'image/png');
  });
}

async function downloadPoster(destination, button) {
  button.disabled = true;
  downloadStatus.textContent = 'Preparing ' + destination.name + '...';
  try {
    const canvas = await buildPoster(destination, 2);
    downloadBlob(await canvasToBlob(canvas), posterFileName(destination));
    downloadStatus.textContent = destination.name + ' poster downloaded.';
  } catch (error) {
    downloadStatus.textContent = 'Could not create that poster. Check the destination photo and try again.';
    console.error(error);
  } finally {
    button.disabled = false;
  }
}

function matchesPoster(destination, query, category) {
  const categoryMatches = category === 'all' || destination.cat === category;
  const haystack = [destination.id, destination.name, destination.area || '', catLabels[destination.cat] || destination.cat].join(' ').toLowerCase();
  return categoryMatches && (!query || haystack.includes(query));
}

async function renderPosters() {
  const version = ++renderVersion;
  const query = posterSearch.value.trim().toLowerCase();
  const category = posterCategory.value;
  const filtered = destinations.filter(destination => matchesPoster(destination, query, category));
  posterGrid.replaceChildren();
  posterGrid.setAttribute('aria-busy', 'true');
  posterCount.textContent = filtered.length + (filtered.length === 1 ? ' destination' : ' destinations');
  if (!filtered.length) {
    posterGrid.innerHTML = '<p class="poster-empty">No destinations match those filters.</p>';
    posterGrid.setAttribute('aria-busy', 'false');
    return;
  }

  for (const destination of filtered) {
    if (version !== renderVersion) return;
    const card = document.createElement('article');
    card.className = 'poster-card';
    const canvas = document.createElement('canvas');
    canvas.className = 'poster-preview';
    canvas.width = posterWidth;
    canvas.height = posterHeight;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', destination.name + ' destination QR poster');
    const footer = document.createElement('div');
    footer.className = 'poster-card-footer';
    const titleBlock = document.createElement('div');
    const title = document.createElement('p');
    title.className = 'poster-card-title';
    title.textContent = destination.name;
    const code = document.createElement('p');
    code.className = 'poster-card-code';
    code.textContent = destination.id;
    titleBlock.append(title, code);
    const downloadButton = document.createElement('button');
    downloadButton.className = 'poster-download';
    downloadButton.type = 'button';
    downloadButton.setAttribute('aria-label', 'Download ' + destination.name + ' poster as PNG');
    downloadButton.innerHTML = '<i data-lucide="download" aria-hidden="true"></i><span>PNG</span>';
    downloadButton.addEventListener('click', () => downloadPoster(destination, downloadButton));
    footer.append(titleBlock, downloadButton);
    card.append(canvas, footer);
    posterGrid.append(card);

    try {
      const poster = await buildPoster(destination);
      if (version !== renderVersion) return;
      canvas.getContext('2d').drawImage(poster, 0, 0);
    } catch (error) {
      canvas.setAttribute('aria-label', 'Poster preview unavailable for ' + destination.name);
      console.error(error);
    }
  }
  posterGrid.setAttribute('aria-busy', 'false');
  if (window.lucide) window.lucide.createIcons({ nodes: [...posterGrid.querySelectorAll('[data-lucide]')] });
}

async function downloadAllPosters() {
  downloadAllButton.disabled = true;
  posterSearch.disabled = true;
  posterCategory.disabled = true;
  const zip = new JSZip();
  try {
    for (let index = 0; index < destinations.length; index += 1) {
      const destination = destinations[index];
      downloadStatus.textContent = 'Preparing poster ' + (index + 1) + ' of ' + destinations.length + '...';
      const canvas = await buildPoster(destination, 2);
      const folder = zip.folder(destination.cat);
      folder.file(posterFileName(destination), await canvasToBlob(canvas));
    }
    downloadStatus.textContent = 'Building ZIP archive...';
    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 5 } }, progress => {
      downloadStatus.textContent = 'Building ZIP archive: ' + Math.round(progress.percent) + '%';
    });
    downloadBlob(blob, 'puerto-galera-destination-qr-posters.zip');
    downloadStatus.textContent = destinations.length + ' destination posters downloaded.';
  } catch (error) {
    downloadStatus.textContent = 'The poster archive could not be created. Please try again.';
    console.error(error);
  } finally {
    downloadAllButton.disabled = false;
    posterSearch.disabled = false;
    posterCategory.disabled = false;
  }
}

Object.entries(catLabels).forEach(([category, label]) => {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = label;
  posterCategory.append(option);
});
posterSearch.addEventListener('input', () => renderPosters());
posterCategory.addEventListener('change', renderPosters);
downloadAllButton.addEventListener('click', downloadAllPosters);
renderPosters();
