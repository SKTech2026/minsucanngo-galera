/* ===== Centralized Credits Data ===== */
// Photo credits â€” one entry per image used on the website
const photoCredits = [];
// Build from destinations
destinations.forEach((d, i) => {
 photoCredits.push({
  id: 'photo-' + d.id.toLowerCase(),
  type: 'photo',
  contentTitle: d.name,
  destination: d.name,
  photographer: 'Not stated by the original source.',
  publisher: 'Pexels',
  organization: 'Source information unavailable',
  originalImageUrl: d.img,
  license: 'Not stated by the original source.',
  usedOn: 'Explore â€” ' + (catLabels[d.cat] || d.cat),
  notes: 'Image resized and optimized for web display. Display crops may vary depending on screen size.',
  filterCat: 'photos',
  searchText: (d.name + ' ' + (d.area || '') + ' ' + (catLabels[d.cat] || '')).toLowerCase()
 });
});
// Gallery images
galleryItems.forEach((g, i) => {
 photoCredits.push({
  id: 'photo-gallery-' + String(i+1).padStart(3,'0'),
  type: 'photo',
  contentTitle: g.caption,
  destination: g.caption,
  photographer: 'Not stated by the original source.',
  publisher: 'Pexels',
  organization: 'Source information unavailable',
  originalImageUrl: g.src,
  license: 'Not stated by the original source.',
  usedOn: 'Gallery â€” ' + g.cat,
  notes: 'Image resized and optimized for web display. Display crops may vary depending on screen size.',
  filterCat: 'photos',
  searchText: (g.caption + ' ' + g.cat + ' gallery').toLowerCase()
 });
});
// Hero & About images
const siteImages = [
 {id:'photo-hero-001',contentTitle:'Hero Background â€” Beach',photographer:'Not stated by the original source.',publisher:'Pexels',originalImageUrl:'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1920',usedOn:'Hero Section',notes:'Image resized and optimized for web display. Display crops may vary depending on screen size.'},
 {id:'photo-about-001',contentTitle:'About Section â€” Aerial Coast',photographer:'Not stated by the original source.',publisher:'Pexels',originalImageUrl:'https://images.pexels.com/photos/29827505/pexels-photo-29827505.jpeg?auto=compress&cs=tinysrgb&w=1280',usedOn:'About Section',notes:'Image resized and optimized for web display. Display crops may vary depending on screen size.'}
];
siteImages.forEach(s => {
 photoCredits.push({...s, type:'photo', destination:'Puerto Galera', organization:'Source information unavailable', license:'Not stated by the original source.', filterCat:'photos', searchText:(s.contentTitle + ' puerto galera').toLowerCase()});
});

// Information & content sources
const infoSources = [
 {id:'info-epg-001',type:'info',contentTitle:'Tourism Destinations, Descriptions, and Travel Information',source:'Experience Puerto Galera',sourceTitle:'experiencepuertogalera.com',originalPageUrl:'https://experiencepuertogalera.com',publicationDate:'Source information unavailable',accessDate:'Source information unavailable',usedFor:'Destination descriptions, travel planning steps, ferry routes, terminal fees, PG Pass information, and tourism highlights across the website.',notes:'Primary tourism information source referenced throughout the website.',filterCat:'tourism',verified:'Tourism Office',searchText:'experience puerto galera tourism destinations travel ferry terminal pg pass'},
 {id:'info-map-001',type:'info',contentTitle:'Map Tiles and Geographic Data',source:'OpenStreetMap Contributors',sourceTitle:'OpenStreetMap',originalPageUrl:'https://www.openstreetmap.org/copyright',publicationDate:'Continuously updated',accessDate:'Source information unavailable',usedFor:'Interactive map display in Plan Your Trip section.',notes:'Map tiles served via OpenStreetMap. Attribution required by license.',filterCat:'maps',verified:'Community Source',searchText:'openstreetmap map tiles geographic plan trip'},
 {id:'info-unesco-001',type:'info',contentTitle:'UNESCO Man and Biosphere Program Recognition',source:'Source information unavailable',sourceTitle:'Source information unavailable',originalPageUrl:'',publicationDate:'1973 (Presidential Decree 354)',accessDate:'Source information unavailable',usedFor:'About section â€” significance and history of Puerto Galera.',notes:'Referenced via Experience Puerto Galera. Original UNESCO documentation not directly linked.',filterCat:'government',verified:'',searchText:'unesco man biosphere program puerto galera presidential decree 354 history'},
 {id:'info-dive-001',type:'info',contentTitle:'Philippines No. 1 Dive Destination 2025â€“2027',source:'Source information unavailable',sourceTitle:'Source information unavailable',originalPageUrl:'',publicationDate:'Source information unavailable',accessDate:'Source information unavailable',usedFor:'Hero badge and About section.',notes:'Claim referenced via Experience Puerto Galera. Original award documentation not directly available on the website.',filterCat:'tourism',verified:'',searchText:'dive destination 2025 2027 award philippines puerto galera'},
 {id:'info-verde-001',type:'info',contentTitle:'Verde Island Passage â€” Center of Marine Shorefish Biodiversity',source:'Source information unavailable',sourceTitle:'Source information unavailable',originalPageUrl:'',publicationDate:'Source information unavailable',accessDate:'Source information unavailable',usedFor:'Dive site descriptions and About section.',notes:'Scientific designation referenced via Experience Puerto Galera. Original research publication not directly linked.',filterCat:'other',verified:'',searchText:'verde island passage center marine shorefish biodiversity dive'},
 {id:'info-mangyan-001',type:'info',contentTitle:'Iraya Mangyan Community and Cultural Heritage',source:'Experience Puerto Galera',sourceTitle:'experiencepuertogalera.com',originalPageUrl:'https://experiencepuertogalera.com',publicationDate:'Source information unavailable',accessDate:'Source information unavailable',usedFor:'About section and Culture & History destination cards (Ambang, Baclayan).',notes:'Cultural descriptions sourced from Experience Puerto Galera.',filterCat:'tourism',verified:'Tourism Office',searchText:'iraya mangyan community culture heritage ambang baclayan'},
 {id:'info-history-001',type:'info',contentTitle:'Puerto Galera Municipal History (Est. 1927, Act 3415)',source:'Experience Puerto Galera',sourceTitle:'experiencepuertogalera.com',originalPageUrl:'https://experiencepuertogalera.com',publicationDate:'Source information unavailable',accessDate:'Source information unavailable',usedFor:'About section â€” History & Identity.',notes:'Historical dates and legislative reference from Experience Puerto Galera.',filterCat:'government',verified:'',searchText:'puerto galera history 1927 act 3415 municipality founded capital mindoro'}
];

// Build lookup: destination ID -> credit IDs
const destCreditMap = {};
destinations.forEach(d => {
 const pid = 'photo-' + d.id.toLowerCase();
 destCreditMap[d.id] = [pid];
});
// Link info sources to destinations by keyword
function getInfoForDest(d) {
 const results = [];
 const name = d.name.toLowerCase();
 if (name.includes('mangyan') || name.includes('ambang') || name.includes('baclayan')) results.push('info-mangyan-001');
 if (d.cat === 'dive' || name.includes('verde') || name.includes('coral') || name.includes('clam') || name.includes('canyon') || name.includes('channel') || name.includes('wreck')) {
  results.push('info-dive-001', 'info-verde-001');
 }
 results.push('info-epg-001');
 return [...new Set(results)];
}

const allCreditsById = {};
photoCredits.forEach(c => allCreditsById[c.id] = c);
infoSources.forEach(c => allCreditsById[c.id] = c);

/* ===== Utility ===== */
const $=id=>document.getElementById(id);
let currentFilter='all',galleryFilter='all',filteredGallery=[],lightboxIdx=0,modalTrigger=null,lightboxTrigger=null,selected=null,visitorPosition=null,map=null,visitorMarker=null;
const broadLocation='Puerto Galera, Oriental Mindoro';
function locationOf(d){return d.area?d.area+', Puerto Galera, Oriental Mindoro':broadLocation}
function searchURL(d){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent((d?d.name+' ':'Puerto Galera ')+(d?'Puerto Galera Oriental Mindoro':'Oriental Mindoro'))}
function directionsURL(d){const params=new URLSearchParams({api:'1',destination:(d?d.name+' ':'Puerto Galera ')+'Puerto Galera Oriental Mindoro'});if(visitorPosition)params.set('origin',visitorPosition.lat+','+visitorPosition.lng);return 'https://www.google.com/maps/dir/?'+params.toString()}
let mapTransitionTimer=0;
let mapTransitionTimeline=null;
function updateSelectedMapContent(d){$('selected-map-name').textContent=d.name;$('selected-map-location').textContent='Location: '+locationOf(d);$('selected-map-link').href=searchURL(d);$('selected-map-link').setAttribute('aria-label','Search Google Maps for '+d.name+' in a new tab; exact pin not verified')}
function selectDestination(d){selected=d;const panel=$('map-panel');window.clearTimeout(mapTransitionTimer);if(gsapMotionEnabled){mapTransitionTimeline?.kill();mapTransitionTimeline=window.gsap.timeline().to(panel,{autoAlpha:0,y:7,duration:.12,ease:'power1.out'}).add(()=>updateSelectedMapContent(d)).to(panel,{autoAlpha:1,y:0,duration:.15,ease:'power2.out'});updateDirections();return}panel.classList.add('changing');mapTransitionTimer=window.setTimeout(()=>{updateSelectedMapContent(d);window.requestAnimationFrame(()=>window.setTimeout(()=>panel.classList.remove('changing'),130))},120);updateDirections()}
function updateDirections(){const link=$('directions-link');link.classList.toggle('hidden',!visitorPosition);if(visitorPosition){link.href=directionsURL(selected);link.setAttribute('aria-label','Open Google Maps directions from my current position to '+(selected?selected.name:'Puerto Galera')+' in a new tab; destination is a search, not a verified exact pin')}}
function setTabs(group,key,value){document.querySelectorAll('#'+group+' [data-'+key+']').forEach(b=>{const active=b.dataset[key]===value||b.getAttribute('data-'+key.replace(/([A-Z])/g,'-$1').toLowerCase())===value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))})}

/* ===== Destinations ===== */
function renderDestinations(){
const query=$('dest-search').value.trim().toLowerCase(),shown=destinations.filter(d=>(currentFilter==='all'||d.cat===currentFilter)&&(!query||d.name.toLowerCase().includes(query)||d.desc.toLowerCase().includes(query)));
const grid=$('dest-grid');grid.replaceChildren();$('no-results').classList.toggle('hidden',shown.length>0);$('dest-count').textContent=shown.length+' '+(shown.length===1?'destination':'destinations');$('dest-reset').disabled=currentFilter==='all'&&!query;
shown.forEach(d=>{
const card=document.createElement('article');card.className='destination-card tropical-card';card.dataset.category=d.cat;
const visual=document.createElement('div');visual.className='destination-visual';
const image=document.createElement('img');image.src=d.img;image.alt=d.alt;image.loading='lazy';
const tag=document.createElement('span');tag.className='destination-badge';tag.textContent=catLabels[d.cat];visual.append(image,tag);
const info=document.createElement('div');info.className='destination-body';
const title=document.createElement('h3');title.textContent=d.name;
const loc=document.createElement('p');loc.className='destination-location';loc.textContent=locationOf(d);
const desc=document.createElement('p');desc.className='destination-description';desc.textContent=d.desc;
const highlights=document.createElement('div');highlights.className='destination-highlights';(d.highlights||'').split(',').slice(0,2).forEach(item=>{if(!item.trim())return;const chip=document.createElement('span');chip.textContent=item.trim();highlights.append(chip)});
const actions=document.createElement('div');actions.className='destination-actions';
const guide=document.createElement('button');guide.type='button';guide.className='btn-primary px-4 py-2 text-sm';guide.textContent='View Guide';guide.setAttribute('aria-label','View guide for '+d.name);guide.dataset.destinationId=d.id;
const maps=document.createElement('a');maps.href=searchURL(d);maps.target='_blank';maps.rel='noopener noreferrer';maps.className='map-link map-action-btn px-4 py-2 text-sm';maps.textContent='Maps ↗';maps.setAttribute('aria-label','Search Google Maps for '+d.name+' in a new tab; exact pin not verified');maps.addEventListener('click',()=>selectDestination(d));
const srcBtn=document.createElement('button');srcBtn.type='button';srcBtn.className='destination-source';srcBtn.textContent='Photo & sources';srcBtn.dataset.sourceId=d.id;
actions.append(guide,maps);info.append(title,loc,desc,highlights,actions,srcBtn);card.append(visual,info);grid.append(card)
})}

const moodOptions=[
 ['Beach Escape','beach','A little time beside the water','sun'],['Dive Adventure','dive','See what lies beneath the surface','waves'],
 ['Nature Explorer','nature','Waterfalls, trails, and green places','trees'],['Outdoor Adventure','leisure','Find an active island escape','compass'],
 ['Culture & Heritage','culture','Explore heritage and community places','landmark'],['Scenic Getaway','beach','Coastal views and quieter coves','sunset'],
 ['Family Discovery','nature','Choose a nature stop to explore together','map'],['Relax & Unwind','leisure','Slow down by the sea','anchor']
];
const tripPlans=[
 {name:'Puerto Galera Highlights',stops:['MUEL01','CORAL01','TUKU01']},
 {name:'Beach Weekend',stops:['CELY01','BULA01','ENCE01']},
 {name:'Dive Escape',stops:['CORAL01','CLAM01','SABW01']},
 {name:'Nature Discovery',stops:['TUKU01','TALI01','ANIN01']},
 {name:'Culture & Heritage',stops:['MUEL01','ESCA01','AMBA01']}
];
const tourismAnnouncements=[];
let tripModalTrigger=null;
let destinationSwiper=null;
function applyDestinationFilter(category,scroll=true){currentFilter=category;$('dest-search').value='';setTabs('filter-tabs','cat',category);renderDestinations();if(scroll)$('explore').scrollIntoView({behavior:'smooth',block:'start'})}
function renderNoticeBoard(){const section=$('notice-board'),list=$('notice-list');list.replaceChildren();if(!tourismAnnouncements.length){section.classList.add('hidden');return}tourismAnnouncements.forEach(item=>{const card=document.createElement('article');card.className='notice-card';const image=document.createElement('img');image.src=item.image;image.alt=item.alt||'';image.loading='lazy';const body=document.createElement('div');const date=document.createElement('time');date.dateTime=item.date;date.textContent=item.dateLabel||item.date;const title=document.createElement('h3');title.textContent=item.title;const summary=document.createElement('p');summary.textContent=item.summary;const link=document.createElement('a');link.href=item.url;link.textContent='Read more';link.target='_blank';link.rel='noopener noreferrer';body.append(date,title,summary,link);card.append(image,body);list.append(card)});section.classList.remove('hidden')}
function renderFeatured(){
 const grid=$('featured-grid');grid.replaceChildren();
 moodOptions.forEach(([label,category,description,icon])=>{const destination=destinations.find(item=>item.cat===category);if(!destination)return;const card=document.createElement('button');card.type='button';card.className='mood-card';card.dataset.moodCat=category;card.setAttribute('aria-label','Explore '+label+' destinations');const image=document.createElement('img');image.src=destination.img;image.alt='';image.loading='lazy';const copy=document.createElement('span');copy.className='mood-copy';const glyph=document.createElement('i');glyph.className='mood-icon';glyph.dataset.lucide=icon;glyph.setAttribute('aria-hidden','true');const title=document.createElement('strong');title.textContent=label;const text=document.createElement('span');text.textContent=description;copy.append(glyph,title,text);card.append(image,copy);grid.append(card)});
}
function renderDestinationCarousel(){
 const featuredIds=['CORAL01','CELY01','TUKU01','MUEL01','ESCA01','BULA01','MANG01','ENCE01'];const rail=$('destination-carousel');rail.replaceChildren();const useSwiper=Boolean(window.Swiper),wrapper=useSwiper?document.createElement('div'):null;if(wrapper)wrapper.className='swiper-wrapper';
 featuredIds.forEach(id=>{const destination=destinations.find(item=>item.id===id);if(!destination)return;const card=document.createElement('article');card.className='carousel-card'+(useSwiper?' swiper-slide':'');const image=document.createElement('img');image.src=destination.img;image.alt=destination.alt;image.loading='lazy';const copy=document.createElement('div');copy.className='carousel-card-copy';const category=document.createElement('p');category.className='section-eyebrow';category.textContent=catLabels[destination.cat];const title=document.createElement('h3');title.textContent=destination.name;const location=document.createElement('p');location.className='destination-location';location.textContent=locationOf(destination);const teaser=document.createElement('p');teaser.textContent=destination.desc;const actions=document.createElement('div');actions.className='carousel-card-actions';const guide=document.createElement('button');guide.type='button';guide.className='btn-primary px-4 py-2';guide.textContent='View Guide';guide.addEventListener('click',()=>openModal(destination.id,guide));const maps=document.createElement('a');maps.href=searchURL(destination);maps.target='_blank';maps.rel='noopener noreferrer';maps.className='map-action-btn px-4 py-2';maps.textContent='Maps';maps.addEventListener('click',()=>selectDestination(destination));actions.append(guide,maps);copy.append(category,title,location,teaser,actions);card.append(image,copy);(wrapper||rail).append(card)});if(wrapper)rail.append(wrapper);
}
function initDestinationSwiper(){if(!window.Swiper)return null;const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches,isMobile=window.matchMedia('(max-width: 767px)').matches;const swiper=new window.Swiper('#destination-carousel',{slidesPerView:'auto',spaceBetween:16,speed:reducedMotion?0:isMobile?360:520,watchSlidesProgress:true,grabCursor:true,keyboard:{enabled:true,onlyInViewport:true},navigation:{nextEl:'#carousel-next',prevEl:'#carousel-prev'},a11y:{enabled:true,prevSlideMessage:'Previous featured destination',nextSlideMessage:'Next featured destination',firstSlideMessage:'This is the first destination',lastSlideMessage:'This is the last destination'}});swiper.on('resize',queueScrollTriggerRefresh);queueScrollTriggerRefresh();return swiper}
function showOverlay(overlay,content){overlay.classList.remove('hidden');if(gsapMotionEnabled&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){window.gsap.fromTo(overlay,{autoAlpha:0},{autoAlpha:1,duration:.18,ease:'power1.out',overwrite:true});if(content)window.gsap.fromTo(content,{autoAlpha:0,scale:.97,y:14},{autoAlpha:1,scale:1,y:0,duration:.26,delay:.04,ease:'power2.out',overwrite:true})}}
function syncModalScrollLock(){document.body.style.overflow=document.querySelector('.overlay:not(.hidden)')?'hidden':''}
function hideOverlay(overlay,content,onComplete){const finish=()=>{overlay.classList.add('hidden');if(onComplete)onComplete()};if(gsapMotionEnabled&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){window.gsap.killTweensOf([overlay,content].filter(Boolean));window.gsap.to(overlay,{autoAlpha:0,duration:.16,ease:'power1.in',onComplete:finish});if(content)window.gsap.to(content,{autoAlpha:0,scale:.98,y:8,duration:.15,ease:'power1.in'})}else finish()}
function openTripModal(index,trigger){const plan=tripPlans[index];if(!plan)return;tripModalTrigger=trigger||document.activeElement;$('trip-modal-title').textContent=plan.name;const stops=$('trip-modal-stops');stops.replaceChildren();plan.stops.forEach((id,indexInPlan)=>{const destination=destinations.find(item=>item.id===id);if(!destination)return;const item=document.createElement('li');const name=document.createElement('strong');name.textContent=destination.name;const place=document.createElement('span');place.textContent=locationOf(destination)+' · '+catLabels[destination.cat];const guide=document.createElement('button');guide.type='button';guide.className='trip-stop-guide';guide.textContent='View guide';guide.addEventListener('click',()=>{closeTripModal(()=>openModal(destination.id,tripModalTrigger))});item.append(name,place,guide);stops.append(item)});showOverlay($('trip-modal'),$('trip-modal').firstElementChild);document.body.style.overflow='hidden';$('trip-modal-close').focus()}
function closeTripModal(onComplete){const modal=$('trip-modal');if(modal.classList.contains('hidden'))return;hideOverlay(modal,modal.firstElementChild,()=>{syncModalScrollLock();if(tripModalTrigger?.isConnected)tripModalTrigger.focus();if(onComplete)onComplete()})}
function renderTrips(){const grid=$('trip-grid');grid.replaceChildren();tripPlans.forEach((plan,index)=>{const destination=destinations.find(item=>item.id===plan.stops[0]);const card=document.createElement('article');card.className='trip-card';const image=document.createElement('img');image.src=destination.img;image.alt=destination.alt;image.loading='lazy';const body=document.createElement('div');const count=document.createElement('p');count.className='section-eyebrow';count.textContent='SUGGESTED PLACES · '+plan.stops.length;const title=document.createElement('h3');title.textContent=plan.name;const button=document.createElement('button');button.type='button';button.className='trip-open';button.textContent='View suggested trip';button.addEventListener('click',()=>openTripModal(index,button));body.append(count,title,button);card.append(image,body);grid.append(card)})}

function openModal(id,trigger){const d=destinations.find(item=>item.id===id);if(!d)return;selectDestination(d);modalTrigger=trigger||document.activeElement;$('modal-img').src=d.img;$('modal-img').alt=d.alt;$('modal-cat').textContent=catLabels[d.cat];$('modal-name').textContent=d.name;$('modal-desc').textContent=d.desc;$('modal-highlights').textContent=d.highlights?'Highlights: '+d.highlights:'';$('modal-location').textContent='Location: '+locationOf(d);$('modal-tips').textContent='Visitor tips: Check current conditions with the Tourism Office, bring water and sun protection, respect local communities and protected areas, and follow site-specific safety guidance.';$('modal-map-link').href=searchURL(d);$('modal-map-link').setAttribute('aria-label','Search Google Maps for '+d.name+' in a new tab; exact pin not verified');showOverlay($('dest-modal'),$('dest-modal').firstElementChild);document.body.style.overflow='hidden';$('modal-x').focus();
// Store current dest for sources button
 $('modal-sources-btn').onclick=()=>closeModal(()=>openSourcesModal(d));
}
function closeModal(onComplete){const modal=$('dest-modal');if(modal.classList.contains('hidden'))return;hideOverlay(modal,modal.firstElementChild,()=>{syncModalScrollLock();if(modalTrigger&&modalTrigger.isConnected)modalTrigger.focus();if(onComplete)onComplete()})}

/* ===== Sources Detail Modal ===== */
let sourcesModalTrigger=null;
function openSourcesModal(d){
 sourcesModalTrigger=document.activeElement;
 const body=$('sources-modal-body');
 body.replaceChildren();
 // Photo credit
 const photoId='photo-'+d.id.toLowerCase();
 const pc=allCreditsById[photoId];
 if(pc){
  const div=document.createElement('div');div.className='border-b border-gray-100 pb-3';
  div.innerHTML='<p class="font-bold mb-1" style="color:var(--ocean)">Photo Credit</p>'+
   '<p><span class="credit-label">Photographer:</span> '+esc(pc.photographer)+'</p>'+
   '<p><span class="credit-label">Published by:</span> '+esc(pc.publisher)+'</p>'+
   '<p><span class="credit-label">License:</span> '+esc(pc.license)+'</p>'+
   (pc.originalImageUrl?'<p><a href="'+esc(pc.originalImageUrl)+'" target="_blank" rel="noopener noreferrer" class="source-link">View Source Image â†—</a></p>':'');
  body.append(div);
 }
 // Info sources
 const infoIds=getInfoForDest(d);
 if(infoIds.length){
  const h=document.createElement('p');h.className='font-bold mt-2';h.style.color='var(--ocean)';h.textContent='Information Sources';body.append(h);
  infoIds.forEach(iid=>{
   const info=allCreditsById[iid];if(!info)return;
   const div=document.createElement('div');div.className='pl-3 border-l-2 mb-2';div.style.borderColor='var(--sky)';
   div.innerHTML='<p class="font-semibold">'+esc(info.contentTitle)+'</p>'+
    '<p><span class="credit-label">Source:</span> '+esc(info.source)+'</p>'+
    (info.originalPageUrl?'<p><a href="'+esc(info.originalPageUrl)+'" target="_blank" rel="noopener noreferrer" class="source-link">View Original Source â†—</a></p>':'')+
    (info.verified?'<span class="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold" style="background:var(--seafoam);color:var(--ocean)">'+esc(info.verified)+'</span>':'');
   body.append(div);
  });
 }
 if(!pc&&!infoIds.length){body.innerHTML='<p class="prose-muted">Source information unavailable.</p>'}
 showOverlay($('sources-modal'),$('sources-modal').firstElementChild);document.body.style.overflow='hidden';$('sources-modal-close').focus();
}
function closeSourcesModal(){const modal=$('sources-modal');if(modal.classList.contains('hidden'))return;hideOverlay(modal,modal.firstElementChild,()=>{syncModalScrollLock();if(sourcesModalTrigger?.isConnected)sourcesModalTrigger.focus()})}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}

/* ===== Credits Section Rendering ===== */
let creditsTab='photos',creditsFilter='all',creditsQuery='',creditsExpanded=false;
function renderCreditsSection(){
 const photoList=$('credits-photo-list');
 const infoList=$('credits-info-list');
 photoList.classList.toggle('hidden',creditsTab!=='photos');
 infoList.classList.toggle('hidden',creditsTab!=='info');
 $('tab-photos').classList.toggle('active',creditsTab==='photos');$('tab-photos').setAttribute('aria-pressed',String(creditsTab==='photos'));
 $('tab-info').classList.toggle('active',creditsTab==='info');$('tab-info').setAttribute('aria-pressed',String(creditsTab==='info'));

 if(creditsTab==='photos'){
  const filtered=photoCredits.filter(c=>{
   if(creditsFilter!=='all'&&creditsFilter!=='photos') return false;
   if(creditsQuery&&!c.searchText.includes(creditsQuery)) return false;
   return true;
  });
  photoList.replaceChildren();
  $('credits-no-results').classList.toggle('hidden',filtered.length>0);
  const canToggle=!creditsQuery&&(creditsFilter==='all'||creditsFilter==='photos')&&filtered.length>8;
  const compact=canToggle&&!creditsExpanded;
  $('credits-show-more').classList.toggle('hidden',!canToggle);
  $('credits-show-more').textContent=creditsExpanded?'Show fewer photo credits':'Show all '+filtered.length+' photo credits';
  (compact?filtered.slice(0,8):filtered).forEach((c,i)=>{
   const card=document.createElement('div');card.className='credit-card flex gap-4 items-start';
   const num=document.createElement('span');num.className='credit-number';num.textContent=String(i+1).padStart(2,'0');
   const body=document.createElement('div');body.className='flex-1 min-w-0 space-y-1';
   body.innerHTML='<p class="font-bold" style="color:var(--navy)">'+esc(c.contentTitle)+'</p>'+
    '<p><span class="credit-label">Photographer:</span> <span class="credit-value">'+esc(c.photographer)+'</span></p>'+
    '<p><span class="credit-label">Published by:</span> <span class="credit-value">'+esc(c.publisher)+'</span></p>'+
    (c.originalImageUrl?'<p><span class="credit-label">Source Image:</span> <a href="'+esc(c.originalImageUrl)+'" target="_blank" rel="noopener noreferrer" class="source-link text-sm">View on Pexels â†—</a></p>':'')+
    '<p><span class="credit-label">License / Usage:</span> <span class="credit-value">'+esc(c.license)+'</span></p>'+
    '<p><span class="credit-label">Website Usage:</span> <span class="credit-value">'+esc(c.usedOn)+'</span></p>'+
    (c.notes?'<p class="text-xs prose-muted italic">'+esc(c.notes)+'</p>':'');
   card.append(num,body);photoList.append(card);
  });
 } else {
  $('credits-show-more').classList.add('hidden');
  const filtered=infoSources.filter(c=>{
   if(creditsFilter!=='all'){
    if(creditsFilter==='destination'&&c.filterCat!=='tourism'&&c.filterCat!=='other') return false;
    else if(creditsFilter==='government'&&c.filterCat!=='government') return false;
    else if(creditsFilter==='tourism'&&c.filterCat!=='tourism') return false;
    else if(creditsFilter==='maps'&&c.filterCat!=='maps') return false;
    else if(creditsFilter==='other'&&c.filterCat!=='other') return false;
    else if(creditsFilter==='photos') return false;
   }
   if(creditsQuery&&!c.searchText.includes(creditsQuery)) return false;
   return true;
  });
  infoList.replaceChildren();
  $('credits-no-results').classList.toggle('hidden',filtered.length>0);
  filtered.forEach((c,i)=>{
   const card=document.createElement('div');card.className='credit-card flex gap-4 items-start';
   const num=document.createElement('span');num.className='credit-number';num.textContent=String(i+1).padStart(2,'0');
   const body=document.createElement('div');body.className='flex-1 min-w-0 space-y-1';
   body.innerHTML='<p class="font-bold" style="color:var(--navy)">'+esc(c.contentTitle)+'</p>'+
    '<p><span class="credit-label">Information Source:</span> <span class="credit-value">'+esc(c.source)+'</span></p>'+
    (c.sourceTitle?'<p><span class="credit-label">Article / Page:</span> <span class="credit-value">'+esc(c.sourceTitle)+'</span></p>':'')+
    (c.originalPageUrl?'<p><span class="credit-label">Original Source:</span> <a href="'+esc(c.originalPageUrl)+'" target="_blank" rel="noopener noreferrer" class="source-link text-sm">'+esc(c.originalPageUrl)+' â†—</a></p>':'<p><span class="credit-label">Original Source:</span> <span class="credit-value">Source information unavailable</span></p>')+
    '<p><span class="credit-label">Publication Date:</span> <span class="credit-value">'+esc(c.publicationDate)+'</span></p>'+
    '<p><span class="credit-label">Accessed:</span> <span class="credit-value">'+(c.accessDate||'Source information unavailable')+'</span></p>'+
    '<p><span class="credit-label">Used For:</span> <span class="credit-value">'+esc(c.usedFor)+'</span></p>'+
    (c.notes?'<p class="text-xs prose-muted italic">'+esc(c.notes)+'</p>':'')+
    (c.verified?'<span class="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold" style="background:var(--seafoam);color:var(--ocean)">'+esc(c.verified)+'</span>':'');
   card.append(num,body);infoList.append(card);
  });
 }
}

/* ===== Gallery ===== */
function renderGallery(){
  const allMatches = galleryFilter === 'all' ? galleryItems : galleryItems.filter(g => g.cat === galleryFilter);
  filteredGallery = allMatches.slice(0, 8);
  const grid = $('gallery-grid');
  grid.classList.add('is-refreshing');
  grid.replaceChildren();
  filteredGallery.forEach((g, i) => {
    const item = document.createElement('article');
    item.className = 'gallery-tile';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gallery-image-button';
    btn.setAttribute('aria-label', 'View ' + g.caption);
    const img = document.createElement('img');
    img.src = g.src;
    img.alt = g.alt;
    img.loading = 'lazy';
    const caption = document.createElement('span');
    caption.className = 'gallery-caption';
    caption.textContent = g.caption;
    btn.append(img, caption);
    btn.addEventListener('click', () => {
      lightboxTrigger = btn;
      lightboxIdx = i;
      showLightbox();
    });
    item.append(btn);
    grid.append(item);
  });
  window.requestAnimationFrame(() => {
    grid.classList.remove('is-refreshing');
    if (gsapMotionEnabled && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.gsap.fromTo(grid.children, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .32, stagger: .035, ease: 'power2.out', overwrite: true });
    }
  });
}
function showLightbox(){const g=filteredGallery[lightboxIdx];if(!g)return;const lightbox=$('lightbox'),wasOpen=!lightbox.classList.contains('hidden');$('lightbox-img').src=g.src;$('lightbox-img').alt=g.alt;$('lightbox-caption').textContent=g.caption+' · '+g.cat.charAt(0).toUpperCase()+g.cat.slice(1);lightbox.classList.remove('hidden');syncModalScrollLock();if(gsapMotionEnabled&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const gsap=window.gsap;if(!wasOpen)gsap.fromTo(lightbox,{autoAlpha:0},{autoAlpha:1,duration:.22,ease:'power1.out',overwrite:true});gsap.fromTo('#lightbox-img',{autoAlpha:0,scale:.96},{autoAlpha:1,scale:1,duration:.32,ease:'power2.out',overwrite:true});gsap.fromTo('#lightbox-caption',{autoAlpha:0,y:8},{autoAlpha:1,y:0,duration:.28,delay:.04,ease:'power2.out',overwrite:true})}else window.requestAnimationFrame(()=>lightbox.classList.add('is-open'));$('lightbox-close').focus()}
let lightboxCloseTimer=0;
function closeLightbox(){const lightbox=$('lightbox');if(lightbox.classList.contains('hidden'))return;window.clearTimeout(lightboxCloseTimer);const finish=()=>{lightbox.classList.add('hidden');lightbox.classList.remove('is-open');syncModalScrollLock();if(lightboxTrigger?.isConnected)lightboxTrigger.focus()};if(gsapMotionEnabled&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){window.gsap.killTweensOf([lightbox,$('lightbox-img'),$('lightbox-caption')]);window.gsap.timeline({onComplete:finish}).to(['#lightbox-img','#lightbox-caption'],{autoAlpha:0,scale:.97,y:6,duration:.16,stagger:.02,ease:'power1.in'}).to(lightbox,{autoAlpha:0,duration:.18,ease:'power1.in'},0);return}lightbox.classList.remove('is-open');const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:220;lightboxCloseTimer=window.setTimeout(finish,duration)}
function moveLightbox(step){lightboxIdx=(lightboxIdx+step+filteredGallery.length)%filteredGallery.length;showLightbox()}

/* ===== QR ===== */
function lookupQR(){const code=$('qr-input').value.trim().toUpperCase(),d=destinations.find(item=>item.id===code);$('qr-error').classList.toggle('hidden',!!d);if(!d){$('qr-result').classList.add('hidden');return}selectDestination(d);$('qr-result-img').src=d.img;$('qr-result-img').alt=d.alt;$('qr-result-cat').textContent=catLabels[d.cat];$('qr-result-name').textContent=d.name;$('qr-result-desc').textContent=d.desc;$('qr-result-highlights').textContent=d.highlights?'Highlights: '+d.highlights:'';$('qr-result-location').textContent='Location: '+locationOf(d);$('qr-map-link').href=searchURL(d);$('qr-map-link').setAttribute('aria-label','Search Google Maps for '+d.name+' in a new tab; exact pin not verified');const result=$('qr-result');result.classList.remove('hidden');if(gsapMotionEnabled&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)window.gsap.fromTo(result,{autoAlpha:0,y:12,scale:.99},{autoAlpha:1,y:0,scale:1,duration:.34,ease:'power2.out',overwrite:true});result.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'})}

function closeMenu(){$('mobile-menu').classList.remove('open');$('menu-open').setAttribute('aria-expanded','false')}

let gsapMotionEnabled=false,scrollTriggerRefreshFrame=0;
function queueScrollTriggerRefresh(){if(!window.ScrollTrigger||scrollTriggerRefreshFrame)return;scrollTriggerRefreshFrame=window.requestAnimationFrame(()=>{scrollTriggerRefreshFrame=0;try{window.ScrollTrigger.refresh()}catch(error){console.warn('ScrollTrigger refresh failed; leaving content visible by default.',error)}})}
function revealReducedMotionContent(){document.querySelectorAll('.reveal,.image-reveal,.stagger-group,.fade-in').forEach(element=>element.classList.add('is-visible'));document.querySelectorAll('[data-journey-step]').forEach(element=>element.classList.add('is-active'));$('home').classList.add('hero-ready');document.querySelector('.journey-route')?.style.setProperty('--route-progress','1')}
function setupGsapMotion(isMobile){
 const {gsap,ScrollTrigger}=window;gsapMotionEnabled=true;document.body.classList.add('gsap-motion');
 const hero=$('home'),heroSteps=[...document.querySelectorAll('[data-hero-step]')],stories=[...document.querySelectorAll('.editorial-story')];
 hero.classList.add('hero-sequence');let heroTimeline=null;
 if(!hero.dataset.gsapIntroPlayed){hero.dataset.gsapIntroPlayed='true';gsap.set(heroSteps,{autoAlpha:0,y:isMobile?12:22});heroTimeline=gsap.timeline({defaults:{ease:'power3.out'},onComplete:()=>hero.classList.add('hero-ready')});heroTimeline.fromTo('[data-hero-step="logos"]',{autoAlpha:0,scale:.94,y:12},{autoAlpha:1,scale:1,y:0,duration:.7},0);heroSteps.slice(1).forEach((element,index)=>heroTimeline.fromTo(element,{autoAlpha:0,y:isMobile?12:22},{autoAlpha:1,y:0,duration:.68},.1+(index*.1)))}else{gsap.set(heroSteps,{clearProps:'transform,opacity,visibility'});hero.classList.add('hero-ready')}
 gsap.to('.hero-section>img',{scale:isMobile?1.025:1.04,duration:isMobile?13:17,ease:'none'});
 if(!isMobile)gsap.to('.hero-section>img',{yPercent:3,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.6}});
 const headingNodes=gsap.utils.toArray('.editorial-heading,.editorial-story h3,#carousel-title,#recognition-title,#map-title,#trips-title,#qr-guide h2');
 headingNodes.forEach(heading=>{if(heading.querySelector('.gsap-heading-mask'))return;const line=document.createElement('span'),mask=document.createElement('span');line.className='gsap-heading-line';line.textContent=heading.textContent;mask.className='gsap-heading-mask';mask.append(line);heading.replaceChildren(mask);gsap.fromTo(line,{yPercent:105,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.88,ease:'power3.out',scrollTrigger:{trigger:heading,start:'top 88%',once:true}})});
 stories.forEach((story,index)=>{const image=story.querySelector('.image-reveal'),photo=image.querySelector('img'),copy=story.querySelector(':scope > div:last-child'),copyItems=[...copy.children],direction=index%2?-34:34;const timeline=gsap.timeline({scrollTrigger:{trigger:story,start:'top 78%',once:true}});timeline.fromTo(image,{autoAlpha:.82,x:isMobile?0:direction},{autoAlpha:1,x:0,duration:.95,ease:'power3.out',onStart:()=>image.classList.add('is-visible')},0).fromTo(photo,{scale:1.07,clipPath:'inset(0 0 0 0)'},{scale:1,clipPath:'inset(0 0% 0 0)',duration:1.15,ease:'power3.out'},0).fromTo(copyItems,{autoAlpha:0,x:isMobile?0:(direction*-1),y:isMobile?14:0},{autoAlpha:1,x:0,y:0,duration:.68,stagger:.075,ease:'power3.out'},.08)});
 gsap.utils.toArray('.stagger-group').forEach(group=>{const items=group.querySelectorAll('.stagger-item,button');gsap.fromTo(items,{autoAlpha:0,y:isMobile?12:20},{autoAlpha:1,y:0,duration:.6,stagger:.07,ease:'power3.out',scrollTrigger:{trigger:group,start:'top 82%',once:true},onComplete:()=>group.classList.add('is-visible')})});
 gsap.utils.toArray('.fade-in').forEach(element=>gsap.fromTo(element,{autoAlpha:0,y:isMobile?12:22},{autoAlpha:1,y:0,duration:.75,ease:'power3.out',scrollTrigger:{trigger:element,start:'top 84%',once:true},onComplete:()=>element.classList.add('is-visible')}));
 ScrollTrigger.batch('.gallery-tile',{start:'top 88%',once:true,onEnter:items=>gsap.fromTo(items,{autoAlpha:0,y:isMobile?8:12},{autoAlpha:1,y:0,duration:.34,stagger:.035,ease:'power2.out'})});
 const journeySteps=gsap.utils.toArray('[data-journey-step]'),route=document.querySelector('.journey-route');gsap.set(journeySteps,{autoAlpha:0,y:isMobile?10:18});
 ScrollTrigger.batch(journeySteps,{start:'top 84%',once:true,onEnter:elements=>{elements.forEach(element=>element.classList.add('is-active'));gsap.to(elements,{autoAlpha:1,y:0,duration:.52,stagger:.045,ease:'power2.out'})}});
 ScrollTrigger.create({trigger:route,start:'top 76%',end:'bottom 60%',scrub:isMobile?.25:.5,onUpdate:self=>route.style.setProperty('--route-progress',String(self.progress))});
 ScrollTrigger.create({trigger:document.body,start:'top -24px',onEnter:()=>{document.querySelector('.glass-nav').classList.add('scrolled');gsap.to('.glass-nav',{backgroundColor:'rgba(255,253,247,.97)',duration:.28,ease:'power1.out'})},onLeaveBack:()=>{document.querySelector('.glass-nav').classList.remove('scrolled');gsap.to('.glass-nav',{backgroundColor:'rgba(255,253,247,.72)',duration:.28,ease:'power1.out'})}});
 const navLinks=[...document.querySelectorAll('.desktop-nav a[href^="#"]')];navLinks.forEach(link=>{const section=$(link.hash.slice(1));if(!section)return;ScrollTrigger.create({trigger:section,start:'top 38%',end:'bottom 38%',onToggle:self=>{if(!self.isActive)return;navLinks.forEach(item=>{const active=item===link;item.classList.toggle('active-link',active);if(active)item.setAttribute('aria-current','page');else item.removeAttribute('aria-current')})}})});
 gsap.fromTo('.recognition-layout',{autoAlpha:0,y:isMobile?14:26},{autoAlpha:1,y:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'#recognition',start:'top 82%',once:true}});
 gsap.fromTo('#map-panel',{autoAlpha:0,y:isMobile?12:20},{autoAlpha:1,y:0,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'#map',start:'top 80%',once:true}});
 gsap.fromTo('#qr-guide .max-w-4xl',{autoAlpha:0,y:isMobile?12:22},{autoAlpha:1,y:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'#qr-guide',start:'top 78%',once:true}});
 gsap.fromTo('.site-footer > div > div',{autoAlpha:0,y:16},{autoAlpha:1,y:0,duration:.6,stagger:.08,ease:'power2.out',scrollTrigger:{trigger:'.site-footer',start:'top 88%',once:true}});
 if(destinationSwiper)destinationSwiper.on('slideChangeTransitionEnd',()=>gsap.to(destinationSwiper.slides,{opacity:1,duration:.22,overwrite:true}));
 queueScrollTriggerRefresh();return()=>{heroTimeline?.kill();gsap.killTweensOf([heroSteps,'.hero-section>img']);document.body.classList.remove('gsap-motion');gsapMotionEnabled=false};
}
function initGsapMotion(){const {gsap,ScrollTrigger}=window;if(!gsap||!ScrollTrigger){revealReducedMotionContent();return}try{gsap.registerPlugin(ScrollTrigger);ScrollTrigger.matchMedia({'(prefers-reduced-motion: reduce)':()=>{revealReducedMotionContent();return()=>{}},'(min-width: 768px) and (prefers-reduced-motion: no-preference)':()=>setupGsapMotion(false),'(max-width: 767px) and (prefers-reduced-motion: no-preference)':()=>setupGsapMotion(true)});window.addEventListener('load',queueScrollTriggerRefresh,{once:true});document.addEventListener('load',event=>{if(event.target instanceof HTMLImageElement)queueScrollTriggerRefresh()},true);window.addEventListener('resize',queueScrollTriggerRefresh,{passive:true})}catch(error){console.warn('GSAP motion setup failed; revealing content by default.',error);revealReducedMotionContent();}}
function initVisualMotion(){if(window.gsap&&window.ScrollTrigger){initGsapMotion();return}const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;const heroSteps=[...document.querySelectorAll('[data-hero-step]')];$('home').classList.add('hero-sequence');if(reducedMotion){revealReducedMotionContent()}else{heroSteps.forEach((element,index)=>element.style.setProperty('--hero-delay',index*100+'ms'));window.requestAnimationFrame(()=>$('home').classList.add('hero-ready'))}if(!('IntersectionObserver'in window)){revealReducedMotionContent();return}const journeySteps=[...document.querySelectorAll('[data-journey-step]')];let routeProgress=0;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const element=entry.target;if(element.matches('[data-journey-step]')){element.classList.add('is-active');const index=journeySteps.indexOf(element);routeProgress=Math.max(routeProgress,(index+1)/journeySteps.length);document.querySelector('.journey-route')?.style.setProperty('--route-progress',String(routeProgress))}else element.classList.add('is-visible');observer.unobserve(element)}),{threshold:.18,rootMargin:'0px 0px -8% 0px'});document.querySelectorAll('.reveal,.image-reveal,.stagger-group,.fade-in,[data-journey-step]').forEach(element=>observer.observe(element))}
function initHeroVideo(){const hero=$('home'),video=hero.querySelector('.hero-video'),motion=window.matchMedia('(prefers-reduced-motion: reduce)');if(!video)return;video.addEventListener('playing',()=>hero.classList.add('has-playing-video'));video.addEventListener('error',()=>hero.classList.remove('has-playing-video'));const sync=()=>{if(motion.matches){video.pause();hero.classList.remove('has-playing-video')}else video.play().catch(()=>hero.classList.remove('has-playing-video'))};motion.addEventListener?.('change',sync);sync()}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded',()=>{
renderNoticeBoard();renderFeatured();renderDestinationCarousel();destinationSwiper=initDestinationSwiper();renderTrips();renderDestinations();renderGallery();renderCreditsSection();if(window.lucide)lucide.createIcons();initHeroVideo();initVisualMotion();
['CORAL01','MUEL01','TUKU01','ESCA01','AMBA01','BACL01'].forEach(id=>{const d=destinations.find(x=>x.id===id),b=document.createElement('button');b.type='button';b.textContent=d.name;b.className='qr-sample-btn px-4 py-2 text-sm';b.addEventListener('click',()=>{$('qr-input').value=id;lookupQR()});$('qr-samples').append(b)});
if(window.L){map=L.map('plan-map',{scrollWheelZoom:false}).setView([13.50,120.96],11);map.attributionControl.setPrefix(false);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'}).addTo(map)}
const navLinks=[...document.querySelectorAll('.desktop-nav a[href^="#"]')];const sections=navLinks.map(link=>$(link.hash.slice(1))).filter(Boolean);
let scrollFrame=0;
const updatePageState=()=>{scrollFrame=0;const scrollY=window.scrollY;if(!gsapMotionEnabled){let active='home';for(const section of sections){if(section.getBoundingClientRect().top<=140)active=section.id}navLinks.forEach(link=>{const on=link.hash==='#'+active;link.classList.toggle('active-link',on);if(on)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')});document.querySelector('.glass-nav').classList.toggle('scrolled',scrollY>24)}$('back-to-top').classList.toggle('visible',scrollY>650);const scrollable=document.documentElement.scrollHeight-window.innerHeight,progress=scrollable>0?Math.min(1,scrollY/scrollable):0;$('reading-progress').style.transform='scaleX('+progress+')'};
const queuePageUpdate=()=>{if(!scrollFrame)scrollFrame=window.requestAnimationFrame(updatePageState)};
window.addEventListener('scroll',queuePageUpdate,{passive:true});window.addEventListener('resize',queuePageUpdate,{passive:true});queuePageUpdate();

});

/* ===== Live Location ===== */
$('live-location-button').addEventListener('click',()=>{
const btn=$('live-location-button');if(!navigator.geolocation){$('live-status').textContent='Live location is unavailable. Please open the destination in Google Maps for directions.';return}
btn.disabled=true;$('live-status').textContent='Requesting your one-time locationâ€¦';
navigator.geolocation.getCurrentPosition(position=>{visitorPosition={lat:position.coords.latitude,lng:position.coords.longitude};if(map){if(visitorMarker)map.removeLayer(visitorMarker);visitorMarker=L.marker([visitorPosition.lat,visitorPosition.lng]).addTo(map).bindPopup('Your one-time location');map.setView([visitorPosition.lat,visitorPosition.lng],12)}updateDirections();$('live-status').textContent='Your one-time location is shown on the map when available. Use the directions link for your selected destination.';btn.disabled=false},()=>{$('live-status').textContent='Live location is unavailable. Please open the destination in Google Maps for directions.';btn.disabled=false},{enableHighAccuracy:false,timeout:10000,maximumAge:0})
});

/* ===== Event Listeners ===== */
$('filter-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;currentFilter=b.dataset.cat;setTabs('filter-tabs','cat',currentFilter);renderDestinations()});
$('dest-search').addEventListener('input',renderDestinations);
document.addEventListener('click',e=>{const control=e.target.closest('[data-discover-cat],[data-story-cat],[data-filter-feature],[data-mood-cat]');if(!control)return;e.preventDefault();applyDestinationFilter(control.dataset.discoverCat||control.dataset.storyCat||control.dataset.filterFeature||control.dataset.moodCat)});
 $('dest-reset').addEventListener('click',()=>applyDestinationFilter('all',false));
 if(!destinationSwiper){$('carousel-prev').addEventListener('click',()=>$('destination-carousel').scrollBy({left:-$('destination-carousel').clientWidth*.8,behavior:'smooth'}));$('carousel-next').addEventListener('click',()=>$('destination-carousel').scrollBy({left:$('destination-carousel').clientWidth*.8,behavior:'smooth'}))}
 $('trip-modal-close').addEventListener('click',closeTripModal);$('trip-modal-done').addEventListener('click',closeTripModal);$('trip-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeTripModal()});
 document.querySelectorAll('.mega-trigger').forEach(trigger=>trigger.addEventListener('click',()=>{const panel=$('mega-panel'),wasOpen=trigger.getAttribute('aria-expanded')==='true';document.querySelectorAll('.mega-trigger').forEach(item=>item.setAttribute('aria-expanded','false'));document.querySelectorAll('.mega-content').forEach(item=>item.classList.add('hidden'));panel.classList.toggle('hidden',wasOpen);if(!wasOpen){trigger.setAttribute('aria-expanded','true');$('mega-'+trigger.dataset.mega).classList.remove('hidden')}}));
 $('mega-panel').addEventListener('click',e=>{if(e.target.closest('a')){document.querySelectorAll('.mega-trigger').forEach(item=>item.setAttribute('aria-expanded','false'));$('mega-panel').classList.add('hidden')}});
 document.addEventListener('click',e=>{if(e.target.closest('.desktop-nav,.mega-panel'))return;$('mega-panel').classList.add('hidden');document.querySelectorAll('.mega-trigger').forEach(item=>item.setAttribute('aria-expanded','false'))});
document.addEventListener('click',e=>{const guide=e.target.closest('#dest-grid [data-destination-id]');if(guide){e.preventDefault();const d=destinations.find(item=>item.id===guide.dataset.destinationId);if(d){guide.setAttribute('aria-pressed','true');openModal(d.id,guide)}return}const source=e.target.closest('#dest-grid [data-source-id]');if(source){e.preventDefault();const d=destinations.find(item=>item.id===source.dataset.sourceId);if(d)openSourcesModal(d)}});document.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const control=e.target.closest('#dest-grid [data-destination-id],#dest-grid [data-source-id]');if(!control)return;e.preventDefault();control.click()});
$('gallery-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-gcat]');if(!b)return;galleryFilter=b.dataset.gcat;setTabs('gallery-tabs','gcat',galleryFilter);renderGallery()});
$('modal-x').addEventListener('click',closeModal);$('modal-close').addEventListener('click',closeModal);$('modal-inquire').addEventListener('click',closeModal);$('dest-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal()});
$('sources-modal-close').addEventListener('click',closeSourcesModal);$('sources-modal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeSourcesModal()});
$('lightbox-close').addEventListener('click',closeLightbox);$('lightbox-prev').addEventListener('click',()=>moveLightbox(-1));$('lightbox-next').addEventListener('click',()=>moveLightbox(1));$('lightbox').addEventListener('click',e=>{if(e.target===e.currentTarget)closeLightbox()});

document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){
  if(!$('sources-modal').classList.contains('hidden'))closeSourcesModal();
    else if(!$('trip-modal').classList.contains('hidden'))closeTripModal();
  else if(!$('lightbox').classList.contains('hidden'))closeLightbox();
  else if(!$('dest-modal').classList.contains('hidden'))closeModal();
  else if($('mobile-menu').classList.contains('open')){closeMenu();$('menu-open').focus()}
 }
 if(!$('lightbox').classList.contains('hidden')&&e.key==='ArrowLeft')moveLightbox(-1);
 if(!$('lightbox').classList.contains('hidden')&&e.key==='ArrowRight')moveLightbox(1);
 const dialog=!$('sources-modal').classList.contains('hidden')?$('sources-modal'):!$('trip-modal').classList.contains('hidden')?$('trip-modal'):!$('dest-modal').classList.contains('hidden')?$('dest-modal'):!$('lightbox').classList.contains('hidden')?$('lightbox'):null;
 if(dialog&&e.key==='Tab'){const elements=[...dialog.querySelectorAll('button,a[href]')].filter(el=>el.getClientRects().length);if(!elements.length)return;const first=elements[0],last=elements.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
});

$('menu-open').addEventListener('click',()=>{$('mobile-menu').classList.add('open');$('menu-open').setAttribute('aria-expanded','true');$('menu-close').focus()});$('menu-close').addEventListener('click',()=>{closeMenu();$('menu-open').focus()});$('mobile-menu').querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

$('qr-form').addEventListener('submit',e=>{e.preventDefault();lookupQR()});$('qr-back').addEventListener('click',()=>{$('qr-result').classList.add('hidden');$('qr-input').focus()});
$('qr-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('MinSUcanNGo Galera QR Guide: '+$('qr-input').value.trim());$('qr-copy-status').textContent='Guide code copied.'}catch(e){$('qr-copy-status').textContent='Could not copy automatically. Select the code above to copy it.'}});

/* Credits tabs & filters */
$('tab-photos').addEventListener('click',()=>{creditsTab='photos';renderCreditsSection()});
$('tab-info').addEventListener('click',()=>{creditsTab='info';renderCreditsSection()});
$('credits-show-more').addEventListener('click',()=>{creditsExpanded=!creditsExpanded;renderCreditsSection()});
$('credits-search').addEventListener('input',e=>{creditsQuery=e.target.value.trim().toLowerCase();renderCreditsSection()});
$('credits-filters').addEventListener('click',e=>{const b=e.target.closest('[data-cfilter]');if(!b)return;creditsFilter=b.dataset.cfilter;document.querySelectorAll('#credits-filters [data-cfilter]').forEach(btn=>{btn.classList.toggle('active',btn.dataset.cfilter===creditsFilter);btn.setAttribute('aria-pressed',String(btn.dataset.cfilter===creditsFilter))});renderCreditsSection()});

/* Standalone contact form: validate, then open the visitor's email app. */
$('contact-form').addEventListener('submit', e=>{
 e.preventDefault();
 $('cf-success').classList.add('hidden');$('cf-fail').classList.add('hidden');
 const ids=['name','email','mobile','subject','message'];const record={};let valid=true;
 ids.forEach(key=>{const el=$('cf-'+key);record[key]=el.value.trim();const error=el.parentElement.querySelector('.cf-error');const invalid=el.required&&(!record[key]||(key==='email'&&!el.checkValidity()));if(error)error.classList.toggle('hidden',!invalid);el.setAttribute('aria-invalid',String(invalid));if(invalid)valid=false});
 if(!valid)return;
 const body=`Name: ${record.name}\nEmail: ${record.email}\nMobile: ${record.mobile||'Not provided'}\n\n${record.message}`;
 const link='mailto:pgtourismoffice@gmail.com?subject='+encodeURIComponent(record.subject)+'&body='+encodeURIComponent(body);
 $('cf-success').textContent='Your email app will open with this inquiry. Review it and press Send there.';
 $('cf-success').classList.remove('hidden');window.location.href=link;
});


