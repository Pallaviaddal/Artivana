import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${API_URL}/api/users/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("Login Success:", res.data.user);

      // 🎆 Fireworks animation on login success
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 60,
            spread: 180,
            startVelocity: 25,
            gravity: 0.35,
            decay: 0.98,
            scalar: 0.8,
            origin: { y: 0.7 },
            colors: [
              "#ff0000",
              "#00ff00",
              "#0000ff",
              "#ffff00",
              "#ff00ff",
              "#00ffff"
            ],
          });
        }, i * 300);
      }

      toast.success("Login Success 🎉");
      setTimeout(() => navigate("/"), 2000); // delay for animation + toast
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Invalid credentials 😒");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🌆 Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-50"
        style={{
          backgroundImage: `url('https://images.hdqwalls.com/download/graph-web-abstract-4k-hn-1920x1080.jpg')`,
        }}
      ></div>

      {/* ✨ Login Form */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-white bg-opacity-90 backdrop-blur p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Login;
