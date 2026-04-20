/**
 * 공통 헤더 컴포넌트
 * @param {string} basePath - 상위 폴더로 가기 위한 경로 접두사 (예: './' 또는 '../')
 */
export const getHeaderHTML = (basePath = './') => `
    <header id="header">
        <div class="header-inner">
            <h1 class="logo">
                <a href="${basePath}">
                    <img src="${basePath}public/assets/images/logos/logo.svg" alt="Clinisch">
                </a>
            </h1>
            <button type="button" class="menu-btn">
                <span class="menu-line-wrap">
                    <span class="menu-line"></span>
                    <span class="menu-line"></span>
                    <span class="menu-line"></span>
                </span>
            </button>
        </div>
    </header>
`;
