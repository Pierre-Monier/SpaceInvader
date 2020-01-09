var CACHE_NAME = 'cache';
var urlsToCache = [
  './images/invader1.png',
  './images/invader2.png',
  './images/invader3.png',
  './images/laser.png',
  './images/laser2.png',
  './images/laser3.png',
  './images/logo.png',
  './images/point_25.png',
  './images/point_50.png',
  './images/point_100.png',
  './images/point_200.png',
  './images/shield.png',
  './images/shield1.png',
  './images/shield2.png',
  './images/hero.png',
  './sounds/bg.mp3',
  './sounds/death.mp3',
  './sounds/evil_laser1.mp3',
  './sounds/evil_laser2.mp3',
  './sounds/explosion.wav',
  './sounds/shoot.wav',
  './sounds/win.mp3',
  './index.html',
  './javascript/animatedobject.js',
  './javascript/game.js',
  './javascript/hero.js',
  './javascript/htmlManager.js',
  './javascript/invaders.js',
  './javascript/laser.js',
  './javascript/level.js',
  './javascript/monster.js',
  './javascript/multisprites.js',
  './javascript/shield.js',
  './javascript/sound.js',
  './javascript/vector.js',
  './font/arcadeclassic-webfont.woff',
  './font/arcadeclassic-webfont.woff2',
  './font/stylesheet.css',
  './css/style.css',
  
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting()
});

self.addEventListener('activate', function(evt){
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          // remove old cache
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim()
});

self.addEventListener('fetch', (evt) =>{
  // CODELAB: Add fetch event handler here.
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
      fetch(evt.request)
          .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                  return cache.match('./index.html');
                });
          })
  );
});