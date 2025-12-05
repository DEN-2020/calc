// js/components/header.js — FINAL LIGHT DOM VERSION (совместим с ui.js)

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this._initialized = false;
  }

  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    // Шрифт Inter один раз на весь сайт
    if (!document.getElementById("font-inter")) {
      const link = document.createElement("link");
      link.id = "font-inter";
      link.rel = "stylesheet";
      link.href = "https://rsms.me/inter/inter.css";
      document.head.appendChild(link);
    }

    // Глобальный шрифт
    document.documentElement.style.fontFamily =
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    const minimal = this.hasAttribute("minimal");

    // Вставляем HTML-шапку в обычный DOM
    this.innerHTML = this.render(minimal);

    // Подсветка активного пункта меню
    this.highlightCurrentPage();

    // Запускаем глобальный initUI, когда он будет доступен
    if (window.initUI) {
      window.initUI();
    } else {
      window.addEventListener(
        "load",
        () => window.initUI && window.initUI(),
        { once: true }
      );
    }
  }

  render(minimal) {
    return `
<header class="app-header ${minimal ? "header--minimal" : ""}">
  <div class="header-container">
    <div class="container header-inner">

      <div class="header-left">
        <a href="index.html" class="logo">
          <img src="img/logo.svg" alt="FinCalc logo" class="logo-img">
          <span class="logo-text">FinCalc</span>
        </a>

        ${minimal ? "" : this.desktopNav()}
      </div>

      <div class="header-right">

        ${minimal ? "" : `
          <button id="menu-toggle" class="icon-btn menu-toggle" data-i18n="btn_menu">
            <span data-i18n="btn_menu">Menu</span>
          </button>
        `}

        <button id="theme_toggle" class="icon-btn theme-btn">
          <span class="theme-icon-light">☀</span>
          <span class="theme-icon-dark">🌙</span>
        </button>

        <select id="lang_select" class="lang-select">
          <option value="en" data-i18n="lang_en">EN</option>
          <option value="ru" data-i18n="lang_ru">RU</option>
          <option value="fi" data-i18n="lang_fi">FI</option>
        </select>

        <button id="install_btn" class="icon-btn install-btn hidden" data-i18n="btn_download">
          <span data-i18n="btn_download">Install</span>
        </button>
      </div>

    </div>
  </div>
</header>

<!-- постоянный blur-слой -->
<div id="bg-base-blur"></div>

${minimal ? "" : this.mobileNav()}

<div id="menu-backdrop" class="menu-backdrop"></div>
`;
  }

  desktopNav() {
    return `
<nav class="desktop-nav">
  ${this.navItem("index.html", "home")}
  ${this.navItem("spot.html", "spot")}
  ${this.navItem("perp.html", "perp")}
  ${this.navItem("strategy.html", "strategy")}
  ${this.navItem("invest.html", "invest")}
  ${this.navItem("car.html", "car")}
</nav>`;
  }

  mobileNav() {
    return `
<nav id="mobile-menu" class="mobile-menu">
  ${this.navItem("index.html", "home")}
  ${this.navItem("spot.html", "spot")}
  ${this.navItem("perp.html", "perp")}
  ${this.navItem("strategy.html", "strategy")}
  ${this.navItem("invest.html", "invest")}
  ${this.navItem("car.html", "car")}
</nav>`;
  }

  navItem(url, key) {
    return `
<a href="${url}">
  <span class="mi mi-${key}"></span>
  <span data-i18n="nav_${key}">${key}</span>
</a>`;
  }

  highlightCurrentPage() {
    const path = location.pathname.split("/").pop() || "index.html";
    const links = this.querySelectorAll("nav a");
    links.forEach(a => {
      if (a.getAttribute("href") === path) {
        a.classList.add("active");
      }
    });
  }
}

customElements.define("app-header", AppHeader);