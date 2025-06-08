import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
// import ProtectedRoute from "./components/ProtectedRoute";

import FcmToken from "./components/FcmToken";

import { onMessage } from "firebase/messaging";
import { messaging } from "./assets/firebase";

const App = () => {
  const [user, setUser] = useState(null);
const [fcmToken, setFcmToken] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
   useEffect(() => {
    if (fcmToken && user) {
      // send token to backend
      fetch("http://localhost:5000/api/user/save-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, fcmtoken: fcmToken }),
      });
    }
  }, [fcmToken, user]);

  useEffect(() => {
  onMessage(messaging, (payload) => {
    // console.log("Message received in foreground: ", payload);
    alert(payload?.notification?.title + ": " + payload?.notification?.body);
  });
}, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
       {user && <FcmToken onToken={setFcmToken} />}
        <Routes>
         
          {!user ?
          <Route path="/login" element={<Login setUser={setUser} />} />
          
          :
          <Route element={<Rootlayout setUser={setUser} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wish" element={<Wish />} />

            <Route path="/search" element={<Search />} />
            <Route path="/Notification" element={<Notification />} />

          </Route>
          }
          {/* fallback for unknown routes */}
          <Route path="*" element={<Login setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
