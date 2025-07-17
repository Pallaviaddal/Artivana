import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translateText } from "../utils/translate";
import { toast, ToastContainer } from "react-toastify";
import confetti from "canvas-confetti";
import "react-toastify/dist/ReactToastify.css";
import SpotlightCard from './SpotlightCard';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const frame = location.state?.frame || null;
  const cartItems = location.state?.cartItems || [];

  const [modalImage, setModalImage] = useState(null);
  const [modalVideo, setModalVideo] = useState(null);
  const [translatedHi, setTranslatedHi] = useState("");
  const [translatedTe, setTranslatedTe] = useState("");
  const [customSong, setCustomSong] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isOrdering, setIsOrdering] = useState(false);
  const [showOrderText, setShowOrderText] = useState(false);

  const launchHearts = () => {
    confetti({
      particleCount: 175,
      spread: 212,
      startVelocity: 14,
      shapes: ["heart"],
      scalar: 1,
      gravity: 0.35,
      colors: ["#ff1744", "#e91e63", "#ff4569", "#ff6b6b"],
      ticks: 112,
    });
  };

  const handlePlaceOrder = () => {
    if (!name || !email || !phone || !address) {
      toast.error("Please fill in all your details.");
      return;
    }

    setIsOrdering(true);
    setShowOrderText(true);
    launchHearts();

    const items = frame
      ? `1 x ${frame.name} (₹${frame.price})`
      : cartItems
          .map(
            (item) =>
              `${item.quantity} x ${item.frameId.name} (₹${item.frameId.price})`
          )
          .join(", ");

    const totalPrice = frame
      ? frame.price
      : cartItems.reduce(
          (sum, item) =>
            item.frameId ? sum + item.frameId.price * item.quantity : sum,
          0
        );

    const message = `🛒 New Order Details:

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
🏠 Address: ${address}

🖼️ Items: ${items}
💰 Total: ₹${totalPrice}
🎵 Custom Song: ${customSong || "No custom song provided"}

Please confirm the order.`;

    toast.info("Redirecting to WhatsApp...");

    setTimeout(() => {
      const whatsappURL = `https://wa.me/917730978762?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappURL, "_blank");
      setIsOrdering(false);
    }, 1500);
  };

  const openModal = (imgPath) => setModalImage(imgPath);
  const closeModal = () => {
    setModalImage(null);
    setModalVideo(null);
  };

  useEffect(() => {
    const translate = async () => {
      if (frame?.description) {
        const hi = await translateText(frame.description, "hi");
        const te = await translateText(frame.description, "te");
        setTranslatedHi(hi);
        setTranslatedTe(te);
      }
    };
    translate();
  }, [frame]);

  if (!frame && cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl">No items to checkout.</h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen w-full text-white">
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">🧾 Checkout Summary</h2>
        {frame ? (
          <div className="border p-4 rounded-lg shadow">
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255,0.3)">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${frame.image}`}
                alt={frame.name}
                className="h-[50vh] w-full object-cover rounded mb-4 cursor-pointer"
                onClick={() =>
                  openModal(
                    `${import.meta.env.VITE_API_URL}/uploads/${frame.image}`
                  )
                }
              />
              {frame.video && (
                <p
                  onClick={() =>
                    setModalVideo(
                      `${import.meta.env.VITE_API_URL}/uploads/${frame.video}`
                    )
                  }
                  className="text-blue-600 underline cursor-pointer mb-4"
                >
                  🎥 Watch Video
                </p>
              )}
              {frame.audio && (
                <div className="my-4">
                  <p className="font-semibold mb-1">🎧 Audio Preview</p>
                  <audio controls className="w-full">
                    <source
                      src={`${import.meta.env.VITE_API_URL}/uploads/${frame.audio}`}
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              )}
              <h3 className="text-xl font-semibold">{frame.name}</h3>
              <p className="text-gray-500">Price: ₹{frame.price}</p>
              <h1 className="text-lg font-bold">{frame.title}</h1>
              <p className="text-sm text-justify text-gray-600 mb-1">
                📝 English: {frame.description}
              </p>
              <p className="text-sm text-justify text-gray-600 mb-1">
                🌐 हिंदी: {translatedHi || "Translating..."}
              </p>
              <p className="text-sm text-justify text-gray-600">
                🌐 తెలుగు: {translatedTe || "Translating..."}
              </p>
            </SpotlightCard>
          </div>
            
        ) : (
          <>
            {cartItems.map((item) => {
              if (!item.frameId) return null;
              return (
                <div
                  key={item._id}
                  className="flex gap-4 items-start mb-4 border p-4 rounded shadow"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/${item.frameId.image}`}
                    alt={item.frameId.name}
                    className="w-32 h-32 object-cover rounded cursor-pointer"
                    onClick={() =>
                      openModal(
                        `${import.meta.env.VITE_API_URL}/uploads/${item.frameId.image}`
                      )
                    }
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{item.frameId.name}</h3>
                    <p>Price: ₹{item.frameId.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    {item.frameId.audio && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">🎧 Audio:</p>
                        <audio controls className="w-full">
                          <source
                            src={`${import.meta.env.VITE_API_URL}/uploads/${item.frameId.audio}`}
                            type="audio/mpeg"
                          />
                        </audio>
                      </div>
                    )}
                    {item.frameId.video && (
                      <p
                        onClick={() =>
                          setModalVideo(
                            `${import.meta.env.VITE_API_URL}/uploads/${item.frameId.video}`
                          )
                        }
                        className="text-blue-600 underline cursor-pointer mt-2"
                      >
                        🎥 Watch Video
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="text-right font-semibold text-lg mt-4">
              Total: ₹
              {cartItems.reduce(
                (sum, item) =>
                  item.frameId ? sum + item.frameId.price * item.quantity : sum,
                0
              )}
            </div>
          </>
        )}

        {/* Buyer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 border rounded"
          />
          <textarea
            cols={5}
            rows={2}
            placeholder="Customized Song Request (Optional)"
            value={customSong}
            onChange={(e) => setCustomSong(e.target.value)}
            className="p-2 border rounded md:col-span-2"
          />
        </div>


        <button
          onClick={handlePlaceOrder}
          className={`mt-6 px-6 py-2 rounded text-white transition-all duration-500 ${
            isOrdering
              ? "bg-pink-600 scale-110 shadow-xl animate-pulse"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Confirm Order via WhatsApp
        </button>

        {showOrderText && (
          <p className="mt-4 text-pink-600 text-lg font-semibold animate-bounce">
            🎉 Thank You For Ordering! Opening WhatsApp to comfrim...
          </p>
        )}

        {/* IMAGE MODAL */}
        {modalImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bounce-in-top"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-xl p-4 relative shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-800 hover:text-red-600 text-xl font-bold"
              >
                ✕
              </button>
              <img
                src={modalImage}
                alt="Full View"
                className="w-full h-[70vh] object-contain rounded-md"
              />
            </div>
          </div>
        )}

        {modalVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bounce-in-top"
            onClick={closeModal}
          >
            <div
              className="bg-white  rounded-xl p-4 relative shadow-lg "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-800 hover:text-red-600 text-xl font-bold"
              >
                ✕
              </button>
              <video
                src={modalVideo}
                controls
                className="w-full h-[70vh] object-contain rounded-md"
              />
            </div>
          </div>
        )}

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
}

export default Checkout;
