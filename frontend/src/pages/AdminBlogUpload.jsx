import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminBlogUpload() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    author: "",
    date: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("summary", formData.summary);
    data.append("author", formData.author);
    data.append("date", formData.date);
    data.append("image", image);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/blogs`, data);
      toast.success("Blog uploaded successfully");
      setFormData({
        title: "",
        summary: "",
        author: "",
        date: "",
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload blog");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-50"
        style={{
          backgroundImage: `url('https://images.hdqwalls.com/download/graph-web-abstract-4k-hn-1920x1080.jpg')`, // 📸 Replace with your background image
        }}
      ></div>
      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">Upload Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="summary"
            placeholder="Blog Summary"
            value={formData.summary}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
          >
            Upload Blog
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default AdminBlogUpload;
