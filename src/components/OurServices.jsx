import React from 'react';
import { MdFastfood, MdPrint } from 'react-icons/md';

const OurServices = () => {
  return (
    <section
      id="services"
      className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#e0f7fa] to-[#b2dfdb] px-4 text-center relative overflow-hidden"
    >
      <div className="absolute w-[300px] h-[300px] bg-teal-200 opacity-20 rounded-full top-10 left-10 blur-3xl"></div>
      <div className="absolute w-[400px] h-[400px] bg-teal-300 opacity-20 rounded-full bottom-10 right-10 blur-2xl"></div>

      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-teal-800 z-10">
        Our Services
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 z-10">
        {/* Service 1 */}
        <div className="bg-white hover:scale-105 transition-transform duration-300 shadow-xl rounded-2xl px-8 py-6 w-72 flex flex-col items-center text-teal-700">
          <MdFastfood className="text-5xl mb-4 text-teal-600" />
          <h3 className="text-xl font-semibold mb-2">Order Food / Beverages</h3>
          <p className="text-sm mb-4">
            Grab delicious food and refreshing beverages across the campus.
          </p>
          <button
            onClick={() => alert('Order Food/Beverages service clicked!')}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-300"
>
            Order Now
          </button>
        </div>

        {/* Service 2 */}
        <div className="bg-white hover:scale-105 transition-transform duration-300 shadow-xl rounded-2xl px-8 py-6 w-72 flex flex-col items-center text-teal-700">
          <MdPrint className="text-5xl mb-4 text-teal-600" />
          <h3 className="text-xl font-semibold mb-2">Photocopy & Tuck Shop</h3>
          <p className="text-sm mb-4">
            Quick and convenient access to photocopy services and essentials.
          </p>
          <button
            onClick={() => alert('Photocopy dealing with tuck shop service clicked!')}
             className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-300"
>
            Visit Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
