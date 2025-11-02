// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from '../Navbar';
// import { useCart } from '../../context/CartContext';

// const titles = {
//   tiwariji: {
//     text: "Tiwari Ji's Menu",
//     logo: "/images/logos/tiwariji.png",
//   },
//   nescafe: {
//     text: "Nescafé Menu",
//     logo: "/images/logos/nescafe.png",
//   },
// };

// const ViewMenu = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const shop = location.state?.shop;

//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const { cart, handleQuantityChange } = useCart();
//   const titleData = titles[shop] || { text: 'Menu', logo: null };

//   useEffect(() => {
//     const loadMenu = async () => {
//       try {
//         const module = await import(`../../data/${shop}.json`);
//         setMenuItems(module.default);
//       } catch (error) {
//         console.error('Failed to load menu:', error);
//         setMenuItems([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (shop) loadMenu();
//   }, [shop]);

//   const getItemQty = (itemName) => {
//     const key = `${shop}::${itemName}`;
//     return cart[key]?.qty || 0;
//   };

//   const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);

//   const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

//   const filteredItems =
//     selectedCategory === 'All'
//       ? menuItems
//       : menuItems.filter(item => item.category === selectedCategory);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-teal-700">
//         Loading menu...
//       </div>
//     );
//   }

//   if (!menuItems.length) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
//         <h2 className="text-2xl font-semibold text-teal-700 mb-4">Menu not found</h2>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
//         >
//           Back to Shops
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar visible={true} />
//       <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-28 px-6">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
//           <div className="flex items-center gap-4">
//             {titleData.logo && (
//               <img
//                 src={titleData.logo}
//                 alt={`${titleData.text} Logo`}
//                 className="w-20 h-20 object-contain"
//               />
//             )}
//             <h2 className="text-3xl font-bold text-teal-800">{titleData.text}</h2>
//           </div>

//           {totalItems > 0 && (
//             <button
//               onClick={() => navigate('/cart')}
//               className="bg-zinc-800 hover:bg-zinc-900 text-white px-6 py-2 rounded-full shadow font-semibold transition-all duration-200"
//             >
//               🛒 Go to Cart ({totalItems})
//             </button>
//           )}
//         </div>

//         {/* 🟡 CATEGORY FILTERS */}
//         <div className="flex flex-wrap gap-3 justify-center mb-10">
//           {categories.map(category => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
//                 selectedCategory === category
//                   ? 'bg-teal-600 text-white border-teal-600'
//                   : 'bg-white text-teal-700 border-teal-300 hover:bg-teal-50'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* 🟢 MENU GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
//           {filteredItems.map((item, idx) => {
//             const qty = getItemQty(item.name);
//             return (
//               <div
//                 key={idx}
//                 className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.03]"
//               >
//                 <div className="relative">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="h-56 w-full object-contain bg-white p-2"
//                   />
//                   <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
//                     ₹{item.price}
//                   </div>
//                 </div>
//                 <div className="p-5 flex flex-col justify-between flex-1 items-center text-center">
//                   <div className="mb-4">
//                     <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                     {item.description && (
//                       <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
//                     )}
//                   </div>
//                   <div className="mt-auto">
//                     {qty > 0 ? (
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <button
//                             className="bg-teal-500 text-white px-3 py-1.5 rounded-full hover:bg-teal-600 transition"
//                             onClick={() => handleQuantityChange(item.name, -1, shop, item.price)}
//                           >
//                             −
//                           </button>
//                           <span className="text-lg font-medium">{qty}</span>
//                           <button
//                             className="bg-teal-500 text-white px-3 py-1.5 rounded-full hover:bg-teal-600 transition"
//                             onClick={() => handleQuantityChange(item.name, 1, shop, item.price)}
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <button
//                         className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm px-5 py-2 rounded-full font-medium transition"
//                         onClick={() => handleQuantityChange(item.name, 1, shop, item.price)}
//                       >
//                         Add to Cart
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="text-center mt-16">
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-white text-teal-700 hover:bg-teal-50 border border-teal-600 hover:border-teal-700 font-medium px-5 py-2 rounded-xl shadow-sm transition duration-200"
//           >
//             ← Back to Shops
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewMenu;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useCart } from "../../context/CartContext";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const titles = {
  tiwariji: {
    text: "Tiwari Ji's Menu",
    logo: "/images/logos/tiwariji.png",
  },
  nescafe: {
    text: "Nescafé Menu",
    logo: "/images/logos/nescafe.png",
  },
};

const ViewMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const shop = location.state?.shop; // ✅ Get shop from navigation

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { cart, handleQuantityChange } = useCart();
  const titleData = titles[shop] || { text: "Menu", logo: null };

  // ✅ Fetch data from Firestore in real-time
  useEffect(() => {
    console.log("📍 Current shop name:", shop);
    if (!shop) return;

    const itemsRef = collection(db, "shops", shop, "items");
    const unsubscribe = onSnapshot(
      itemsRef,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItems(items);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading Firestore menu:", error);
        setMenuItems([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [shop]);

  const getItemQty = (itemName) => {
    const key = `${shop}::${itemName}`;
    return cart[key]?.qty || 0;
  };

  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const categories = [
    "All",
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ];

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  if (!shop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          ⚠️ No shop selected
        </h2>
        <button
          onClick={() => navigate("/shops")}
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
        >
          Back to Shops
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-teal-700">
        Loading menu...
      </div>
    );
  }

  if (!menuItems.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">
          No items found.
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
        >
          Back to Shops
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar visible={true} />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-28 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center gap-4">
            {titleData.logo && (
              <img
                src={titleData.logo}
                alt={`${titleData.text} Logo`}
                className="w-20 h-20 object-contain"
              />
            )}
            <h2 className="text-3xl font-bold text-teal-800">
              {titleData.text}
            </h2>
          </div>

          {totalItems > 0 && (
            <button
              onClick={() => navigate("/cart")}
              className="bg-zinc-800 hover:bg-zinc-900 text-white px-6 py-2 rounded-full shadow font-semibold transition-all duration-200"
            >
              🛒 Go to Cart ({totalItems})
            </button>
          )}
        </div>

        {/* 🟡 CATEGORY FILTERS */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-teal-700 border-teal-300 hover:bg-teal-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 🟢 MENU GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {filteredItems.map((item, idx) => {
            const qty = getItemQty(item.name);
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.03]"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-56 w-full object-contain bg-white p-2"
                  />
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
                    ₹{item.price}
                  </div>
                </div>
                <div className="p-5 flex flex-col justify-between flex-1 items-center text-center">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto">
                    {item.quantity === 0 ? (
                      <span className="block text-red-500 font-semibold text-sm mt-2">
                        ❌ Out of Stock
                      </span>
                    ) : qty > 0 ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            className="bg-teal-500 text-white px-3 py-1.5 rounded-full hover:bg-teal-600 transition"
                            onClick={() =>
                              handleQuantityChange(item.name, -1, shop, item.price)
                            }
                          >
                            −
                          </button>
                          <span className="text-lg font-medium">{qty}</span>
                          <button
                            className="bg-teal-500 text-white px-3 py-1.5 rounded-full hover:bg-teal-600 transition"
                            onClick={() =>
                              handleQuantityChange(item.name, 1, shop, item.price)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm px-5 py-2 rounded-full font-medium transition"
                        onClick={() =>
                          handleQuantityChange(item.name, 1, shop, item.price)
                        }
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-teal-700 hover:bg-teal-50 border border-teal-600 hover:border-teal-700 font-medium px-5 py-2 rounded-xl shadow-sm transition duration-200"
          >
            ← Back to Shops
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewMenu;
