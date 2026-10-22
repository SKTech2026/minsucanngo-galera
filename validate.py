from pathlib import Path
from playwright.sync_api import sync_playwright
import subprocess, sys, time, os

root=Path(__file__).parent
server=subprocess.Popen([sys.executable,'-m','http.server','8765','--bind','127.0.0.1'],cwd=root,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
try:
    time.sleep(1)
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True)
        for width,height in [(1440,900),(1280,800),(1024,768),(768,900),(430,932),(390,844),(360,780)]:
            print('Testing viewport',width,flush=True)
            page=browser.new_page(viewport={'width':width,'height':height})
            errors=[]
            page.on('pageerror',lambda error:errors.append(str(error)))
            page.on('console',lambda message:errors.append(message.text) if message.type=='error' else None)
            if width==360:
                page.route('**/vendor/*.js',lambda route:route.fulfill(status=200,content_type='text/javascript',body=''))
            page.goto('http://127.0.0.1:8765',wait_until='domcontentloaded')
            page.wait_for_timeout(1800)
            if width==360:
                assert page.evaluate('!window.gsap && !window.ScrollTrigger && !window.Swiper')
                assert 'swiper-initialized' not in page.locator('#destination-carousel').get_attribute('class')
                assert page.locator('#home .hero-title').evaluate('(el)=>getComputedStyle(el).opacity')=='1'
            else:
                assert page.evaluate('!!window.gsap && !!window.ScrollTrigger && !!window.Swiper')
            if width in (1440,390) and os.environ.get('CAPTURE_PREVIEWS'):
                page.screenshot(path=str(root/f'preview-{width}-hero.png'))
                for section in ['intro-title','featured-title','explore','plan','qr-guide']:
                    page.locator('#'+section).scroll_into_view_if_needed()
                    page.wait_for_timeout(250)
                    page.screenshot(path=str(root/f'preview-{width}-{section}.png'))
            assert page.locator('#dest-grid [data-destination-id]').count()>20,errors
            assert page.locator('#featured-grid button').count()==8
            assert page.locator('#destination-carousel .carousel-card').count()==8
            if width!=360:
                assert 'swiper-initialized' in page.locator('#destination-carousel').get_attribute('class')
            assert page.locator('#trip-grid .trip-card').count()==5
            assert page.locator('#faq details').count()==7
            assert 'hidden' in page.locator('#notice-board').get_attribute('class')
            assert page.locator('[data-journey-step]').count()==8
            assert page.locator('#recognition').is_visible()
            assert page.locator('#reading-progress').count()==1
            assert page.locator('#home [data-hero-step]').count()==8
            assert page.locator('#gallery-grid button').count()>0
            assert page.locator('#home').evaluate('(el)=>el.classList.contains("hero-ready")')
            assert page.locator('body').evaluate('(el)=>el.scrollWidth<=innerWidth+2'),f'horizontal overflow {width}'
            page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight / 2)')
            page.wait_for_function("getComputedStyle(document.getElementById('reading-progress')).transform !== 'matrix(0, 0, 0, 1, 0, 0)'")
            page.locator('.editorial-story').first.scroll_into_view_if_needed()
            page.wait_for_function("document.querySelector('.editorial-story .image-reveal').classList.contains('is-visible')")
            page.locator('.journey-route [data-journey-step]').first.scroll_into_view_if_needed()
            page.wait_for_function("document.querySelector('.journey-route [data-journey-step]').classList.contains('is-active')")
            if width<1024:
                page.locator('#menu-open').click()
                assert 'open' in page.locator('#mobile-menu').get_attribute('class')
                page.keyboard.press('Escape')
                assert 'open' not in page.locator('#mobile-menu').get_attribute('class')
                assert page.evaluate('document.activeElement.id')=='menu-open'
                page.locator('#menu-open').click()
                page.locator('#mobile-menu a[href="#map"]').click()
                assert page.locator('#mobile-menu').get_attribute('class').find('open')<0
            else:
                page.locator('.mega-trigger[data-mega="discover"]').click()
                assert page.locator('#mega-panel').is_visible()
                page.locator('#mega-panel [data-discover-cat="beach"]').click()
                assert page.locator('#filter-tabs [data-cat="beach"]').get_attribute('aria-pressed')=='true'
                page.locator('.mega-trigger[data-mega="plan"]').click()
                assert page.locator('#mega-panel #mega-plan').is_visible()
                page.locator('#mega-panel a[href="#trips"]').click()
                assert page.url.endswith('#trips')
            page.locator('#featured-grid [data-mood-cat="culture"]').click()
            assert page.locator('#filter-tabs [data-cat="culture"]').get_attribute('aria-pressed')=='true'
            if width==360:
                page.locator('#carousel-next').click()
                assert page.locator('#destination-carousel').evaluate('(el)=>el.scrollLeft>0')
            else:
                active_index=page.locator('#destination-carousel').evaluate('(el)=>el.swiper.activeIndex')
                page.locator('#carousel-next').click()
                page.wait_for_function("previous => document.querySelector('#destination-carousel').swiper.activeIndex !== previous",arg=active_index,timeout=5000)
            page.locator('#trip-grid button').first.focus()
            page.keyboard.press('Enter')
            assert 'hidden' not in page.locator('#trip-modal').get_attribute('class')
            assert page.locator('#trip-modal-stops li').count()>0
            page.keyboard.press('Escape')
            page.wait_for_function("document.getElementById('trip-modal').classList.contains('hidden')")
            assert 'hidden' in page.locator('#trip-modal').get_attribute('class')
            assert page.locator('#faq details').first.get_attribute('open') is None
            page.locator('#faq details summary').first.click()
            assert page.locator('#faq details').first.get_attribute('open') is not None
            if width==1440:
                page.emulate_media(reduced_motion='reduce')
                assert page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches")
                assert page.locator('.hero-section>img').evaluate('(el)=>getComputedStyle(el).animationName')=='none'
                assert page.locator('.hero-title').evaluate('(el)=>getComputedStyle(el).opacity')=='1'
                page.emulate_media(reduced_motion='no-preference')
            page.locator('#filter-tabs [data-cat="dive"]').click()
            assert page.locator('#dest-grid [data-destination-id]').count()>0
            page.locator('#dest-search').fill('Coral Garden')
            assert page.locator('#dest-grid [data-destination-id]').count()==1
            assert page.locator('#dest-count').inner_text()=='1 destination'
            page.locator('#dest-search').fill('')
            page.locator('#dest-reset').click()
            assert page.locator('#filter-tabs [data-cat="all"]').get_attribute('aria-pressed')=='true'
            page.locator('#featured-grid button[data-mood-cat="nature"]').first.click()
            assert page.locator('#filter-tabs [data-cat="nature"]').get_attribute('aria-pressed')=='true'
            page.locator('#filter-tabs [data-cat="dive"]').click()
            page.locator('#dest-grid [data-destination-id]').first.click()
            assert 'hidden' not in page.locator('#dest-modal').get_attribute('class')
            page.locator('#modal-sources-btn').click()
            page.wait_for_function("!document.getElementById('sources-modal').classList.contains('hidden')")
            assert 'hidden' not in page.locator('#sources-modal').get_attribute('class')
            page.locator('#sources-modal-close').click()
            page.wait_for_function("document.getElementById('sources-modal').classList.contains('hidden')")
            page.locator('#gallery-grid button').first.click(force=True)
            assert 'hidden' not in page.locator('#lightbox').get_attribute('class')
            assert page.locator('#gallery-grid img').first.evaluate('(el)=>el.complete && el.naturalWidth>0')
            page.locator('#lightbox-next').click()
            page.locator('#lightbox-close').click()
            page.wait_for_function("document.getElementById('lightbox').classList.contains('hidden')")
            page.locator('#gallery-tabs [data-gcat="nature"]').click()
            assert page.locator('#gallery-grid button').count()>0
            page.locator('#gallery-tabs [data-gcat="all"]').click()
            page.locator('#qr-input').fill('CORAL01')
            page.locator('#qr-form button').click()
            assert page.locator('#qr-result-name').inner_text()=='Coral Garden'
            assert page.locator('#selected-map-name').inner_text()=='Coral Garden'
            page.locator('#qr-input').fill('BADCODE')
            page.locator('#qr-form button').click()
            assert page.locator('#qr-error').is_visible()
            assert page.locator('#plan-map').count()==1
            if width==1440:
                page.context.grant_permissions(['geolocation'],origin='http://127.0.0.1:8765')
                page.context.set_geolocation({'latitude':13.5,'longitude':120.96})
                page.locator('#live-location-button').click()
                page.wait_for_function("document.getElementById('live-status').textContent.includes('shown on the map')",timeout=12000)
                assert page.locator('#directions-link').is_visible()
            assert page.locator('#credits-photo-list .credit-card').count()==8
            page.locator('#credits-show-more').click()
            assert page.locator('#credits-photo-list .credit-card').count()>8
            page.locator('#tab-info').click()
            assert page.locator('#credits-info-list .credit-card').count()>0
            page.locator('#credits-search').fill('openstreetmap')
            assert page.locator('#credits-info-list .credit-card').count()==1
            page.locator('#credits-search').fill('')
            page.locator('#contact-form #cf-submit').click()
            assert page.locator('#contact-form [aria-invalid="true"]').count()>0
            for field,value in [('name','Test Visitor'),('email','visitor@example.com'),('subject','Tourism inquiry'),('message','Please send details.')]:
                page.locator('#cf-'+field).fill(value)
            page.locator('#contact-form #cf-submit').click()
            assert page.locator('#cf-success').is_visible()
            assert not errors,errors
            print(width,'PASS','destinations',page.locator('#dest-grid [data-destination-id]').count(),'map',page.evaluate('!!window.L'))
            page.close()
        browser.close()
finally:
    server.terminate();server.wait()

