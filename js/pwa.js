APP_DEBUG.log("pwa.js loaded");

function initPWA() {
    let deferredPrompt;
    const installBtn = document.getElementById("install_btn");
    
    if (!installBtn) {
        APP_DEBUG.error("install_btn not found — PWA disabled");
        return;
    }
    
    APP_DEBUG.log("PWA install button found");
    
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.classList.remove("hidden");
        APP_DEBUG.log("PWA install prompt available");
    });
    
    installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) {
            APP_DEBUG.warn("No install prompt available");
            return;
        }
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        APP_DEBUG.log(`PWA install outcome: ${outcome}`);
        
        if (outcome === "accepted") {
            installBtn.classList.add("hidden");
        }
        
        deferredPrompt = null;
    });
}