// Minimal service worker — exists mainly to satisfy PWA "installability"
// requirements (Chrome/Edge/Android require a fetch handler + manifest
// before showing the install prompt). Caching is intentionally light so
// gift codes / announcements / achievements never go stale for users.
const CACHE_NAME = 'sys-alliance-shell-v1';
const SHELL_ASSETS = [
    '/',
    '/styles/global.css',
    '/styles/achievements.css',
    '/styles/bearhunt.css',
    '/img/icons/icon-192.png',
    '/img/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(SHELL_ASSETS))
            .catch(() => {}) // don't block install if an asset 404s
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // Never cache API calls — gift codes/announcements/etc. must stay fresh.
    if (url.pathname.startsWith('/api/')) return;

    // Cache-first for same-origin static assets (css/js/img), so repeat
    // visits (and the installed app) load instantly; always refresh the
    // cache in the background from the network.
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(request).then((cached) => {
                const networkFetch = fetch(request)
                    .then((response) => {
                        if (response && response.ok) {
                            const clone = response.clone();
                            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                        }
                        return response;
                    })
                    .catch(() => cached);
                return cached || networkFetch;
            })
        );
    }
});
