//service-worker.js
const CACHE_NAME = "exquiz.me_cache"; // 캐쉬 이름을 설정합니다.
console.log("Hello from service-worker.js");
const FILES_TO_CACHE = [
  "/offline", // 캐쉬할 페이지 or 파일 들을 설정합니다.
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    // 캐쉬할 페이지들을 전부 캐쉬합니다.
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(FILES_TO_CACHE);
    })
  );
});
