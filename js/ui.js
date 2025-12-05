// ui.js — FINAL MOBILE VERSION 2025
console.log("ui.js loaded - FINAL MOBILE VERSION");

function initializeUI() {
    console.log("initializeUI called");
    
    // Привязка элементов
    const themeBtn = document.getElementById('theme_toggle');
    const langSelect = document.getElementById('lang_select');
    const installBtn = document.getElementById('install_btn');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const footerYear = document.getElementById('footer_year');
    const backdrop = document.getElementById('menu-backdrop'); // НОВОЕ
    
    console.log("Elements found:", {
        themeBtn: !!themeBtn,
        langSelect: !!langSelect,
        installBtn: !!installBtn,
        menuToggle: !!menuToggle,
        mobileMenu: !!mobileMenu,
        backdrop: !!backdrop,
        footerYear: !!footerYear
    });
    
    /* -------------------------------
       1. Тема
    -------------------------------- */
    if (themeBtn) {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentTheme = saved || (prefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        setThemeIcon(currentTheme);

themeBtn.onclick = () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ?
        'light' :
        'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setThemeIcon(newTheme);
};
    }
    
    /* -------------------------------
       2. Footer Year
    -------------------------------- */
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
    
    /* -------------------------------
       3. Мобильное меню (НОВОЕ)
          + Scroll lock
          + Backdrop
    -------------------------------- */
    if (menuToggle && mobileMenu) {
        console.log("Mobile menu initialized");
        
        const openMenu = () => {
            mobileMenu.classList.add('open');
            document.body.classList.add('menu-open'); // БЛОКИРОВКА СКРОЛЛА
            if (backdrop) backdrop.classList.add('visible');
        };
        
        const closeMenu = () => {
            mobileMenu.classList.remove('open');
            document.body.classList.remove('menu-open'); // ОТКРЫТЬ СКРОЛЛ
            if (backdrop) backdrop.classList.remove('visible');
        };
        
        menuToggle.onclick = (e) => {
            e.stopPropagation();
            mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
        };
        
        // Клик по backdrop закрывает меню
        if (backdrop) {
            backdrop.onclick = closeMenu;
        }
        
        // Клик вне меню → закрыть
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Клик по пункту меню → закрыть
        mobileMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', closeMenu);
        });
    }
    
    /* -------------------------------
       4. Смена языка
    -------------------------------- */
    if (langSelect && typeof applyLanguage === 'function') {
        langSelect.value = localStorage.getItem('lang') || 'en';
        langSelect.onchange = (e) => {
            const lang = e.target.value;
            applyLanguage(lang);
            localStorage.setItem('lang', lang);
        };
    }
    
    return true;
}

// Highlight active page
const current = location.pathname.split('/').pop();

document.querySelectorAll('#mobile-menu a').forEach(a => {
    if (a.getAttribute('href').includes(current)) {
        a.classList.add('active');
    }
});

/* -------------------------------
   Init with retries
-------------------------------- */
function tryToInitialize() {
    if (initializeUI()) return;
    
    setTimeout(() => {
        if (initializeUI()) return;
        setTimeout(initializeUI, 600);
    }, 300);
}

function setThemeIcon(theme) {
    const isDark = theme === 'dark';

    const hdr = document.querySelector("app-header");
    if (!hdr) return;

    const sun = hdr.querySelector(".theme-icon-light");
    const moon = hdr.querySelector(".theme-icon-dark");

    if (sun && moon) {
        sun.style.display = isDark ? "none" : "inline";
        moon.style.display = isDark ? "inline" : "none";
    }
}


window.initUI = initializeUI;

console.log("ui.js ready");