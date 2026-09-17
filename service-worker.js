const CACHE_PREFIX = `knip-cache-${encodeURIComponent(new URL(self.registration.scope).pathname)}-`;
const CACHE_NAME = `${CACHE_PREFIX}v28`;
const APP_FILES = [
  "./",
  "index.html",
  "styles.css",
  "styles.css?v=28",
  "app.js",
  "app.js?v=28",
  "manifest.json",
  "service-worker.js",
  "knip-logo.svg",
  "knip-logo.png"
];
const APP_URLS = new Set(APP_FILES.map((file) => new URL(file, self.registration.scope).href));

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_FILES.map((file) => new Request(file, { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key === CACHE_NAME) continue;
      let owned = key.startsWith(CACHE_PREFIX);
      // Migrate old names only when every entry belongs to this installation.
      if (/^knip-cache-v\d+$/.test(key)) {
        const cache = await caches.open(key);
        const requests = await cache.keys();
        owned = requests.length > 0 && requests.every((request) => APP_URLS.has(request.url));
      }
      if (owned) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || !url.href.startsWith(self.registration.scope)) return;

  const navigation = request.mode === "navigate";
  if (!navigation && !APP_URLS.has(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Keep installed HTML and scripts from the same version, including offline.
    const cached = await cache.match(navigation ? "index.html" : request);
    if (cached) return cached;
    try {
      return await fetch(request);
    } catch {
      // An HTML document must never masquerade as JavaScript, CSS or an image.
      return Response.error();
    }
  })());
});
