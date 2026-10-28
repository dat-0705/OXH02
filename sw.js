// Service worker: giúp điện thoại nhận đây là app để cài, và hiện trang báo khi mất mạng.
// Chỉ lưu tạm phần vỏ app; số liệu báo cáo luôn lấy trực tiếp từ Google (không lưu ở đây).
const VERSION = 'dv-shell-v1';
const SHELL = [
  './', './index.html', './config.js', './offline.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;           // không can thiệp Google / CDN
  if (e.request.mode === 'navigate') {
    // mở app: ưu tiên bản mới trên mạng, mất mạng thì dùng bản đã lưu hoặc trang báo mất mạng
    e.respondWith(
      fetch(e.request).then((r) => { const cp = r.clone(); caches.open(VERSION).then((c) => c.put('./index.html', cp)); return r; })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./offline.html')))
    );
    return;
  }
  // config.js luôn lấy mới khi có mạng (để đổi link webapp không cần cài lại app)
  if (url.pathname.endsWith('/config.js')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
