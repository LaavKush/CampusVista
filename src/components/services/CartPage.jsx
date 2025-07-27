// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar';
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CartPage = () => {
  const { cart, handleQuantityChange, checkout } = useCart();
  const { user } = useAuth(); // ✅ Corrected: use `user`, not `currentUser`
  const navigate = useNavigate();

  const items = Object.entries(cart).map(([key, value]) => ({
    ...value,
    key,
  }));

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.qty * (item.price || 100),
    0
  );

  const handleCheckout = async () => {
    const orderId = `ORD-${Date.now()}`;
    const customerEmail = user?.email || "guest@example.com";
    const customerName = user?.displayName || "Guest User";

    const order = {
      id: orderId,
      email: customerEmail,
      name: customerName,
      items,
      status: "Success",
      amount: totalPrice,
      createdAt: serverTimestamp(), // ✅ Use server timestamp for consistency
    };

    try {
      await addDoc(collection(db, "orders"), order); // ✅ Correct Firestore method
      console.log("✅ Order saved to Firestore");

      checkout(); // Clear the cart
      navigate("/thank-you", { state: { order } });
    } catch (error) {
      console.error("❌ Error saving order to Firestore:", error);
    }
  };

  return (
    <>
      <Navbar visible={true} />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-900 drop-shadow mb-12 flex items-center justify-center gap-3">
            <FiShoppingCart size={36} />
            Your Food Cart
          </h2>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 ml-12 mt-40">
              <p className="text-center text-gray-600 text-2xl font-medium flex items-center gap-2">
                <FiShoppingCart className="text-teal-600" size={30} />
                Your cart is currently empty.
              </p>
              <button
                onClick={() => navigate('/services')}
                className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
              >
                Browse Services
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex justify-between items-center bg-white border border-teal-100 hover:shadow-xl transition rounded-2xl px-6 py-4"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-teal-800">{item.itemName}</h3>
                    <p className="text-sm text-gray-500">
                      From: <span className="font-medium text-teal-600">{item.shopName}</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center gap-2 border rounded-xl px-3 py-1 bg-gray-50 shadow-sm">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.itemName, -1, item.shopName, item.price)
                        }
                        className="text-teal-700 hover:text-teal-900 transition"
                      >
                        <FiMinus size={18} />
                      </button>
                      <span className="text-lg font-medium text-gray-800">{item.qty}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.itemName, 1, item.shopName, item.price)
                        }
                        className="text-teal-700 hover:text-teal-900 transition"
                      >
                        <FiPlus size={18} />
                      </button>
                    </div>
                    <span className="text-md font-semibold text-gray-700">
                      ₹{item.qty * (item.price || 100)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-12 text-center space-y-2">
              <p className="text-2xl font-bold text-teal-800">Total Items: {totalItems}</p>
              <p className="text-xl text-teal-600 font-medium">Total Price: ₹{totalPrice}</p>
              <button
                onClick={handleCheckout}
                className="mt-6 px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl shadow-md transition duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
