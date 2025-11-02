import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiNoodles } from 'react-icons/gi';
import { FaCoffee } from 'react-icons/fa';

const OrderFoodSection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-4xl text-center border border-teal-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold text-teal-700">
            Order Food / Beverages
          </h2>
          <button
            onClick={() => navigate('/my-orders')}
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md transition text-sm font-medium"
          >
            Check Previous Orders
          </button>
        </div>

        <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
          Choose from a variety of outlets available across the campus. Craving something? We've got you covered!
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
          {/* 🥘 Tiwari Ji's Shop */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 shadow-md hover:shadow-lg transition duration-300 w-full max-w-sm">
            <div className="flex items-center justify-center mb-3 text-teal-700 text-5xl">
              <GiNoodles />
            </div>
            <h3 className="text-xl font-semibold text-teal-800 mb-3">
              Tiwari Ji's Shop
            </h3>
            <p className="text-gray-700 mb-5 text-sm">
              Serving hot samosas, Maggi, and your favorite desi snacks with love since forever.
            </p>
            <button
              onClick={() => navigate('/view-menu', { state: { shop: 'tiwariji' } })}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md transition"
            >
              View Menu
            </button>
          </div>

          {/* ☕ Nescafé */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 shadow-md hover:shadow-lg transition duration-300 w-full max-w-sm">
            <div className="flex items-center justify-center mb-3 text-teal-700 text-5xl">
              <FaCoffee />
            </div>
            <h3 className="text-xl font-semibold text-teal-800 mb-3">
              Nescafé
            </h3>
            <p className="text-gray-700 mb-5 text-sm">
              Grab a coffee, cold drinks, sandwiches, and chill out with friends during breaks.
            </p>
            <button
              onClick={() => navigate('/view-menu', { state: { shop: 'nescafe' } })}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md transition"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFoodSection;
