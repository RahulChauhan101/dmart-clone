import React, { useState } from "react";
import axios from "axios";

const NotificationForm = () => {
  const [email, setEmail] = useState("rahul@example.com");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/notifications/send", {
        email,
        title,
        body,
      });
      alert("Notification sent ✅");
    } catch (error) {
      alert("Error sending notification ❌");
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-green-100 rounded-lg w-96 shadow-md">
      <h2 className="text-lg font-bold mb-2">Send Notification</h2>
      <form onSubmit={handleSend} className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          placeholder="User Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          value={body}
          placeholder="Message body"
          onChange={(e) => setBody(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default NotificationForm;
