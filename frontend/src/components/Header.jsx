import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/getUser";
import { Menu, X, ShoppingCart } from "lucide-react";

function Header() {
  const user = getCurrentUser();
  const isAdmin = user?.isAdmin;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 py-3 px-4 shadow-xl w-full">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Artivana Logo" width="50" className="object-contain" />
          <span className="text-white font-bold text-xl hidden sm:inline">Artivana</span>
        </Link>

        {/* Mobile menu icon */}
        <div className="xl:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden xl:flex gap-6 items-center">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/blogs" className="text-white">Blog</Link>
          <Link to="/contact" className="text-white">Contact Us</Link>
          <Link to="/about" className="text-white">About Us</Link>

          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin-dashboard" className="text-sm text-red-600 border font-bold border-red-600 hover:bg-red-600 hover:text-white px-2 py-1 rounded">
                  Admin Panel
                </Link>
              )}
              <Link to="/cart" className="text-sm font-bold flex gap-1 text-green-600 items-center border px-2 py-1 hover:bg-green-600 hover:text-white rounded border-green-600">
                <ShoppingCart size={18} /> Cart
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div>
              <Link to="/login" className="text-white border border-red-600 px-3 py-1 rounded hover:bg-red-600" onClick={() => setMenuOpen(false)}>Login</Link>
              </div>
              <div>
              <Link to="/register" className="text-white border border-green-600 px-3 py-1 rounded hover:bg-green-600" onClick={() => setMenuOpen(false)}>Register</Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="xl:hidden mt-3 flex flex-col gap-4">
          <Link to="/" className="text-white" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/blogs" className="text-white" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link to="/contact" className="text-white" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          <Link to="/about" className="text-white" onClick={() => setMenuOpen(false)}>About Us</Link>

          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin-dashboard" className="text-red-600 border border-red-600 font-bold px-2 py-1 rounded text-center" onClick={() => setMenuOpen(false)}>
                  Admin Panel
                </Link>
              )}
              <Link to="/cart" className="text-green-600 border border-green-600 px-2 py-1 rounded text-center" onClick={() => setMenuOpen(false)}>
                <ShoppingCart size={18} className="inline" /> Cart
              </Link>
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="text-red-600 border border-red-600 px-3 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <div>
              <Link to="/login" className="text-white border border-red-600 px-3 py-1 rounded" onClick={() => setMenuOpen(false)}>Login</Link>
              </div>
              <div>
              <Link to="/register" className="text-white border border-red-600 px-3 py-1 rounded" onClick={() => setMenuOpen(false)}>Register</Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
