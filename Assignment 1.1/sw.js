//installs service worker and caches files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/script.js',
        '/db.json',
        '/css/bootstrap.min.css'
      ]);
    })
  );
});

//installs new version of service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v2').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/script.js',
        '/db.json',
        '/css/bootstrap.min.css'
      ]);
    })
  );
});

//hijacks network request
self.addEventListener('fetch', function(event) {
//if network response matches cache, return cache; if not, return network response
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
//clones network response and stores in cache in case of no match
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

//deletes old cache
self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['v2'];
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
