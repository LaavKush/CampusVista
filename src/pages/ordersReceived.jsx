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
//     if (email === "tuckshop.igdtuw@gmail.com") return "tuckshop";
//     return null;
//   };

//   const shopName = getShopNameFromEmail(user?.email);

//   // Redirect non-authorized users
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

//         // ✅ Filter: Only shop’s orders & not cancelled ones
//         const shopOrders = allOrders.filter(
//           (order) =>
//             order.items?.some((item) => item.shopName === shopName) &&
//             order.status?.toLowerCase() !== "cancelled"
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
//                 No active orders found for your shop.
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
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/Navbar";
import { createClient } from "@supabase/supabase-js";

// 🔹 Supabase config
const supabaseUrl = "https://ilshgtinlmwjznhaymry.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlsc2hndGlubG13anpuaGF5bXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTU0OTcsImV4cCI6MjA3NzMzMTQ5N30.jyCPmXQclROfHZ_Zj_E5aU3KIFQ8xgdseQmma2umSe0";
const supabase = createClient(supabaseUrl, supabaseKey);

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

  // Identify shop
  const getShopNameFromEmail = (email) => {
    if (!email) return null;
    if (email === "tiwarijishop@gmail.com") return "tiwariji";
    if (email === "nescafe.igdtuw@gmail.com") return "nescafe";
    if (email === "tuckshop.igdtuw@gmail.com") return "tuckshop";
    return null;
  };

  const shopName = getShopNameFromEmail(user?.email);

  // Redirect non-authorized users
  useEffect(() => {
    if (user && !shopName) navigate("/admin-dashboard");
  }, [user, shopName, navigate]);

  // 🔹 Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        let q;

        if (shopName === "tuckshop") {
          q = query(collection(db, "printOrders"), orderBy("createdAt", "desc"));
        } else {
          q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        }

        const snapshot = await getDocs(q);
        const allOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let shopOrders = [];
        if (shopName === "tuckshop") {
  shopOrders = allOrders.filter(
    (o) => 
      o.status === "Success" &&
      (o.prepared === false || o.prepared === undefined) // 🚫 exclude prepared ones
  );
} else {
  shopOrders = allOrders.filter(
    (order) =>
      order.items?.some((item) => item.shopName === shopName) &&
      order.status?.toLowerCase() === "success" &&
      (order.prepared === false || order.prepared === undefined)
  );
}


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
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (shopName) fetchOrders();
  }, [shopName]);

  // 🔹 Apply filters
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

  // 🔹 Mark order as done
 const handleDownloadAndDelete = async (fileUrl, fileName, orderId) => {
  try {
    if (!fileUrl) {
      alert("❌ File URL missing!");
      return;
    }

    // Extract the relative path
    const parts = fileUrl.split("/public/");
    if (parts.length < 2) throw new Error("Invalid file URL format");
    const relativePath = parts[1];
    const cleanPath = relativePath.replace(/^pageOrders\//, "");

    console.log("🧾 Clean file path:", cleanPath);

    // 1️⃣ Download file
    const { data, error: downloadError } = await supabase.storage
      .from("pageOrders")
      .download(cleanPath);
    if (downloadError) throw downloadError;

    // Trigger browser download
    const blobUrl = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName || "file.pdf";
    a.click();
    window.URL.revokeObjectURL(blobUrl);

    // ✅ 2️⃣ Instead of deleting, mark as prepared in Firestore
    const orderRef = doc(db, "printOrders", orderId);
    await updateDoc(orderRef, { prepared: true });

    // ✅ 3️⃣ Update local state
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, prepared: true } : o))
    );
    setFilteredOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, prepared: true } : o))
    );

    alert("✅ File downloaded & marked as prepared!");
  } catch (err) {
    console.error("❌ Error processing file:", err);
    alert("❌ Failed to mark as prepared. Check console.");
  }
};

// 🔹 Mark order as prepared (for other shops)
const handleOrderDone = async (orderId) => {
  try {
     console.log("Updating order:", orderId);
    const q = query(collection(db, "orders"), where("id", "==", orderId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("❌ Order not found!");
      return;
    }

    const orderDoc = querySnapshot.docs[0].ref;
    await updateDoc(orderDoc, {
      prepared: true,
    });

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, prepared: true } : o))
    );
    setFilteredOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, prepared: true } : o))
    );

    alert("✅ Order marked as prepared!");
  } catch (err) {
    console.error("❌ Error marking prepared:", err);
  }
};

  // 🔹 UI
  return (
    <>
      <AdminNavbar visible={true} />
      <div className="p-6 bg-gradient-to-br from-teal-50 to-green-50 min-h-screen pt-24">
        <h1 className="text-3xl font-extrabold text-center text-teal-800 mb-8">
          {shopName === "tuckshop"
            ? "🖨️ Printing Orders — Tuck Shop"
            : `🛍️ Orders Received — ${
                shopName === "tiwariji" ? "Tiwari Ji Shop" : "Nescafé"
              }`}
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

                  {/* Tuck Shop Orders */}
                  {shopName === "tuckshop" ? (
                    <div className="border-t border-gray-200 mt-3 pt-3 space-y-3">
                      {order.files?.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-gray-700"
                        >
                          <div>
                            <p className="font-medium">{file.fileName}</p>
                            <p className="text-sm">
                              {file.copies} copies • {file.colorOption} •{" "}
                              {file.orientation} • {file.layout}
                            </p>
                          </div>
                         <button
  onClick={() =>
    handleDownloadAndDelete(file.fileUrl, file.fileName, order.id)
  }
  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white font-medium text-sm rounded-xl shadow-md hover:from-teal-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
>
  <span>⬇️</span>
  <span>Download & prepare order</span>
</button>



                        </div>
                      ))}
                    </div>
                  ) : (
                    // Other Shops
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
                  )}

                  <div className="mt-4 flex justify-between items-center">
                    {shopName !== "tuckshop" && (
                      <p className="font-bold text-teal-700">
                        Total: ₹{order.amount}
                      </p>
                    )}
                    {/* ✅ Show "Order Prepared" only for non-tuckshop shops */}
{/* <button
  onClick={() => handleOrderDone(order.id)}  
  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white font-semibold rounded-xl shadow-md hover:from-teal-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
>
  ✅ Order Prepared
</button> */}


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
