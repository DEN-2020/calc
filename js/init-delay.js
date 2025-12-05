// init-delay.js — GLOBAL INITIALIZER (Web Components Edition)
console.log("[INIT] init-delay.js loaded");

/**
 * Централизованная инициализация UI + языка
 */
function runInit() {
  console.log("[INIT] Running UI + Lang...");
  
  // UI (theme, menu, install-btn, active link)
  if (typeof window.initUI === "function") {
    window.initUI();
  }
  
  // Language
  if (typeof window.initLang === "function") {
    window.initLang();
  }
}

/**
 * Ждём завершения рендера Web Components
 */
document.addEventListener("DOMContentLoaded", () => {
  // Даём время header.js + footer.js дорендерить DOM
  setTimeout(runInit, 50);
});