import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, form);
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
        toast.success("Registration successful. Please login.");
        navigate("/login");
    } catch (err) {
        toast.error(err.response?.data?.message || "Registration failed. Try again");
    }
    };


  return (
    <div className="flex justify-center items-center min-h-screen ">
        <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-50"
        style={{
          backgroundImage: `url('https://images.hdqwalls.com/download/graph-web-abstract-4k-hn-1920x1080.jpg')`, // 📸 Replace with your background image
        }}
      ></div>
      <form
        onSubmit={handleRegister}
        className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Register;
