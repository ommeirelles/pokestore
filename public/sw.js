importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

workbox.core.clientsClaim();

workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    /\.(?:js|css)$/i,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 24 * 60 * 60,
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/i,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 24 * 60 * 60 * 30,
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    /.*(?:pokeapi)\.co/i,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'poke-requests',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 24 * 60 * 60,
            }),
        ],
    }),
);
