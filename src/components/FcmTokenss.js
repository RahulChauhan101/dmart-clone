// // FcmToken.js
// import React, { useEffect } from "react";
// import { messaging, getToken } from "../assets/firebase";

// const FcmToken = ({ userId }) => {
//     console.log(userId);
    
// useEffect(() => {
//   const getFcmToken = async () => {
//     try {
//       const token = await getToken(messaging, {
//         vapidKey: "BK7B4zd_8eNSt4RPICi3CCuH5RZOXxL1nLA8w1JJKa8WaiHqQqAu62dja5khhdOShMYhcDYCj6SqxiQH1LLecss",
//       });

//       if (token) {
//         console.log("✅ FCM Token:", token);

//         // Send token to backend
//         await fetch("http://localhost:5000/api/user/fcm-token", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userId, token }),
//         });
//       } else {
//         console.warn("❌ No registration token available.");
//       }
//     } catch (err) {
//       console.error("🔥 Error getting FCM token:", err);
//     }
//   };

//   const requestNotificationPermission = async () => {
//     try {
//       const permission = await Notification.requestPermission();
//       if (permission === "granted") {
//         console.log("🔓 Notification permission granted.");
//         getFcmToken();
//       } else if (permission === "denied") {
//         console.warn("🔒 Notification permission denied.");
//       } else {
//         console.log("⚠️ Notification permission dismissed.");
//       }
//     } catch (err) {
//       console.error("⚠️ Failed to request notification permission:", err);
//     }
//   };

//   if (userId) {
//     requestNotificationPermission();
//   }
// }, [userId]);


//   return null;
// };

// export default FcmToken;
