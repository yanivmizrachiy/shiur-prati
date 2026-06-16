/**
 * sw.js — Service Worker for תרגילים PWA
 * Strategy: network-first with cache fallback.
 * Allows generator to work offline after the first load.
 * Cache version bump forces re-fetch on deploy.
 */

const CACHE_NAME = 'targilim-v1';

// Core assets to pre-cache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './credit-fix.css',
  './mobile-polish.css',
  './landing.css',
  './manifest.webmanifest',
  './icon.svg',
  // Engine JS files
  './core.js',
  './exercise-set.js',
  './export.js',
  './teacher-mode.js',
  './mobile-share.js',
  './stats.js',
  './algebra.js',
  './geo.js',
  './numeric.js',
  './a7-01.js',
  './a7-02.js',
  './a8-02.js',
  './a8-03.js',
  './g7-01.js',
  './g7-02.js',
  './g8-01.js',
  './g8-04.js',
  './n7-03.js',
  './n7-04.js',
  './n7-05.js',
  './n8-03.js',
  './n8-ratio.js',
  './u7-01.js',
  './u7-02.js',
  './u8-02.js',
  './phase2-loader.js',
  // Engine registry & support
  './engine/source-registry.js',
  './engine/pedagogy-registry.js',
  './engine/source-schema.js',
  './engine/pattern-engine.js',
  './engine/diagrams.js',
];

// Install: pre-cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => {
        // Non-fatal: some assets may not exist yet (e.g. phase2-loader)
        console.warn('[SW] Pre-cache partial failure (non-fatal):', err);
        return self.skipWaiting();
      })
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first, cache fallback
// External CDN (KaTeX, fonts, html2canvas) — network-first, cache on success
// Internal assets — network-first, cache fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and non-http requests
  const url = event.request.url;
  if (!url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses (skip opaque/error)
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, clone))
            .catch(() => {}); // non-fatal
        }
        return response;
      })
      .catch(() => {
        // Network failed — try cache
        return caches.match(event.request)
          .then(cached => {
            if (cached) return cached;
            // For navigation requests, return index.html as fallback
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            return new Response('', { status: 503, statusText: 'Offline' });
          });
      })
  );
});
