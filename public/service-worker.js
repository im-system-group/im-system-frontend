// // This will work!
// workbox.routing.registerRoute(
//     ({ request }) => request.destination === 'image',
//     new workbox.strategies.CacheFirst()
// );

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst()
);

// 存任何的css
workbox.routing.registerRoute(
    new RegExp('.*\.css'),
    workbox.strategies.cacheFirst({
        cacheName: 'css-cache'
    })
);

// 存任何的images
workbox.routing.registerRoute(
    new RegExp('.*\.(?:png|jpg|jpeg|svg|gif)'),
    workbox.strategies.cacheFirst({
        cacheName: 'image-cache'
    })
);

// workbox.core.setCacheNameDetails({
//     prefix: 'easy-front-vue-cli3',
//     suffix: 'v1.0.0'
// });

// workbox.core.skipWaiting(); 
// workbox.core.clientsClaim();
// workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// workbox.routing.registerRoute(
//     /.*\.css/,
//     workbox.strategies.staleWhileRevalidate({
//         cacheName: 'css-cache'
//     })
// );

// workbox.routing.registerRoute(
//     // 緩存JS文件
//     /.*\.js/,
//     // 使用緩存，但儘快在後臺更新
//     workbox.strategies.staleWhileRevalidate({
//         // 使用自定義緩存名稱
//         cacheName: 'js-cache'
//     })
// );
// // 緩存web的圖片資源
// workbox.routing.registerRoute(
//     /\.(?:png|gif|jpg|jpeg|svg)$/,
//     workbox.strategies.staleWhileRevalidate({
//         cacheName: 'images',
//         plugins: [
//             new workbox.expiration.Plugin({
//                 maxEntries: 60,
//                 maxAgeSeconds: 30 * 24 * 60 * 60 // 設置緩存有效期為30天
//             })
//         ]
//     })
// );

// // 緩存get api請求的數據
// workbox.routing.registerRoute(
//     new RegExp('https://api.imsystem.site'),
//     workbox.strategies.networkFirst({
//         cacheName: 'api'
//     })
// );
//     // 緩存post api請求的數據
//     // const bgSyncPlugin = new workbox.backgroundSync.Plugin('apiQueue', {
//     //   maxRetentionTime: 1 * 60
//     // });
//     // workbox.routing.registerRoute(
//     //   /.*\/api\/.*/,
//     //   new workbox.strategies.NetworkOnly({
//     //     plugins: [bgSyncPlugin]
//     //   }),
//     //   'POST'
//     // );