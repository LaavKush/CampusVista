// import React, { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   query,
//   orderBy,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "../firebase";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../components/Navbar";


// const OrdersReceived = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [emailFilter, setEmailFilter] = useState("");
//   const [dateFilter, setDateFilter] = useState("");
//   const [uniqueEmails, setUniqueEmails] = useState([]);
//   const [uniqueDates, setUniqueDates] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Identify which shop this admin belongs to
//   const getShopNameFromEmail = (email) => {
//     if (!email) return null;
//     if (email === "tiwarijishop@gmail.com") return "tiwariji";
//     if (email === "nescafe.igdtuw@gmail.com") return "nescafe";
//     return null;
//   };

//   const shopName = getShopNameFromEmail(user?.email);

//   // If not authorized → redirect to admin-dashboard
//   useEffect(() => {
//     if (user && !shopName) {
//       navigate("/admin-dashboard");
//     }
//   }, [user, shopName, navigate]);

//   // Fetch orders
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
//         const snapshot = await getDocs(q);

//         const allOrders = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         const shopOrders = allOrders.filter((order) =>
//           order.items?.some((item) => item.shopName === shopName)
//         );

//         setOrders(shopOrders);
//         setFilteredOrders(shopOrders);

//         const emails = [...new Set(shopOrders.map((o) => o.email))];
//         const dates = [
//           ...new Set(
//             shopOrders.map((o) =>
//               o.createdAt?.toDate?.()?.toLocaleDateString("en-IN")
//             )
//           ),
//         ];

//         setUniqueEmails(emails);
//         setUniqueDates(dates);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (shopName) fetchOrders();
//   }, [shopName]);

//   // Apply filters
//   useEffect(() => {
//     let filtered = [...orders];
//     if (emailFilter) filtered = filtered.filter((o) => o.email === emailFilter);
//     if (dateFilter)
//       filtered = filtered.filter(
//         (o) =>
//           o.createdAt?.toDate?.()?.toLocaleDateString("en-IN") === dateFilter
//       );
//     setFilteredOrders(filtered);
//   }, [emailFilter, dateFilter, orders]);

//   // ✅ Mark order as done (delete from Firestore)
//   const handleOrderDone = async (orderId) => {
//     try {
//       await deleteDoc(doc(db, "orders", orderId));
//       setOrders((prev) => prev.filter((o) => o.id !== orderId));
//       setFilteredOrders((prev) => prev.filter((o) => o.id !== orderId));
//       alert("✅ Order marked as done and removed!");
//     } catch (err) {
//       console.error("Error deleting order:", err);
//       alert("❌ Failed to mark order as done. Try again!");
//     }
//   };

//   return (
//     <>
//       {/* ✅ Admin Navbar on top */}
//       <AdminNavbar visible={true} />

//       <div className="p-6 bg-gradient-to-br from-teal-50 to-green-50 min-h-screen pt-24">
//         <h1 className="text-3xl font-extrabold text-center text-teal-800 mb-8">
//           🛍️ Orders Received —{" "}
//           {shopName === "tiwariji" ? "Tiwari Ji Shop" : "Nescafé"}
//         </h1>

//         {/* Filters */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 justify-center max-w-2xl mx-auto">
//           <select
//             value={emailFilter}
//             onChange={(e) => setEmailFilter(e.target.value)}
//             className="p-3 border rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-teal-500"
//           >
//             <option value="">All Customers</option>
//             {uniqueEmails.map((email) => (
//               <option key={email} value={email}>
//                 {email}
//               </option>
//             ))}
//           </select>

//           <select
//             value={dateFilter}
//             onChange={(e) => setDateFilter(e.target.value)}
//             className="p-3 border rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-teal-500"
//           >
//             <option value="">All Dates</option>
//             {uniqueDates.map((date) => (
//               <option key={date} value={date}>
//                 {date}
//               </option>
//             ))}
//           </select>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading orders...</p>
//         ) : (
//           <div className="space-y-6 max-w-3xl mx-auto">
//             {filteredOrders.length > 0 ? (
//               filteredOrders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <h2 className="text-xl font-semibold text-teal-700">
//                       Order ID: {order.id}
//                     </h2>
//                     <p className="text-gray-500 text-sm">
//                       {order.createdAt?.toDate?.().toLocaleString() || "—"}
//                     </p>
//                   </div>

//                   <p className="text-gray-700 font-medium mb-2">
//                     Customer: {order.email}
//                   </p>

//                   <div className="border-t border-gray-200 mt-3 pt-3">
//                     <p className="font-semibold mb-1">Items Ordered:</p>
//                     {order.items?.map((item, i) => (
//                       <div
//                         key={i}
//                         className="flex justify-between text-gray-700 text-sm"
//                       >
//                         <span>{item.itemName}</span>
//                         <span>
//                           ₹{item.price} × {item.qty}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-4 flex justify-between items-center">
//                     <p className="font-bold text-teal-700">
//                       Total: ₹{order.amount}
//                     </p>
//                     <button
//                       onClick={() => handleOrderDone(order.id)}
//                       className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all"
//                     >
//                       ✅ Order Prepared
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-600 text-center mt-10">
//                 No orders found for your shop.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default OrdersReceived;

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/Navbar";

const OrdersReceived = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [emailFilter, setEmailFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [uniqueEmails, setUniqueEmails] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Identify which shop this admin belongs to
  const getShopNameFromEmail = (email) => {
    if (!email) return null;
    if (email === "tiwarijishop@gmail.com") return "tiwariji";
    if (email === "nescafe.igdtuw@gmail.com") return "nescafe";
    return null;
  };

  const shopName = getShopNameFromEmail(user?.email);

  // Redirect non-authorized users
  useEffect(() => {
    if (user && !shopName) {
      navigate("/admin-dashboard");
    }
  }, [user, shopName, navigate]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const allOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ Filter: Only shop’s orders & not cancelled ones
        const shopOrders = allOrders.filter(
          (order) =>
            order.items?.some((item) => item.shopName === shopName) &&
            order.status?.toLowerCase() !== "cancelled"
        );

        setOrders(shopOrders);
        setFilteredOrders(shopOrders);

        const emails = [...new Set(shopOrders.map((o) => o.email))];
        const dates = [
          ...new Set(
            shopOrders.map((o) =>
              o.createdAt?.toDate?.()?.toLocaleDateString("en-IN")
            )
          ),
        ];

        setUniqueEmails(emails);
        setUniqueDates(dates);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (shopName) fetchOrders();
  }, [shopName]);

  // Apply filters
  useEffect(() => {
    let filtered = [...orders];
    if (emailFilter) filtered = filtered.filter((o) => o.email === emailFilter);
    if (dateFilter)
      filtered = filtered.filter(
        (o) =>
          o.createdAt?.toDate?.()?.toLocaleDateString("en-IN") === dateFilter
      );
    setFilteredOrders(filtered);
  }, [emailFilter, dateFilter, orders]);

  // ✅ Mark order as done (delete from Firestore)
  const handleOrderDone = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      setFilteredOrders((prev) => prev.filter((o) => o.id !== orderId));
      alert("✅ Order marked as done and removed!");
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("❌ Failed to mark order as done. Try again!");
    }
  };

  return (
    <>
      <AdminNavbar visible={true} />
      <div className="p-6 bg-gradient-to-br from-teal-50 to-green-50 min-h-screen pt-24">
        <h1 className="text-3xl font-extrabold text-center text-teal-800 mb-8">
          🛍️ Orders Received —{" "}
          {shopName === "tiwariji" ? "Tiwari Ji Shop" : "Nescafé"}
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 justify-center max-w-2xl mx-auto">
          <select
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="p-3 border rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Customers</option>
            {uniqueEmails.map((email) => (
              <option key={email} value={email}>
                {email}
              </option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-3 border rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Dates</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-teal-700">
                      Order ID: {order.id}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {order.createdAt?.toDate?.().toLocaleString() || "—"}
                    </p>
                  </div>

                  <p className="text-gray-700 font-medium mb-2">
                    Customer: {order.email}
                  </p>

                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <p className="font-semibold mb-1">Items Ordered:</p>
                    {order.items?.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-gray-700 text-sm"
                      >
                        <span>{item.itemName}</span>
                        <span>
                          ₹{item.price} × {item.qty}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <p className="font-bold text-teal-700">
                      Total: ₹{order.amount}
                    </p>
                    <button
                      onClick={() => handleOrderDone(order.id)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all"
                    >
                      ✅ Order Prepared
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center mt-10">
                No active orders found for your shop.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersReceived;
