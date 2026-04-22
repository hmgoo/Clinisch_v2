import { SITE_TEXT } from '../../shared/constants/text.js';
import { getHeaderHTML } from '../../shared/components/Header.js';
import { getFooterHTML } from '../../shared/components/Footer.js';
import { getSideMenuHTML } from '../../shared/components/SideMenu.js';

/**
 * 보안 설정: 클릭재킹 방지 (Frame Buster)
 * 사이트가 iframe 내에서 로드되는 것을 방지합니다.
 */
if (window.self !== window.top) {
  window.top.location = window.self.location;
}

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
 * 히어로 섹션 데이터 주입
 */
const injectHeroSections = (data, basePath) => {
  const heroSections = document.querySelectorAll('section[id^="hero"], section[class*="hero-"]');
  
  if (data.HEROES && data.HEROES.length > 0) {
    heroSections.forEach((section, index) => {
      const heroData = data.HEROES[index];
      if (!heroData) return;
      const title = section.querySelector('.hero-title');
      const text = section.querySelector('.hero-text');
      if (title) title.textContent = heroData.TITLE;
      if (text) text.textContent = heroData.TEXT;
      if (heroData.IMG) {
        section.style.backgroundImage = `url('${basePath}public/assets/images/webp/${heroData.IMG}')`;
      }
    });
  } else {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    const heroTitle = heroSection.querySelector('.hero-title');
    const heroText = heroSection.querySelector('.hero-text');
    if (heroTitle) heroTitle.textContent = data.HERO_TITLE || '';
    if (heroText) heroText.textContent = data.HERO_TEXT || '';
    if (data.HERO_IMG) {
      heroSection.style.backgroundImage = `url('${basePath}public/assets/images/webp/${data.HERO_IMG}')`;
    }
  }
};

/**
 * 메인 컨텐츠 섹션 데이터 주입 (contents, contents2, contents3)
 */
const injectMainContentSections = (data) => {
  const contentIds = ['contents', 'contents2', 'contents3'];
  
  contentIds.forEach((id, idx) => {
    const container = document.getElementById(id);
    if (!container) return;

    const suffix = idx === 0 ? '' : (idx + 1).toString();
    const titleKey = `CONTENT${suffix}_TITLE`;
    const textKey = `CONTENT${suffix}_TEXT`;

    if (data[titleKey] || data[textKey]) {
      container.style.display = 'block';
      const title = container.querySelector('.content-title');
      const text = container.querySelector('.contents-text');
      if (title) title.textContent = data[titleKey] || '';
      if (text) text.innerHTML = data[textKey] || '';
    } else {
      container.style.display = 'none';
    }
  });
};

/**
 * 상세 내용 및 기타 컨텐츠 주입
 */
const injectExtraDetails = (data) => {
  const expList = document.getElementById('expertise-list');
  const taglineEl = document.getElementById('tagline');
  const detailsContainer = document.getElementById('about-details') || document.getElementById('page-details');

  if (expList && data.EXPERTISE) {
    expList.innerHTML = data.EXPERTISE.map(exp => `
      <div class="mt-space">
        <h4 class="ins-title" style="margin-top: 50px;">${exp.TITLE}</h4>
        <p class="item-text" style="font-size: 20px;">${exp.TEXT}</p>
      </div>
    `).join('');
  }

  if (taglineEl && data.TAGLINE) taglineEl.textContent = data.TAGLINE;

  if (detailsContainer && data.DETAILS) {
    detailsContainer.innerHTML = data.DETAILS.map(detail => `
      <p class="contents-text" style="margin-top: 50px;">${detail}</p>
    `).join('');
  }
};

/**
 * 인사이트 그리드 데이터 주입
 */
const injectInsightsGrid = (data, basePath) => {
  const insightSections = document.querySelectorAll('section[id^="insights"]');
  if (!data.INSIGHTS || data.INSIGHTS.length === 0) return;

  insightSections.forEach((section, sectionIndex) => {
    const grid = section.querySelector('.grid-insight');
    if (!grid) return;

    const startIndex = sectionIndex * 4;
    const insights = data.INSIGHTS.slice(startIndex, startIndex + 4);

    grid.innerHTML = insights.filter(ins => ins.TITLE).map((ins) => {
      const isWide = ins.WIDE ? 'card-wide' : '';
      const imgHTML = ins.IMG ? `<img src="${basePath}public/assets/images/webp/${ins.IMG}" alt="${ins.TITLE}" class="img-box">` : '';
      const textHTML = `
        <div class="text-box">
          <h4 class="ins-title">${ins.TITLE}</h4>
          <p class="ins-text">${ins.TEXT || ''}</p>
        </div>
      `;
      return `<article class="card-insight ${isWide}">${imgHTML}${textHTML}</article>`;
    }).join('');
  });
};

/**
 * 이메일 주소 보호 해제 및 링크 생성
 */
const initializeEmailProtection = () => {
  const protectedEmails = document.querySelectorAll('.protected-email');
  protectedEmails.forEach(el => {
    const user = el.getAttribute('data-user');
    const domain = el.getAttribute('data-domain');
    if (user && domain) {
      const email = `${user}@${domain}`;
      const link = document.createElement('a');
      link.href = `mailto:${email}`;
      link.textContent = email;
      el.parentNode.replaceChild(link, el);
    }
  });
};

/**
 * 페이지별 컨텐츠 주입 (메인 컨트롤러)
 */
const injectPageContent = (pageName) => {
  const data = SITE_TEXT.PAGES[pageName];
  if (!data) return;

  const { basePath } = getPageContext();

  injectHeroSections(data, basePath);
  injectMainContentSections(data);
  injectExtraDetails(data);
  injectInsightsGrid(data, basePath);
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
  const sidePanel = document.getElementById('side-panel');
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

    sidePanel?.classList.toggle('active', isOpen);
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
  initializeEmailProtection(); // 이메일 보호 해제
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
