let cacheName = 'restaurant-reviews-v1';

let cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/styles.css',
  '/data/restaurants.json',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/img/1.png',
  '/img/2.png',
  '/img/3.png',
  '/img/4.png',
  '/img/5.png',
  '/img/6.png',
  '/img/7.png',
  '/img/8.png',
  '/img/9.png',
  '/img/10.png',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll(cacheFiles);
      })
  );
});

self.addEventListener('activate', (e) => console.log('***SW activated'))

self.addEventListener('fetch', (e) => console.log('***SW fetching', e.request.url))
