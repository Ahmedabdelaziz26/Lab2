self.addEventListener("install", (event) => {
  console.log("service worker installed!!!!!");
  self.skipWaiting();
  event.waitUntil(
    caches
      .open("Cv")
      .then((cache) => {
        return cache.addAll([
          "lab2.html",
          "1.jpg",
          "bootstrap-5.3.0-dist/bootstrap-5.3.0-dist/css/bootstrap.min.css",
        ]);
      })
      .catch((err) => console.log("cache error", err))
  );
});

self.addEventListener("activate", () => {
  console.log("service worker activate!!!!!");
});

self.addEventListener("fetch", (event) => {
  console.log("Network request :", event.request.url);
  event.respondWith(
    caches
      .match(event.request.url)
      .then((file) => {
        if (file) {
          console.log("Found in cache", event.request.url);
          return file;
        }
        console.log("Network request :", event.request.url);
        return fetch(event.request.url);
      })
      .catch((err) => console.log(err))
  );
});
