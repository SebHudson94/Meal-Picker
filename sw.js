// Minimal service worker — required by Chrome for "Install app" to appear.
// It doesn't cache anything; every request just passes through to the network.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
