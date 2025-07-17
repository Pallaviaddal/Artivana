import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Cart from "./pages/Cart";
import UploadFrame from "./pages/UploadFrame";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/ContactUs";
import Careers from "./pages/Careers";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogUpload from "./pages/AdminBlogUpload";
import TypingGame from "./components/GuessNumber";
import useNetworkStatus from "./hooks/useNetworkStatus";

import "./App.css";
import "./index.css";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function AppWrapper() {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/admin/upload" ||
    location.pathname === "/admin/uploadBlogDetails";

  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <TypingGame />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}
      <main className="flex-grow">
        <Suspense fallback={<div className="text-center p-8 text-xl">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/upload"
              element={
                <ProtectedAdminRoute>
                  <UploadFrame />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/uploadBlogDetails"
              element={
                <ProtectedAdminRoute>
                  <AdminBlogUpload />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Suspense>
      </main>
      {!hideHeader && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
