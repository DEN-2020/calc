/* ============================================================
   UNIVERSAL SERVICE WORKER
   ============================================================ */

const CACHE_NAME = "profitcalc-v4";

/* STATIC FILES TO CACHE */
const ASSETS = [
  "./",
  "./index.html",
  "./spot.html",
  "./perp.html",
  "./strategy.html",
  "./invest.html",
  
  /* CSS */
  "./css/main.css",
  
  /* JS */
  "./js/ui.js",
  "./js/lang.js",
  "./js/pwa.js",
  "./js/update-notify.js",
  
  "./js/spot.js",
  "./js/perp.js",
  "./js/binance.js",
  "./js/symbols.js",
  
  /* Components */
  "./js/components/header.js",
  "./js/components/footer.js",
  
  /* Manifest */
  "./manifest.json",
  
  /* Language files */
  "./lang/en.json",
  "./lang/ru.json",
  "./lang/fi.json",
  
  /* Icons */
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
  
  /* Images */
  "./img/blank.png"
];

/* INSTALL */
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

/* ACTIVATE */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

/* FETCH */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((resp) => {
          if (resp && resp.status === 200 && resp.type === "basic") {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, resp.clone());
            });
          }
          return resp;
        })
      );
    })
  );
});

/* SKIP WAITING MESSAGE */
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});