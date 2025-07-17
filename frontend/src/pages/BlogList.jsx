// components/BlogList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    axios.get(`${API_URL}/api/blogs`).then((res) => setBlogs(res.data)).catch(console.error);
  }, []);

  const handleClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-cyan-700 to-purple-800 opacity-60 blur-2xl bg-200 animate-gradient-pan" />

        <div className="relative z-10 w-full h-15 hidden md:block bg-pink-400 mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center pt-4 text-white">📝 Blog Stories</h1>
          <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-0 h-0 
                      border-l-[64px] border-r-[64px] border-t-[24px] 
                      border-l-transparent border-r-transparent border-t-pink-400">
                        
          </div>
        </div>
        <div className=" relative px-4 py-8 z-10 max-w-5xl mx-auto ">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500">No blogs available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {blogs.map((blog) => (
                <div key={blog._id} className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition wobble-hor-bottom" onClick={() => handleClick(blog._id)}>
                  <img src={`${API_URL}/uploads/${blog.image}`} alt={blog.title} className="h-[30vh] w-[30vh] mx-auto object-cover rounded mb-4" />
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">by {blog.author} • {new Date(blog.date).toLocaleDateString()}</p>
                  {/* <p className="text-gray-700 text-sm">{blog.summary}</p> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogList;