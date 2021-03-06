const cacheName = 'restaurant-reviews-v1';

const cacheFiles = [
  './',
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
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
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
            return caches.delete(thisCacheName);
          }
        }));
      })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => {
        if (response) { return response; }
        let fetchRequest = e.request.clone();
        return fetch(fetchRequest)
          .then((response) => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(cacheName)
              .then((cache) => {
                cache.put(e.request, responseToCache);
              });
            return response;
          });
      })
  );
});
