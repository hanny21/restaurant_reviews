var cacheName = 'restaurant-reviews-v1';

let cacheFiles = [
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './data/restaurants.json',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        console.log('...installing...');
        return cache.addAll(cacheFiles);
      })
  );
});

self.addEventListener('activate', (e) =>{
  e.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(cacheNames.map((thisCacheName) => {
          if (thisCacheName !== cacheName) {
            console.log('...activating...');
            return caches.delete(thisCacheName);
          }
        }));
      })
  );
});

self.addEventListener('fetch', (e) => {
  e.waitUntil(
    e.respondWith(
      caches.match(e.request)
        .then((response) => {
          console.log('...fetching...');
          return response || fetch(event.request);
        })
    )
  );
});
