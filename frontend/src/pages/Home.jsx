import React, { useEffect, useState } from "react";
import axios from "axios";
import { LiaSearchSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  const [frames, setFrames] = useState([]);
  const [filteredFrames, setFilteredFrames] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(["All"]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleBuyNow = (frame) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return toast.error("Please login");
    navigate("/checkout", { state: { frame } });
  };

  useEffect(() => {
    axios.get(`${apiUrl}/api/frames`).then((res) => {
      const framesData = res.data;
      setFrames(framesData);
      setFilteredFrames(framesData);

      // Extract unique categories from backend data
      const uniqueCategories = [
        "All",
        ...new Set(
          framesData.map((frame) => frame.category?.toLowerCase() || "uncategorized")
        ),
      ];
      setCategories(uniqueCategories);
    });
  }, []);

  useEffect(() => {
    let filtered = [...frames];

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((frame) =>
        frame.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filter !== "All") {
      filtered = filtered.filter(
        (frame) =>
          (frame.category?.toLowerCase() || "") === filter.toLowerCase()
      );
    }

    setFilteredFrames(filtered);
  }, [filter, searchQuery, frames]);

  const handleAddToCart = async (frameId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return toast.error("Please login");
    try {
      await axios.post(`${apiUrl}/api/cart`, {
        userId: user.id,
        frameId,
      });
      toast.success("Added to cart");
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-cyan-700 to-purple-800 opacity-60 blur-2xl bg-200 animate-gradient-pan" />

      <div className="relative z-10 text-white">
        {/* Hero Section */}
        <div className="relative w-full h-[350px] md:h-[400px] lg:h-[400px] overflow-hidden">
          <img
            src="./border.png"
            alt="Glowing Border"
            className="absolute inset-0 w-full h-full object-contain mx-auto z-0 mix-blend-multiply pointer-events-none md:hidden"
          />
          <section className="absolute inset-0 z-10 flex flex-col mt-5 me-2 md:mt-10 mx-5 md:border-4 md:m-10 rounded-lg items-center justify-center text-center px-4">
            <motion.h1
              initial={{ opacity: 0, x: -70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-xl lg:text-6xl w-[80%] md:w-full capitalize font-bold text-white mb-4"
            >
              Where memories live, beautifully framed.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-sm lg:text-2xl w-[85%] capitalize md:w-full text-white mb-6 max-w-2xl"
            >
              Not just a picture, a portal to a precious moment.
            </motion.p>
            <a
              href={"#shop"}
              className="px-6 py-3 bg-white text-green-900 mt-5 font-semibold rounded shadow hidden md:block"
            >
              Shop Now
            </a>
          </section>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center md:hidden">
            <a
              href={"#shop"}
              className="px-6 py-3 bg-white text-green-900 mt-5 font-semibold rounded shadow"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Featured Section */}
        <section className="max-w-6xl mx-auto py-12 px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-pop-up-top">Featured</h2>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                    filter === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div
              className="flex items-center border rounded overflow-hidden"
              id="shop"
            >
              <span className="bg-yellow-400 p-3 text-xl">
                <LiaSearchSolid />
              </span>
              <input
                type="text"
                placeholder="Search frames..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFilter("All");
                }}
                className="px-4 py-2 w-64 outline-none"
              />
            </div>
          </div>

          {/* Frames Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFrames.length === 0 ? (
              <p className="text-center col-span-full text-gray-300">
                No frames found.
              </p>
            ) : (
              filteredFrames.map((frame) => (
                <div
                  key={frame._id}
                  className="bg-white text-black rounded-lg shadow p-4"
                >
                  <img
                    src={`${apiUrl}/uploads/${frame.image}`}
                    onClick={() =>
                      openModal(`${apiUrl}/uploads/${frame.image}`)
                    }
                    alt={frame.name}
                    className="w-full h-48 object-cover cursor-pointer rounded scale-up"
                  />
                  <h2 className="text-lg font-bold mt-2">{frame.name}</h2>
                  <p>₹{frame.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleAddToCart(frame._id)}
                      className="flex-1 md:px-3 text-sm md:py-2 px-1 py-2 border-2 border-green-600 text-black cursor-pointer rounded"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(frame)}
                      className="flex-1 md:px-3 md:py-2 bg-blue-600 cursor-pointer text-white rounded"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Modal */}
        {selectedImage && (
          <div
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bounce-in-top"
          >
            <div
              className="bg-white p-4 rounded-lg relative shadow-lg mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-xl font-bold text-gray-800 hover:text-red-500"
              >
                &times;
              </button>
              <img
                src={selectedImage}
                alt="Full Frame"
                className="max-h-[80vh] w-full object-contain rounded-md"
              />
            </div>
          </div>
        )}

      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Home;
