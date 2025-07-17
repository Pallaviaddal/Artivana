import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../utils/getUser";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/${user.id}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleQuantityChange = async (itemId, type) => {
    const item = cartItems.find((i) => i._id === itemId);
    if (!item) return;

    const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
    if (newQty < 1) return;

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/cart/${itemId}`, {
        quantity: newQty,
      });
      // update local state
      setCartItems((prev) =>
        prev.map((i) =>
          i._id === itemId ? { ...i, quantity: newQty } : i
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const openModal = (imgPath) => setModalImage(imgPath);
  const closeModal = () => setModalImage(null);

  const total = cartItems.reduce((sum, item) => {
    const frame = item.frameId;
    if (!frame) return sum;
    return sum + item.quantity * frame.price;
  }, 0);

  return (
    <div className="mt-20 p-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">🛒 {user?.name}'s Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => {
            const frame = item.frameId;
            if (!frame) return null;

            return (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-4 border p-4 rounded shadow-sm bg-white"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${frame.image}`}
                  alt={frame.name}
                  className="w-28 h-28 object-cover rounded border cursor-pointer"
                  onClick={() =>
                    openModal(`${import.meta.env.VITE_API_URL}/uploads/${frame.image}`)
                  }
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{frame.name}</h2>
                  <div className="text-sm text-gray-600">
                    ₹{frame.price} &bull; Qty: {item.quantity}
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, "dec")}
                      className="border px-2"
                    >
                      –
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, "inc")}
                      className="border px-2"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">Sold by: FrameStore</p>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="mt-2 text-red-600 underline text-sm"
                  >
                    ✕ REMOVE
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Right: Price Summary */}
      <div className="h-full flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-md border h-[45vh] w-full max-w-sm">
          <h2 className="text-lg font-bold mb-4">
            Price Details ({cartItems.length} Item{cartItems.length !== 1 && "s"})
          </h2>

          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Total Product Price</span>
              <span>₹{total}</span>
            </div>

            {cartItems.length > 0 && (
              <>
                <div className="flex justify-between text-green-600">
                  <span>Total Discounts</span>
                  <span>- ₹120</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Order Total</span>
                  <span>₹{total - 120}</span>
                </div>
                <div className="bg-green-100 text-green-800 p-2 rounded mt-2 text-sm">
                  🎉 Yay! Your total discount is ₹120
                </div>
              </>
            )}

            <button
              onClick={() => {
                if (cartItems.length === 0) {
                  navigate("/");
                } else {
                  navigate("/checkout", { state: { cartItems } });
                }
              }}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 w-full"
            >
              Continue
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            <strong>Your Safety, Our Priority</strong>
            <p className="text-gray-400">
              We ensure your package is safe at every step of contact.
            </p>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-red-500"
            >
              ✕
            </button>
            <img
              src={modalImage}
              alt="Full View"
              className="h-[90vh] rounded shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
