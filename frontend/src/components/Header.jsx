import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/getUser";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

function Header() {
  const user = getCurrentUser();
  const isAdmin = user?.isAdmin;
  console.log("User object from localStorage:", user);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="relative w-full  bg-gray-900 py-3 px-4 shadow-xl backdrop-blur-lg">
      <div className="flex justify-between items-center">
        {/* Logo and Welcome */}
        <div className="flex items-center w-full">
          <Link to="/" className="flex items-center">
            <img src="logo.png" alt="Logo" className="object-contain" width={'60px'} />
          </Link>
          {user && (
            <div className="xl:m-auto w-[100%] xl:pt-1 xl:ps-82 flex justify-center items-center">
              <span className="text-xl font-semibold text-white text-center xl:pe-0 text-animation">
                👋 Welcome, <span className="text-red-500">{user.name}</span>
              </span>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black cursor-pointer">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        {user ? (
          <div className="hidden xl:flex xl:w-full xl:m-auto justify-end items-center gap-5">
            <Link to="/" className="text-white text-center">Home</Link>
            <Link to="/blogs" className="text-white text-center">Blog</Link>
            <Link to="/contact" className="text-white text-center">Contact Us</Link>
            <Link to="/about" className="text-white text-center">About Us</Link>

            {isAdmin && (
              <Link
                to="/admin-dashboard"
                className="text-sm text-red-600 border font-bold flex gap-1 border-red-600 hover:bg-red-600 hover:text-white px-2 py-1 rounded  text-center"
              >
                Admin Panel
              </Link>
            )}
            <Link
              to="/cart"
              className="text-sm font-bold flex gap-1 text-green-600 items-center border px-2 py-1 hover:bg-green-600 hover:text-white rounded border-green-600 text-center"
              onClick={() => setMenuOpen(false)}
            >
              <ShoppingCart className="p-1" /> Cart
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden xl:flex items-center gap-4">
            <Link to="/login" className="text-white">Login</Link>
            <Link to="/register" className="text-white">Register</Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="xl:hidden mt-3 flex flex-col gap-3">
          {user ? (
            <>
              <Link to="/blogs" className="text-white text-center px-3 py-1" onClick={() => setMenuOpen(false)}>Blog</Link>
              <Link to="/contact" className="text-white text-center" onClick={() => setMenuOpen(false)}>Contact Us</Link>
              <Link to="/about" className="text-white text-center" onClick={() => setMenuOpen(false)}>About Us</Link>
              <div className="flex justify-center">
                {isAdmin && (
                  <Link
                    to="/admin-dashboard"
                    className="text-sm font-bold flex gap-1 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-2 py-1 rounded text-center"
                  onClick={() => setMenuOpen(false)}>
                    Admin Panel
                  </Link>
                )}
              </div>
              <div className="flex justify-center">
                  
                <Link
                  to="/cart"
                  className="text-sm font-bold flex gap-1 text-green-600 items-center border px-2 py-1 hover:bg-green-600 hover:text-white rounded border-green-600 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <ShoppingCart className="p-1" /> Cart
                </Link>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-sm text-red-600 border font-bold border-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white text-center" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="text-white text-center" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
