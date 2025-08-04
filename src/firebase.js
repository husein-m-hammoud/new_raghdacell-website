// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//     apiKey: "AIzaSyBvU-H43u2LHx4HptlUJts7CsB9Lja-wS4",
//     authDomain: "r-sell-c0d98.firebaseapp.com",
//     projectId: "r-sell-c0d98",
//     storageBucket: "r-sell-c0d98.appspot.com",
//     messagingSenderId: "764479888397",
//     appId: "1:764479888397:web:2bbfc4846749fc29c48944",
//     measurementId: "G-JEKQPFGC8E",
// };
// // const firebaseConfig = {
// //     apiKey: "AIzaSyCflbjQKgm9Kv0pqTRDtR0R9OJeHdxiLLU",
// //     authDomain: "raghdacell-c068a.firebaseapp.com",
// //     projectId: "raghdacell-c068a",
// //     storageBucket: "raghdacell-c068a.firebasestorage.app",
// //     messagingSenderId: "1077494422175",
// //     appId: "1:1077494422175:web:c0425a64978ba1fccbe0aa",
// //     measurementId: "G-XMNM76RELD"
// // };
// export const app =
//     getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// export const messaging = getMessaging(app);
// export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";

// ✅ Make sure this config is correct
const firebaseConfig = {
    apiKey: "AIzaSyBvU-H43u2LHx4HptlUJts7CsB9Lja-wS4",
    authDomain: "r-sell-c0d98.firebaseapp.com",
    projectId: "r-sell-c0d98",
    storageBucket: "r-sell-c0d98.appspot.com",
    messagingSenderId: "764479888397",
    appId: "1:764479888397:web:2bbfc4846749fc29c48944",
    measurementId: "G-JEKQPFGC8E",
};
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const app = initializeApp(firebaseConfig); // ✅ Ensure it's initialized
export const messaging = isIOS ? {} : getMessaging(app);
export const auth = getAuth(app);