/**
 * 공통 푸터 컴포넌트
 * @param {string} basePath - 상위 폴더로 가기 위한 경로 접두사 (예: './' 또는 '../')
 */
export const getFooterHTML = (basePath = './') => `
    <footer id="footer">
        <div class="footer-grid">
            <div class="footer-logo">
                <img src="${basePath}public/assets/images/logos/logo.svg" alt="Clinisch & Co.">
            </div>
            <nav class="footer-nav">
                <ul class="footer-col" id="footer-nav-col1"></ul>
                <ul class="footer-col" id="footer-nav-col2"></ul>
            </nav>
            <div class="footer-legal"></div>
            <p class="footer-copyright"></p>
        </div>
    </footer>
`;
