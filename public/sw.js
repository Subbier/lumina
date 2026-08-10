const CACHE = "lumina-v5";
const CORE = [
  "/",
  "/spitex",
  "/begleitung",
  "/angehoerige",
  "/team",
  "/tarife",
  "/lohn-check",
  "/anspruchscheck",
  "/kontakt",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/audio/spitex.mp3",
  "/audio/begleitung.mp3",
  "/audio/angehoerige.mp3",
];

self.addEventListener("install", (event) =>
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting()),
  ),
);

self.addEventListener("activate", (event) =>
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  ),
);

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((hit) => hit || caches.match("/")),
      ),
  );
});
