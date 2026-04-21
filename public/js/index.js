import { SITE_TEXT } from '../../shared/constants/text.js';
import { getHeaderHTML } from '../../shared/components/Header.js';
import { getFooterHTML } from '../../shared/components/Footer.js';
import { getSideMenuHTML } from '../../shared/components/SideMenu.js';

/**
 * 현재 페이지의 깊이 및 페이지 이름 감지
 */
const getPageContext = () => {
  const path = window.location.pathname.toLowerCase();
  let pageName = 'HOME';
  let basePath = './';

  const subPages = ['services', 'approach', 'about', 'contact', 'privacy', 'terms', 'accessibility', 'email-policy'];
  
  subPages.forEach(page => {
    if (path.indexOf(`/${page}/`) !== -1 || path.endsWith(`/${page}`) || path.endsWith(`/${page}/index.html`)) {
      pageName = page.toUpperCase().replace('-', '_');
      basePath = '../';
    }
  });

  return { pageName, basePath };
};

/**
 * 링크 생성 유틸리티 (클린 URL)
 */
const getLink = (target, basePath) => {
  if (target === 'Home') return basePath;
  if (target === 'Korean') return '#';
  const folder = target.toLowerCase();
  return `${basePath}${folder}/`;
};

/**
 * 공통 레이아웃 주입
 */
const injectLayout = (basePath) => {
  const main = document.querySelector('main');
  if (main) {
    main.insertAdjacentHTML('beforebegin', getHeaderHTML(basePath));
  }
  document.body.insertAdjacentHTML('beforeend', getFooterHTML(basePath) + getSideMenuHTML(basePath));
};

/**
 * 페이지별 컨텐츠 주입
 */
const injectPageContent = (pageName) => {
  const data = SITE_TEXT.PAGES[pageName];
  if (!data) return;

  // 히어로 섹션 주입 (단일 또는 다중 배열 지원)
  const heroSections = document.querySelectorAll('section[id^="hero"], section[class*="hero-"]');
  const { basePath } = getPageContext();

  if (data.HEROES && data.HEROES.length > 0) {
    // 배열 방식 (SERVICES 등)
    heroSections.forEach((section, index) => {
      const heroData = data.HEROES[index];
      if (heroData) {
        const title = section.querySelector('.hero-title');
        const desc = section.querySelector('.hero-desc');
        if (title) title.textContent = heroData.TITLE;
        if (desc) desc.textContent = heroData.DESC;
        if (heroData.IMG) {
          section.style.backgroundImage = `url('${basePath}public/assets/images/png/${heroData.IMG}')`;
        }
      }
    });
  } else {
    // 기존 단일 필드 방식 (HOME 등)
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const heroTitle = heroSection.querySelector('.hero-title');
      const heroDesc = heroSection.querySelector('.hero-desc');
      if (heroTitle) heroTitle.textContent = data.HERO_TITLE || '';
      if (heroDesc) heroDesc.textContent = data.HERO_DESC || '';
      if (data.HERO_IMG) {
        heroSection.style.backgroundImage = `url('${basePath}public/assets/images/png/${data.HERO_IMG}')`;
      }
    }
  }

  // 본문 컨텐츠 (데이터가 없으면 섹션 숨김)
  const contentContainer = document.getElementById('contents');
  if (contentContainer) {
    if (data.CONTENT_TITLE || data.CONTENT_DESC) {
      contentContainer.style.display = 'block';
      const contentTitle = contentContainer.querySelector('.content-title');
      const contentDesc = contentContainer.querySelector('.content-desc');
      if (contentTitle) contentTitle.textContent = data.CONTENT_TITLE || '';
      if (contentDesc) contentDesc.innerHTML = data.CONTENT_DESC || '';
    } else {
      contentContainer.style.display = 'none';
    }
  }

  // 두 번째 본문 컨텐츠 (contents2)
  const contentContainer2 = document.getElementById('contents2');
  if (contentContainer2) {
    if (data.CONTENT2_TITLE || data.CONTENT2_DESC) {
      contentContainer2.style.display = 'block';
      const contentTitle2 = contentContainer2.querySelector('.content-title');
      const contentDesc2 = contentContainer2.querySelector('.content-desc');
      if (contentTitle2) contentTitle2.textContent = data.CONTENT2_TITLE || '';
      if (contentDesc2) contentDesc2.textContent = data.CONTENT2_DESC || '';
    } else {
      contentContainer2.style.display = 'none';
    }
  }

  // 추가 컨텐츠 (전문 영역 및 슬로건) - 공통 처리
  const expList = document.getElementById('expertise-list');
  const taglineEl = document.getElementById('tagline');

  if (expList && data.EXPERTISE) {
      expList.innerHTML = data.EXPERTISE.map(exp => `
          <div class="mt-space">
              <h4 class="ins-title" style="margin-top: 50px;">${exp.TITLE}</h4>
              <p class="item-text" style="font-size: 20px;">${exp.DESC}</p>
          </div>
      `).join('');
  }

  if (taglineEl && data.TAGLINE) {
      taglineEl.textContent = data.TAGLINE;
  }

  // 상세 내용 주입 (어바웃, 프라이버시 등 공통)
  const detailsContainer = document.getElementById('about-details') || document.getElementById('page-details');
  if (detailsContainer && data.DETAILS) {
      detailsContainer.innerHTML = data.DETAILS.map(detail => `
          <p class="content-desc" style="margin-top: 50px;">${detail}</p>
      `).join('');
  }

  // 인사이트 섹션 주입 (단일 INSIGHTS 배열로 다중 그리드 지원)
  const insightSections = document.querySelectorAll('section[id^="insights"]');
  if (data.INSIGHTS && data.INSIGHTS.length > 0) {
        insightSections.forEach((section, sectionIndex) => {
            const grid = section.querySelector('.grid-insight');
            if (grid) {
                // 섹션당 4개씩 배분하는 기본 방식으로 원복
                const startIndex = sectionIndex * 4;
                const insights = data.INSIGHTS.slice(startIndex, startIndex + 4);

        grid.innerHTML = insights.filter(ins => ins.TITLE).map((ins) => {
            const isWide = ins.WIDE ? 'card-wide' : '';
            const imgHTML = ins.IMG ? `<img src="${basePath}public/assets/images/png/${ins.IMG}" alt="${ins.TITLE}" class="img-box">` : '';
            const textHTML = ins.TITLE ? `
                <div class="text-box">
                    <h4 class="ins-title">${ins.TITLE}</h4>
                    <p class="ins-desc">${ins.DESC || ''}</p>
                </div>
            ` : '';
            
            return `
                <article class="card-insight ${isWide}">
                    ${imgHTML}
                    ${textHTML}
                </article>
            `;
        }).join('');
      }
    });
  }
};

/**
 * 사이드 메뉴 초기화
 */
const injectSideMenu = (basePath) => {
  const sideNavList = document.getElementById('side-nav-list');
  if (!sideNavList) return;

  const menuItems = ['Home', 'Services', 'Approach', 'About', 'Contact', 'Korean'];
  sideNavList.innerHTML = menuItems
    .map(item => `<li><a href="${getLink(item, basePath)}">${item}</a></li>`)
    .join('');
};

/**
 * 푸터 섹션 초기화
 */
const injectFooter = (basePath) => {
  const navCol1 = document.getElementById('footer-nav-col1');
  const navCol2 = document.getElementById('footer-nav-col2');

  if (navCol1) {
    navCol1.innerHTML = SITE_TEXT.FOOTER.NAV_COL1
      .map(item => `<li><a href="${getLink(item, basePath)}">${item}</a></li>`).join('');
  }
  if (navCol2) {
    navCol2.innerHTML = SITE_TEXT.FOOTER.NAV_COL2
      .map(item => `<li><a href="${getLink(item, basePath)}">${item}</a></li>`).join('');
  }

  const footerLegal = document.querySelector('.footer-legal');
  const footerCopyright = document.querySelector('.footer-copyright');
  if (footerLegal && SITE_TEXT.FOOTER.LEGAL) {
    const legalLinks = ['terms', 'privacy', 'accessibility', 'email-policy'];
    footerLegal.innerHTML = SITE_TEXT.FOOTER.LEGAL.map((item, index) => `
        <a href="${basePath}${legalLinks[index]}/">${item}</a>
    `).join('');
  }
  if (footerCopyright) {
    footerCopyright.textContent = SITE_TEXT.FOOTER.COPYRIGHT;
  }
};

/**
 * 사이드 메뉴 이벤트 바인딩
 */
const setupMenuEvents = () => {
  const menuBtn = document.querySelector('.menu-btn');
  const closeBtn = document.getElementById('close-menu');
  const sideMenu = document.getElementById('side-menu');
  const backdrop = document.getElementById('menu-backdrop');
  const header = document.getElementById('header');

  const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

  const toggleMenu = (isOpen) => {
    const scrollWidth = getScrollbarWidth();
    if (isOpen && menuBtn && closeBtn) {
      const rect = menuBtn.getBoundingClientRect();
      const rightOffset = window.innerWidth - rect.right;
      closeBtn.style.top = `${rect.top + (rect.height / 2) - 15}px`;
      closeBtn.style.right = `${rightOffset + (rect.width / 2) - 15}px`;
    }

    sideMenu?.classList.toggle('active', isOpen);
    backdrop?.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.body.style.paddingRight = isOpen ? `${scrollWidth}px` : '';
    if (header) header.style.paddingRight = isOpen ? `${scrollWidth}px` : '';
  };

  menuBtn?.addEventListener('click', () => toggleMenu(true));
  closeBtn?.addEventListener('click', () => toggleMenu(false));
  backdrop?.addEventListener('click', () => toggleMenu(false));
};

/**
 * 전체 어플리케이션 초기화
 */
const initializeApp = () => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  const { pageName, basePath } = getPageContext();
  injectLayout(basePath);

  document.title = SITE_TEXT.TITLE;
  injectPageContent(pageName); // 페이지별 컨텐츠 주입
  injectSideMenu(basePath);
  injectFooter(basePath);
  setupMenuEvents();
  setupScrollAnimations(); // 스크롤 감지 활성화
};

/**
 * 스크롤 감지 및 애니메이션 실행 (Intersection Observer)
 */
const setupScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.15 // 섹션의 15%가 보이면 실행
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  // 모든 히어로 섹션 및 reveal 클래스 감시
  const targets = document.querySelectorAll('#hero, section[class*="hero-"], .reveal');
  targets.forEach(target => observer.observe(target));
};

document.addEventListener('DOMContentLoaded', initializeApp);
