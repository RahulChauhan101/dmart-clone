// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDzcTaFzcIPjsmnXxeIPcZd9hjjb7XDSgY",
  authDomain: "dmart-clone.firebaseapp.com",
  projectId: "dmart-clone",
  storageBucket: "dmart-clone.firebasestorage.app",
  messagingSenderId: "996170842105",
  appId: "1:996170842105:web:d2bff69fcde66608670728",
  measurementId: "G-H7JP4PYY9V"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message", payload);
});
