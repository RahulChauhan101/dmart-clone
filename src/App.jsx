import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Rootlayout from "./layouts/Rootlayout";
import Login from "./pages/Login";
import Cart from "./assets/Cart";
import ErrorBoundary from "./components/ErrorBoundary";
import Search from "./assets/Search";
import Notification from "./pages/Notification";
import Wish from "./components/Wish";
import FcmToken from "./components/FcmToken";
import { onMessage } from "firebase/messaging";
import { messaging } from "./assets/firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Save FCM token to backend when user logs in
  useEffect(() => {
    if (fcmToken && user) {
      fetch("http://localhost:5000/api/user/save-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, fcmtoken: fcmToken }),
      }).catch((err) => console.error("Failed to save FCM token:", err));
    }
  }, [fcmToken, user]);

  // Handle foreground push notifications
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received in foreground: ", payload);
      alert(payload?.notification?.title + ": " + payload?.notification?.body);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* Register FCM Token only if user is logged in */}
        {user && <FcmToken onToken={setFcmToken} />}
        
        <Routes>
          {!user ? (
            <>
              {/* Login route for unauthenticated users */}
              <Route path="/login" element={<Login setUser={setUser} />} />
              {/* Redirect any other route to login */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <Route element={<Rootlayout setUser={setUser} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wish" element={<Wish />} />
              <Route path="/search" element={<Search />} />
              <Route path="/notification" element={<Notification />} />
              {/* Default route after login */}
              <Route path="*" element={<Navigate to="/home" />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
