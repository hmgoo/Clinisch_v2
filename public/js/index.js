import { SITE_TEXT } from '../../shared/constants/text.js';
import { getHeaderHTML } from '../../shared/components/Header.js';
import { getFooterHTML } from '../../shared/components/Footer.js';
import { getSideMenuHTML } from '../../shared/components/SideMenu.js';

/**
 * 언어 상태 관리
 */
let currentLang = sessionStorage.getItem('site_lang') || 'EN';

/**
 * 보안 설정: 클릭재킹 방지 (Frame Buster)
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
  if (target === 'Home' || target === '홈') return basePath;
  if (target === 'Korean' || target === 'English' || target === '영문' || target === '한국어') return 'javascript:switchLanguage()';
  
  const mapping = {
    'Services': 'services/', '서비스': 'services/',
    'Approach': 'approach/', '접근 방식': 'approach/',
    'About': 'about/', '소개': 'about/',
    'Contact': 'contact/', '문의하기': 'contact/',
    'Terms of Use': 'terms/', '이용약관': 'terms/',
    'Privacy Policy': 'privacy/', '개인정보 처리방침': 'privacy/',
    'Accessibility Statement': 'accessibility/', '웹 접근성 선언': 'accessibility/',
    'Prohibition of Unauthorized E-mail Collection': 'email-policy/', '이메일 무단수집 거부': 'email-policy/'
  };

  return mapping[target] ? `${basePath}${mapping[target]}` : `${basePath}${target.toLowerCase()}/`;
};

/**
 * 공통 레이아웃 주입 (초기 1회 또는 언어 전환 시)
 */
const injectLayout = (basePath) => {
  const existingHeader = document.getElementById('header');
  const existingFooter = document.getElementById('footer');
  const existingSide = document.getElementById('side-panel');
  const existingBackdrop = document.getElementById('menu-backdrop');

  if (existingHeader) existingHeader.remove();
  if (existingFooter) existingFooter.remove();
  if (existingSide) existingSide.remove();
  if (existingBackdrop) existingBackdrop.remove();

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
  if (!data.INSIGHTS || data.INSIGHTS.length === 0) {
    insightSections.forEach(s => s.style.display = 'none');
    return;
  }

  insightSections.forEach((section, sectionIndex) => {
    section.style.display = 'block';
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
  const langData = SITE_TEXT[currentLang];
  const data = langData.PAGES[pageName];
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

  const langData = SITE_TEXT[currentLang];
  const menuItems = currentLang === 'EN' 
    ? ['Home', 'Services', 'Approach', 'About', 'Contact', 'Korean']
    : ['홈', '서비스', '접근 방식', '소개', '문의하기', 'English'];

  sideNavList.innerHTML = menuItems
    .map(item => `<li><a href="${getLink(item, basePath)}">${item}</a></li>`)
    .join('');
};

/**
 * 푸터 섹션 초기화
 */
const injectFooter = (basePath) => {
  const langData = SITE_TEXT[currentLang];
  const navCol1 = document.getElementById('footer-nav-col1');
  const navCol2 = document.getElementById('footer-nav-col2');

  if (navCol1) {
    navCol1.innerHTML = langData.FOOTER.NAV_COL1
      .map(item => `<li><a href="${getLink(item, basePath)}">${item}</a></li>`).join('');
  }
  if (navCol2) {
    navCol2.innerHTML = langData.FOOTER.NAV_COL2
      .map(item => `<li><a href="${getLink(item, basePath)}">${item}</a></li>`).join('');
  }

  const footerLegal = document.querySelector('.footer-legal');
  const footerCopyright = document.querySelector('.footer-copyright');
  if (footerLegal && langData.FOOTER.LEGAL) {
    const legalLinks = ['terms', 'privacy', 'accessibility', 'email-policy'];
    footerLegal.innerHTML = langData.FOOTER.LEGAL.map((item, index) => `
        <a href="${basePath}${legalLinks[index]}/">${item}</a>
    `).join('');
  }
  if (footerCopyright) {
    const currentYear = new Date().getFullYear();
    footerCopyright.textContent = langData.FOOTER.COPYRIGHT.replace('2026', currentYear);
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
 * 언어 전환 함수 (전역 등록)
 */
window.switchLanguage = () => {
  currentLang = currentLang === 'EN' ? 'KO' : 'EN';
  sessionStorage.setItem('site_lang', currentLang);
  
  // HTML lang 속성 업데이트
  document.documentElement.lang = currentLang.toLowerCase();
  
  // 새로고침 없이 컨텐츠 재주입
  initializeApp();
  
  // 사이드 패널 닫기 (모바일 대응)
  const sidePanel = document.getElementById('side-panel');
  const backdrop = document.getElementById('menu-backdrop');
  sidePanel?.classList.remove('active');
  backdrop?.classList.remove('active');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

/**
 * 전체 어플리케이션 초기화
 */
const initializeApp = () => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  
  const { pageName, basePath } = getPageContext();
  const langData = SITE_TEXT[currentLang];
  
  document.documentElement.lang = currentLang.toLowerCase();
  document.title = langData.TITLE;

  injectLayout(basePath);
  injectPageContent(pageName);
  injectSideMenu(basePath);
  injectFooter(basePath);
  setupMenuEvents();
  setupScrollAnimations();
  initializeEmailProtection();
};

/**
 * 스크롤 감지 및 애니메이션 실행 (Intersection Observer)
 */
const setupScrollAnimations = () => {
  const observerOptions = { threshold: 0.15 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  const targets = document.querySelectorAll('#hero, section[class*="hero-"], .reveal');
  targets.forEach(target => observer.observe(target));
};

document.addEventListener('DOMContentLoaded', initializeApp);
