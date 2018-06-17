// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// var cacheName = 'v2';
// var cacheFiles = [
//   './',
//   './index.html',
//   './main.css',
//   './js/app.js',
//   'https://www.gstatic.com/firebasejs/5.0.4/firebase.js',
//   'https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js',
//   'https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js'
// ]
// self.addEventListener('install', function(e){
//   console.log("[serviceWorker install]", e);
//   e.waitUntil(
//     caches.open(cacheName).then(function(cache){
//       console.log("cahcing files");
//       return cache.addAll(cacheFiles);
//     })
//   )
// });

// self.addEventListener('activate', function(e){
//   console.log("[serviceWorker activate]", e);
//   e.waitUntil(
//     caches.keys().then(function(cacheNames){
//       return Promise.all(cacheNames.map(function(thisCacheName){
//         if(thisCacheName !== cacheName){
//           console.log("clearing old caches", thisCacheName);
//           return caches.delete(thisCacheName);
//         }
//       }))
//     })
//   )
// })

// self.addEventListener('fetch', function(e){
//   console.log("[serviceWorker fetch]", e.request.url);
// })

importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js');

// var messaging = firebase.messaging();
firebase.initializeApp({
  'messagingSenderId': '103953800507'
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-serviceworker.js] Received background message ', payload);
  // Customize notification here

  var notificationOptions = {
    body: payload
  //badge: "https://www.google.co.in/logos/doodles/2018/world-cup-2018-day-1-5741876039647232.2-s.png"
   // icon: 'https://images.pexels.com/photos/87840/daisy-pollen-flower-nature-87840.jpeg?cs=srgb&dl=bloom-blossom-close-up-87840.jpg&fm=jpg'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  
});
