import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiNoodles } from 'react-icons/gi';
import { FaCoffee } from 'react-icons/fa';

const OrderFoodSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-4xl text-center relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-teal-700">
          Order Food / Beverages
        </h2>
        <button
          onClick={() => navigate('/my-orders')}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition text-sm"
        >
          Check Previous Orders
        </button>
      </div>

      <p className="text-gray-600 mb-8">
        Choose from a variety of outlets available across the campus. Craving something? We've got you covered!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Tiwari Ji's Shop Card */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 shadow hover:shadow-md transition duration-300">
          <div className="flex items-center justify-center mb-3 text-teal-700 text-4xl">
            <GiNoodles />
          </div>
          <h3 className="text-xl font-semibold text-teal-800 mb-2">
            Tiwari Ji's Shop
          </h3>
          <p className="text-gray-700 mb-4">
            Serving hot samosas, Maggi, and your favorite desi snacks with love since forever.
          </p>
          <button
            onClick={() => navigate('/view-menu', { state: { shop: 'tiwariji' } })}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition"
          >
            View Menu
          </button>
        </div>

        {/* Nescafe Card */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 shadow hover:shadow-md transition duration-300">
          <div className="flex items-center justify-center mb-3 text-teal-700 text-4xl">
            <FaCoffee />
          </div>
          <h3 className="text-xl font-semibold text-teal-800 mb-2">
            Nescafé
          </h3>
          <p className="text-gray-700 mb-4">
            Grab a coffee, cold drinks, sandwiches, and chill out with friends during breaks.
          </p>
          <button
            onClick={() => navigate('/view-menu', { state: { shop: 'nescafe' } })}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition"
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFoodSection;
