/**
 * 공통 사이드 메뉴 컴포넌트
 * @param {string} basePath - 상위 폴더로 가기 위한 경로 접두사 (예: './' 또는 '../')
 */
export const getSideMenuHTML = (basePath = './') => `
    <div id="menu-backdrop" class="menu-backdrop"></div>
    <nav id="side-panel" class="side-panel">
        <button class="close-btn" id="close-menu" aria-label="Close menu">
            <span class="close-line"></span>
            <span class="close-line"></span>
        </button>
        <ul class="side-nav-list" id="side-nav-list"></ul>
    </nav>
`;
