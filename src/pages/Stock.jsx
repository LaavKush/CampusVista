// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import {
//   collection,
//   updateDoc,
//   doc,
//   onSnapshot,
// } from "firebase/firestore";

// const Stock = ({ shop = "tiwariji" }) => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fetch real-time updates from Firestore
//   useEffect(() => {
//     if (!shop) {
//       console.warn("⚠️ No shop provided to Stock.jsx");
//       return;
//     }

//     console.log("📍 Fetching stock data for shop:", shop);

//     const itemsRef = collection(db, "shops", shop, "items");

//     const unsubscribe = onSnapshot(
//       itemsRef,
//       (snapshot) => {
//         console.log("📦 Snapshot size:", snapshot.size);
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         console.log("✅ Items fetched:", data);
//         setItems(data);
//         setLoading(false);
//       },
//       (error) => {
//         console.error("❌ Firestore snapshot error:", error);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, [shop]);

//   // 🔹 Update quantity in Firestore
//   const updateQuantity = async (itemId, newQty) => {
//     try {
//       const itemRef = doc(db, "shops", shop, "items", itemId);
//       await updateDoc(itemRef, { quantity: newQty });
//       console.log(`✅ Updated ${itemId} → ${newQty}`);
//     } catch (error) {
//       console.error("❌ Error updating quantity:", error);
//     }
//   };

//   // 🔹 Increment / Decrement Handlers
//   const handleIncrease = (item) => {
//     const newQty = (item.quantity || 0) + 1;
//     updateQuantity(item.id, newQty);
//   };

//   const handleDecrease = (item) => {
//     if (item.quantity <= 0) {
//       alert("⚠️ Quantity cannot go below 0!");
//       return;
//     }
//     const newQty = item.quantity - 1;
//     updateQuantity(item.id, newQty);
//   };

//   // 🔹 Loading State
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-lg text-teal-700">
//         Loading stock data...
//       </div>
//     );
//   }

//   // 🔹 No items found
//   if (!items.length) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center">
//         <h2 className="text-2xl font-semibold text-teal-700 mb-4">
//           No items found for "{shop}"
//         </h2>
//       </div>
//     );
//   }

//   // 🔹 Stock Display
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-20 px-6">
//       <h2 className="text-3xl font-bold text-center text-teal-800 mb-10">
//         {shop.charAt(0).toUpperCase() + shop.slice(1)} Stock Management
//       </h2>

//       <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-3xl shadow-md p-5 flex flex-col items-center justify-between transition-transform hover:scale-[1.02]"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="h-40 w-full object-contain rounded-2xl bg-white p-2"
//             />
//             <h3 className="mt-3 text-lg font-semibold text-gray-800">
//               {item.name}
//             </h3>
//             <p className="text-sm text-gray-500 text-center">
//               {item.description}
//             </p>
//             <p className="mt-1 text-teal-700 font-semibold">₹{item.price}</p>

//             <div className="flex items-center justify-between w-full mt-4">
//               <button
//                 className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 transition"
//                 onClick={() => handleDecrease(item)}
//               >
//                 −
//               </button>

//               <span className="text-lg font-bold text-gray-700">
//                 {item.quantity ?? 0}
//               </span>

//               <button
//                 className="bg-green-500 text-white px-4 py-1.5 rounded-full hover:bg-green-600 transition"
//                 onClick={() => handleIncrease(item)}
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Stock;

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, updateDoc, doc, onSnapshot } from "firebase/firestore";
import NavBarAdmin from "../components/Navbar";


const Stock = ({ shop }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  // 🔹 Shop-specific filters
  const shopCategories = {
    tiwariji: [
      "All",
      "Maggi",
      "Momos",
      "Bakery",
      "Beverages",
      "Pasta",
      "Snacks",
      "Indian Breads",
    ],
    nescafe: ["All", "Desserts", "Beverages", "Snacks"],
  };

  useEffect(() => {
    if (!shop) {
      console.error("❌ No shop provided to Stock.jsx");
      return;
    }

    console.log("📍 Fetching data for shop:", shop);

    const itemsRef = collection(db, "shops", shop.toLowerCase(), "items");

    const unsubscribe = onSnapshot(
      itemsRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(`✅ Items fetched for ${shop}:`, data);
        setItems(data);
        setFilteredItems(data);
        setLoading(false);
      },
      (error) => {
        console.error("❌ Firestore snapshot error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [shop]);

  // 🔹 Update Firestore quantity
  const updateQuantity = async (itemId, newQty) => {
    try {
      const itemRef = doc(db, "shops", shop.toLowerCase(), "items", itemId);
      await updateDoc(itemRef, { quantity: newQty });
      console.log(`✅ Updated ${itemId} → ${newQty}`);
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
    }
  };

  const handleIncrease = (item) => {
    const newQty = (item.quantity || 0) + 1;
    updateQuantity(item.id, newQty);
  };

  const handleDecrease = (item) => {
    if ((item.quantity || 0) === 0) {
      alert("⚠️ Quantity cannot be less than 0");
      return;
    }
    const newQty = Math.max(0, (item.quantity || 0) - 1);
    updateQuantity(item.id, newQty);
  };

  // 🔹 Filtering logic
  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === "All") setFilteredItems(items);
    else {
      const filtered = items.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredItems(filtered);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-teal-700">
        Loading stock data...
      </div>
    );

  if (!items.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">
          No items found for "{shop}"
        </h2>
      </div>
    );

  // Get categories for the active shop
  const categories = shopCategories[shop.toLowerCase()] || ["All"];

  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-teal-100">
    {/* ✅ Sticky Navbar */}
    <NavBarAdmin />

    {/* ✅ Scrollable Content */}
    <div className="flex-1 overflow-y-auto py-20 px-6">
      <h2 className="text-3xl font-bold text-center text-teal-800 mb-8">
        {shop.charAt(0).toUpperCase() + shop.slice(1)} Stock Management
      </h2>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-5 py-2 rounded-full border-2 text-sm font-semibold transition ${
              activeFilter === cat
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-teal-700 border-teal-500 hover:bg-teal-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stock Items */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-md p-5 flex flex-col items-center justify-between transition-transform hover:scale-[1.02]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full object-contain rounded-2xl bg-white p-2"
            />
            <h3 className="mt-3 text-lg font-semibold text-gray-800">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 text-center">
              {item.description}
            </p>
            <p className="mt-1 text-teal-700 font-semibold">₹{item.price}</p>

            <div className="flex items-center justify-between w-full mt-4">
              <button
                className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 transition"
                onClick={() => handleDecrease(item)}
              >
                −
              </button>

              <span className="text-lg font-bold text-gray-700">
                {item.quantity ?? 0}
              </span>

              <button
                className="bg-green-500 text-white px-4 py-1.5 rounded-full hover:bg-green-600 transition"
                onClick={() => handleIncrease(item)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center mt-10 text-gray-600 text-lg">
          No items found in "{activeFilter}" category.
        </div>
      )}
    </div>
  </div>
);

};

export default Stock;
