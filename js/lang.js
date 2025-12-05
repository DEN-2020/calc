// lang.js — UNIVERSAL LANGUAGE ENGINE 2025
console.log("[DEBUG] lang.js loaded");

// доступно глобально
window.applyLanguage = null;

/**
 * Инициализация языка
 */
function initLang() {
    const select = document.getElementById("lang_select");

    if (!select) {
        console.warn("[WARN] lang_select not found. Retrying...");
        return setTimeout(initLang, 200);
    }

    // создаём обработчик
    window.applyLanguage = createLanguageApplier();

    const saved = localStorage.getItem("lang") || "en";
    select.value = saved;

    window.applyLanguage(saved);

    select.onchange = () => {
        const lang = select.value;
        localStorage.setItem("lang", lang);
        window.applyLanguage(lang);
    };

    console.log("[LANG] initialized.");
}

/**
 * Возвращает функцию applyLanguage(lang)
 */
function createLanguageApplier() {

    return async function applyLanguage(lang) {
        console.log("[LANG] Applying:", lang);

        try {
            const response = await fetch(`lang/${lang}.json?${Date.now()}`);
            if (!response.ok) throw new Error("HTTP " + response.status);

            const dict = await response.json();

            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.dataset.i18n;
                if (dict[key] !== undefined) {
                    el.textContent = dict[key];
                }
            });

            console.log("[LANG] Applied successfully");

        } catch (err) {
            console.error("[LANG] Failed:", err);
        }
    };
}

window.initLang = initLang;