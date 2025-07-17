import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/getUser";

function UploadFrame() {
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" />;

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
    video: null, // ✅ Add video field
    title: "",
    category: "background",
    description: "",
  });

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!form.image) return alert("Please select an image.");

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("image", form.image);
    data.append("video", form.video); // ✅ Append video
    data.append("category", form.category);
    data.append("title", form.title);
    data.append("description", form.description);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/frames`, data);
      alert("Uploaded successfully!");
      setForm({
        name: "",
        price: "",
        image: null,
        video: null, // ✅ Reset video
        title: "",
        category: "background",
        description: "",
      });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload frame. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-50"
        style={{
          backgroundImage: `url('https://images.hdqwalls.com/download/graph-web-abstract-4k-hn-1920x1080.jpg')`,
        }}
      ></div>

      <form
        onSubmit={handleUpload}
        className="relative z-10 bg-white bg-opacity-90 backdrop-blur p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <input
          type="text"
          placeholder="Frame name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="background">Background</option>
          <option value="birthday">Birthday</option>
          <option value="marriage">Marriage</option>
        </select>

        <input
          type="text"
          value={form.title}
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
          required
        ></textarea>

        {/* ✅ Image Upload */}
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          accept="image/*"
          required
        />

        {/* ✅ Video Upload */}
        <input
          type="file"
          onChange={(e) => setForm({ ...form, video: e.target.files[0] })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          accept="video/*"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadFrame;
