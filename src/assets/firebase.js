// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDzcTaFzcIPjsmnXxeIPcZd9hjjb7XDSgY",
  authDomain: "dmart-clone.firebaseapp.com",
  projectId: "dmart-clone",
  storageBucket: "dmart-clone.firebasestorage.app",
  messagingSenderId: "996170842105",
  appId: "1:996170842105:web:d2bff69fcde66608670728",
  measurementId: "G-H7JP4PYY9V"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
