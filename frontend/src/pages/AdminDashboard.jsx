import React from "react";
import { Link } from "react-router-dom";
import "../utils/SplashCursor"
import SplashCursor from "../utils/SplashCursor";

function AdminDashboard() {
  return (
    <div className="min-h-screen pt-24 px-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">👩‍💻 Admin Dashboard</h1>
      <p className="text-center text-gray-600">Welcome, admin! You have access to manage content here.</p>
      <SplashCursor/>
      {/* Add more admin functionality below */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="p-6 bg-white rounded shadow text-center hover:shadow-md transition">
          <Link to={'/admin/upload'}><h2 className="text-xl font-semibold mb-2">Upload Frame</h2>
          <p className="text-gray-600">Add new frame designs to the store.</p></Link>
        </div>
        <div className="p-6 bg-white rounded shadow text-center hover:shadow-md transition">
          <Link to={'/admin/uploadBlogDetails'}><h2 className="text-xl font-semibold mb-2">Upload Blog</h2>
          <p className="text-gray-600">Share inspiring stories with users.</p></Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
