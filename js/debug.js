window.APP_DEBUG = {
    enabled: true,
    log(...a) { if (this.enabled) console.log("[DEBUG]", ...a); },
    warn(...a) { if (this.enabled) console.warn("[WARN]", ...a); },
    error(...a) { if (this.enabled) console.error("[ERROR]", ...a); }
};

console.log("[DEBUG] debug.js loaded");