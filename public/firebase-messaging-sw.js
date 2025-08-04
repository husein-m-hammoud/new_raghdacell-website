// importScripts(
//     "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
// );
// importScripts(
//     "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
// );
// const firebaseConfig = {
//   apiKey: "AIzaSyBvU-H43u2LHx4HptlUJts7CsB9Lja-wS4",
//   authDomain: "r-sell-c0d98.firebaseapp.com",
//   projectId: "r-sell-c0d98",
//   storageBucket: "r-sell-c0d98.appspot.com",
//   messagingSenderId: "764479888397",
//   appId: "1:764479888397:web:2bbfc4846749fc29c48944",
//   measurementId: "G-JEKQPFGC8E",
// };
// const firebaseConfig = {
//     apiKey: "AIzaSyCflbjQKgm9Kv0pqTRDtR0R9OJeHdxiLLU",
//     authDomain: "raghdacell-c068a.firebaseapp.com",
//     projectId: "raghdacell-c068a",
//     storageBucket: "raghdacell-c068a.firebasestorage.app",
//     messagingSenderId: "1077494422175",
//     appId: "1:1077494422175:web:c0425a64978ba1fccbe0aa",
//     measurementId: "G-XMNM76RELD"
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onMessage(function(payload) {
//     console.log('Message received. ', payload);
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: "./logo.png",
//     };
//     return self.registration.showNotification(
//         notificationTitle,
//         notificationOptions
//     );
// });

// messaging.onBackgroundMessage((payload) => {
//     console.log("Received background message", payload);
//     self.registration.showNotification(payload.notification.title, {
//       body: payload.notification.body,
//       icon: payload.notification.icon,
//     });
//   });
  



importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyCflbjQKgm9Kv0pqTRDtR0R9OJeHdxiLLU",
    authDomain: "raghdacell-c068a.firebaseapp.com",
    projectId: "raghdacell-c068a",
    storageBucket: "raghdacell-c068a.appspot.com",
    messagingSenderId: "1077494422175",
    appId: "1:1077494422175:web:c0425a64978ba1fccbe0aa",
    measurementId: "G-XMNM76RELD"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// // Handle background notifications
// messaging.onBackgroundMessage((payload) => {
//     console.log("🔥 Background message received:", payload);

//     const notificationTitle = payload.notification
//     const notificationOptions = {
//         body: payload.notification?.body || "You have a new message",
//         icon: payload.notification?.icon || "/logo.png", // Ensure this path is correct
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

messaging.onBackgroundMessage((payload) => {
    console.log("🔥 Background message received:", payload);
  
    if (!self.registration) {
      console.error("🚨 Service Worker registration not found");
      return;
    }
  
    if (!payload.notification) {
      console.error("🚨 Payload missing notification object", payload);
      return;
    }
  
    const notificationTitle = payload.notification.title || "New Notification";
    const notificationOptions = {
      body: payload.notification.body || "You have a new message",
      icon: payload.notification.icon || "/logo.png",
      data: payload.data || {},
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions)
      .then(() => console.log("✅ Notification displayed"))
      .catch((err) => console.error("❌ Failed to show notification", err));
  });