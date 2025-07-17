import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './BlogDetail.css';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs/${id}`);
        setBlog(res.data);
        console.log("Fetched blog data:", res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Failed to load blog.");
      }
    };
    fetchBlog();
  }, [id]);

  if (error) return <div className="mt-24 text-center text-red-600">{error}</div>;
  if (!blog) return <div className="mt-24 text-center">Loading blog...</div>;


  return (
    <>
      {/* Header */}
      <div className="relative w-full h-15 hidden md:block bg-blue-600 mx-auto">
        <h1 className="lg:text-3xl text-lg text-white font-bold mb-2 text-center pt-3">{blog.title} ❤️</h1>
        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-0 h-0 
                        border-l-[64px] border-r-[64px] border-t-[24px] 
                        border-l-transparent border-r-transparent border-t-blue-600">
        </div>
      </div>

      {/* Blog Body */}
      <div className="max-w-full grid grid-cols-1 px-10 md:px-0 sm:grid-cols-2 lg:grid-cols-[1fr_2fr] gap-6 mt-4 scale-up-top">
        {/* Blog Image */}
        <div className="m-auto">
          <img
            src={`${API_URL}/uploads/${blog.image}`}
            alt={blog.title}
            className="h-[50vh] object-cover rounded mb-2 shadow-lg hover:shadow-2xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
            }}
          />
        </div>

        {/* Blog Content */}
        <div className="flex-col w-[85%] text-justify">
          <h1 className="lg:text-3xl  text-lg font-bold mb-2">{blog.title}</h1>
          <p className="text-gray-600 mb-4">
            By {blog.author} • {new Date(blog.date).toLocaleDateString()}
          </p>

          {/* Scrollable Summary */}
          <div className="h-[50vh] overflow-y-scroll pr-1 hide-scrollbar text-sm text-gray-800 leading-7 whitespace-pre-line">
            {blog.summary}
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetail;
