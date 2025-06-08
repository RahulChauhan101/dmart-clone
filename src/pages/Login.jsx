import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabase';
import FcmToken from '../components/FcmToken';

function Login({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupemail, setsignupEmail] = useState("");
  const [signuppassword, setsignupPassword] = useState("");
  const [error, setError] = useState("");
  const [login, setlogin] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);
  const navigate = useNavigate();

  // Create a memoized callback for setting FCM token
  const handleSetFcmToken = useCallback((token) => {
    console.log('Setting FCM token:', token);
    setFcmToken(token);
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const uploadImage = async (file) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage
        .from("facebook")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw new Error("Upload failed");

      const { data: { signedUrl } } = await supabase.storage
        .from("facebook")
        .createSignedUrl(filePath, 60 * 60 * 24 * 7);

      return signedUrl;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
        fcmToken
      });
      
      localStorage.setItem("user", JSON.stringify(response.data.token));
      setUser(response.data.token);
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError("Invalid email or password.");
    }
  };

  const handlesignup = async (e) => {
    e.preventDefault();
    try {
      let profileImageUrl = "";
      if (profileImage) {
        profileImageUrl = await uploadImage(profileImage);
      }

      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email: signupemail,
        password: signuppassword,
        profileImage: profileImageUrl,
        fcmToken
      });

      localStorage.setItem("user", JSON.stringify(response.data.token));
      setUser(response.data.token);
      navigate("/home");
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      setError("Sign up failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <FcmToken setFcmToken={handleSetFcmToken} />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-2 border-[#226b35]">
        <img
          src="https://thumbs.dreamstime.com/b/new-york-usa-march-dmart-company-logo-corporation-icon-illustrative-editorial-312789702.jpg"
          alt="Facebook"
          className="h-20 w-70 mx-auto mb-6"
        />

        <h2 className="text-center text-xl font-bold mb-4">
          {login ? "Log in to Dmart Account" : "Create new Facebook Account"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={login ? handleLogin : handlesignup} className="space-y-4">
          {!login && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={login ? email : signupemail}
            onChange={(e) =>
              login ? setEmail(e.target.value) : setsignupEmail(e.target.value)
            }
            required
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={login ? password : signuppassword}
            onChange={(e) =>
              login
                ? setPassword(e.target.value)
                : setsignupPassword(e.target.value)
            }
            required
            className="w-full px-4 py-2 border rounded"
          />

          {!login && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          )}

          <button
            type="submit"
            className="w-full bg-[#226b35] text-white py-2 rounded hover:text-[#226b35] hover:bg-white border border-[#226b35]"
          >
            {login ? "Login" : "Sign Up"}
          </button>
        </form>

        {login && (
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-[#226b35] hover:underline">
              Forgotten password?
            </a>
          </div>
        )}

        <hr className="my-6" />

        <div className="text-center">
          <button
            className="text-sm text-[#226b35]hover:underline"
            onClick={() => setlogin(!login)}
          >
            {login ? "Create new account" : "Back to Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
