function initUpdateWatcher() {
    let newWorker;

    if ("serviceWorker" in navigator) {
        // If SW takes control → reload
        navigator.serviceWorker.addEventListener("controllerchange", () => {
            window.location.reload();
        });

        navigator.serviceWorker.getRegistration().then(reg => {
            if (!reg) return;

            reg.addEventListener("updatefound", () => {
                newWorker = reg.installing;

                newWorker.addEventListener("statechange", () => {
                    if (
                        newWorker.state === "installed" &&
                        navigator.serviceWorker.controller
                    ) {
                        showUpdateBanner();
                    }
                });
            });
        });
    }

    // UI banner
    function showUpdateBanner() {
        const banner = document.createElement("div");
        banner.className = "update-banner";
        banner.innerHTML = `
            New version available
            <button id="update_btn">Reload</button>
        `;
        document.body.appendChild(banner);

        document.getElementById("update_btn").onclick = () => {
            newWorker.postMessage("SKIP_WAITING");
        };
    }
}

/* ============================================================
   RUN INIT AFTER PARTIALS (header/footer) ARE LOADED
   ============================================================ */
if (document.readyState === "complete" || document.readyState === "interactive") {
    // Page already parsed → run immediately
    initUpdateWatcher();
} else {
    // Wait until partials are injected
    document.addEventListener("partialsLoaded", initUpdateWatcher);
}