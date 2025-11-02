// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../components/Navbar";

// // ✅ Chart.js imports (React 19–safe)
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// const OrderHistory = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("week");

//   const allowedEmails = [
//     "tiwarijishop@gmail.com",
//     "nescafe.igdtuw@gmail.com",
//     "tuckshop.igdtuw@gmail.com",
//   ];

//   const shopDetails = {
//     "tiwarijishop@gmail.com": { display: "Tiwari Ji", key: "tiwariji", collection: "orders" },
//     "nescafe.igdtuw@gmail.com": { display: "Nescafe", key: "nescafe", collection: "orders" },
//     "tuckshop.igdtuw@gmail.com": { display: "Tuckshop", key: "tuckshop", collection: "printOrders" },
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user) return;

//       const normalizedEmail = user.email.trim().toLowerCase();
//       if (!allowedEmails.includes(normalizedEmail)) {
//         alert("Unauthorized access");
//         navigate("/admin-dashboard");
//         return;
//       }

//       try {
//         setLoading(true);
//         const shopInfo = shopDetails[normalizedEmail];
//         const currentShop = shopInfo.key;
//         const collectionName = shopInfo.collection;

//         const ordersRef = collection(db, collectionName);
//         const querySnapshot = await getDocs(ordersRef);
//         const data = [];

//         querySnapshot.forEach((doc) => {
//           const order = doc.data();

//           if (collectionName === "orders") {
//             const hasShopItem =
//               order.items && order.items.some((item) => item.shopName === currentShop);

//             if (order.status === "Success" && order.prepared === true && hasShopItem) {
//               data.push({ id: doc.id, ...order });
//             }
//           } else if (collectionName === "printOrders") {
//             if (order.status === "Success") {
//               data.push({ id: doc.id, ...order });
//             }
//           }
//         });

//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [user, navigate]);

//   if (!user)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
//         Loading user info...
//       </div>
//     );

//   if (loading)
//     return (
//       <>
//         <AdminNavbar visible={true} />
//         <div className="min-h-screen flex items-center justify-center text-lg text-gray-600 pt-24">
//           Loading order history...
//         </div>
//       </>
//     );

//   const shopEmail = user.email.trim().toLowerCase();
//   const shopDisplayName = shopDetails[shopEmail]?.display || "Shop";
//   const collectionName = shopDetails[shopEmail]?.collection || "orders";

//   // ✅ Convert timestamps
//   const parsedOrders = orders.map((o) => ({
//     ...o,
//     date: o.createdAt?.toDate ? o.createdAt.toDate() : new Date(),
//   }));

//   // ✅ Filter orders based on selected time
//   const now = new Date();
//   const filteredOrders = parsedOrders.filter((order) => {
//     const diffDays = (now - order.date) / (1000 * 60 * 60 * 24);
//     if (filter === "week") return diffDays <= 7;
//     if (filter === "month") return diffDays <= 30;
//     if (filter === "year") return diffDays <= 365;
//     return true;
//   });

//   // ✅ Group by date for chart
//   const grouped = {};
//   filteredOrders.forEach((o) => {
//     const d = o.date.toLocaleDateString("en-GB");
//     if (!grouped[d]) grouped[d] = { count: 0, revenue: 0 };
//     grouped[d].count += 1;
//     if (collectionName === "orders") {
//       grouped[d].revenue += o.items
//         ?.filter((item) => item.shopName === shopDetails[shopEmail].key)
//         .reduce((sum, item) => sum + item.price * item.qty, 0);
//     } else {
//       grouped[d].revenue += o.amount || 0;
//     }
//   });

//   const chartLabels = Object.keys(grouped);
//   const orderCounts = chartLabels.map((date) => grouped[date].count);

//   // ✅ Total stats for card
//   const totalRevenue = filteredOrders.reduce((sum, o) => {
//     if (collectionName === "orders") {
//       return (
//         sum +
//         o.items
//           ?.filter((item) => item.shopName === shopDetails[shopEmail].key)
//           .reduce((subtotal, item) => subtotal + item.price * item.qty, 0)
//       );
//     } else {
//       return sum + (o.amount || 0);
//     }
//   }, 0);

//   // ✅ Chart.js data & options
//   const chartData = {
//     labels: chartLabels,
//     datasets: [
//       {
//         label: "Orders over Time",
//         data: orderCounts,
//         borderColor: "#14b8a6",
//         backgroundColor: "#99f6e4",
//         tension: 0.4,
//         fill: true,
//         pointRadius: 5,
//         pointBackgroundColor: "#0d9488",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       tooltip: { mode: "index", intersect: false },
//     },
//     scales: {
//       x: { title: { display: true, text: "Date" } },
//       y: { title: { display: true, text: "Orders Count" }, beginAtZero: true },
//     },
//   };

//   return (
//     <>
//       <AdminNavbar visible={true} />
//       <div className="p-6 bg-gradient-to-br from-teal-50 to-green-50 min-h-screen pt-24">
//         <h1 className="text-3xl font-extrabold text-center text-teal-800 mb-8">
//           ✅ Prepared Orders — {shopDisplayName}
//         </h1>

//         {/* 📈 Orders Timeline Line Chart */}
//         <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-10">
//           <h2 className="text-xl font-semibold text-center text-teal-700 mb-4">
//             📊 Orders Over Time
//           </h2>
//           {chartLabels.length > 0 ? (
//             <Line data={chartData} options={chartOptions} />
//           ) : (
//             <p className="text-center text-gray-500">No orders to display.</p>
//           )}
//         </div>

//         {/* 📋 Filter + Stats Card */}
//         <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md text-center">
//           <div className="flex justify-center gap-4 mb-4">
//             {["week", "month", "year"].map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-4 py-2 rounded-lg text-sm font-semibold ${
//                   filter === f
//                     ? "bg-teal-600 text-white"
//                     : "bg-teal-100 text-teal-700 hover:bg-teal-200"
//                 }`}
//               >
//                 {f === "week" ? "1 Week" : f === "month" ? "1 Month" : "1 Year"}
//               </button>
//             ))}
//           </div>

//           <p className="text-gray-600 mb-1">📦 Total Orders</p>
//           <h2 className="text-3xl font-bold text-teal-700">{filteredOrders.length}</h2>

//           <p className="text-gray-600 mt-4 mb-1">💰 Total Revenue</p>
//           <h2 className="text-3xl font-bold text-green-600">₹{totalRevenue}</h2>
//         </div>

//         {/* 🧾 Orders List Section */}
//         {filteredOrders.length === 0 ? (
//           <p className="text-gray-600 text-center mt-10">No prepared orders found.</p>
//         ) : (
//           <div className="max-w-3xl mx-auto mt-10">
//             {/* 🔽 Filter buttons below too */}
//             <div className="flex justify-center gap-4 mb-6">
//               {["week", "month", "year"].map((f) => (
//                 <button
//                   key={f}
//                   onClick={() => setFilter(f)}
//                   className={`px-4 py-2 rounded-lg text-sm font-semibold ${
//                     filter === f
//                       ? "bg-teal-600 text-white"
//                       : "bg-teal-100 text-teal-700 hover:bg-teal-200"
//                   }`}
//                 >
//                   {f === "week" ? "1 Week" : f === "month" ? "1 Month" : "1 Year"}
//                 </button>
//               ))}
//             </div>

//             <div className="space-y-6">
//               {filteredOrders.map((order) => (
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
//                     Customer: {order.name || "Unknown"}
//                   </p>

//                   {/* ✅ Conditional Rendering for Orders / PrintOrders */}
//                   {collectionName === "orders" ? (
//                     <div className="border-t border-gray-200 mt-3 pt-3">
//                       <p className="font-semibold mb-1">Items Ordered:</p>
//                       {order.items
//                         ?.filter(
//                           (item) =>
//                             item.shopName ===
//                             shopDetails[user.email.trim().toLowerCase()].key
//                         )
//                         .map((item, i) => (
//                           <div
//                             key={i}
//                             className="flex justify-between text-gray-700 text-sm"
//                           >
//                             <span>{item.itemName}</span>
//                             <span>
//                               ₹{item.price} × {item.qty}
//                             </span>
//                           </div>
//                         ))}
//                       <p className="mt-3 font-bold text-teal-700">
//                         Total: ₹
//                         {order.items
//                           ?.filter(
//                             (item) =>
//                               item.shopName ===
//                               shopDetails[user.email.trim().toLowerCase()].key
//                           )
//                           .reduce((sum, item) => sum + item.price * item.qty, 0)}
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="border-t border-gray-200 mt-3 pt-3">
//                       <p className="font-semibold mb-2">Files Ordered:</p>
//                       {order.files?.map((file, i) => (
//                         <div
//                           key={i}
//                           className="flex justify-between text-gray-700 text-sm"
//                         >
//                           <span>{file.fileName}</span>
//                           <span>₹{order.amount || 0}</span>
//                         </div>
//                       ))}
//                       <p className="mt-3 font-bold text-teal-700">
//                         Total: ₹{order.amount || 0}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default OrderHistory;

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/Navbar";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("week");

  const allowedEmails = [
    "tiwarijishop@gmail.com",
    "nescafe.igdtuw@gmail.com",
    "tuckshop.igdtuw@gmail.com",
  ];

  const shopDetails = {
    "tiwarijishop@gmail.com": { display: "Tiwari Ji", key: "tiwariji", collection: "orders" },
    "nescafe.igdtuw@gmail.com": { display: "Nescafe", key: "nescafe", collection: "orders" },
    "tuckshop.igdtuw@gmail.com": { display: "Tuckshop", key: "tuckshop", collection: "printOrders" },
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const normalizedEmail = user.email.trim().toLowerCase();
      if (!allowedEmails.includes(normalizedEmail)) {
        alert("Unauthorized access");
        navigate("/admin-dashboard");
        return;
      }

      try {
        setLoading(true);
        const shopInfo = shopDetails[normalizedEmail];
        const currentShop = shopInfo.key;
        const collectionName = shopInfo.collection;

        const ordersRef = collection(db, collectionName);
        const querySnapshot = await getDocs(ordersRef);
        const data = [];

        querySnapshot.forEach((doc) => {
          const order = doc.data();

          if (collectionName === "orders") {
            const hasShopItem =
              order.items && order.items.some((item) => item.shopName === currentShop);

            if (order.status === "Success" && order.prepared === true && hasShopItem) {
              data.push({ id: doc.id, ...order });
            }
          } else if (collectionName === "printOrders") {
            if (order.status === "Success") {
              data.push({ id: doc.id, ...order });
            }
          }
        });

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
        Loading user info...
      </div>
    );

  if (loading)
    return (
      <>
        <AdminNavbar visible={true} />
        <div className="min-h-screen flex items-center justify-center text-lg text-gray-600 pt-24">
          Loading order history...
        </div>
      </>
    );

  const shopEmail = user.email.trim().toLowerCase();
  const shopDisplayName = shopDetails[shopEmail]?.display || "Shop";
  const collectionName = shopDetails[shopEmail]?.collection || "orders";

  const parsedOrders = orders.map((o) => ({
    ...o,
    date: o.createdAt?.toDate ? o.createdAt.toDate() : new Date(),
  }));

  const now = new Date();
  const filteredOrders = parsedOrders.filter((order) => {
    const diffDays = (now - order.date) / (1000 * 60 * 60 * 24);
    if (filter === "week") return diffDays <= 7;
    if (filter === "month") return diffDays <= 30;
    if (filter === "year") return diffDays <= 365;
    return true;
  });

  const grouped = {};
  filteredOrders.forEach((o) => {
    const d = o.date.toLocaleDateString("en-GB");
    if (!grouped[d]) grouped[d] = { count: 0, revenue: 0 };
    grouped[d].count += 1;
    if (collectionName === "orders") {
      grouped[d].revenue += o.items
        ?.filter((item) => item.shopName === shopDetails[shopEmail].key)
        .reduce((sum, item) => sum + item.price * item.qty, 0);
    } else {
      grouped[d].revenue += o.amount || 0;
    }
  });

  const chartLabels = Object.keys(grouped);
  const orderCounts = chartLabels.map((date) => grouped[date].count);

  const totalRevenue = filteredOrders.reduce((sum, o) => {
    if (collectionName === "orders") {
      return (
        sum +
        o.items
          ?.filter((item) => item.shopName === shopDetails[shopEmail].key)
          .reduce((subtotal, item) => subtotal + item.price * item.qty, 0)
      );
    } else {
      return sum + (o.amount || 0);
    }
  }, 0);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Orders over Time",
        data: orderCounts,
        borderColor: "#14b8a6",
        backgroundColor: "#99f6e4",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#0d9488",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Orders Count" }, beginAtZero: true },
    },
  };

  return (
    <>
      <AdminNavbar visible={true} />
      <div className="p-6 bg-gradient-to-br from-teal-50 to-green-50 min-h-screen pt-24">
        <h1 className="text-3xl font-extrabold text-center text-teal-800 mb-8">
          ✅ Prepared Orders — {shopDisplayName}
        </h1>

        {/* 🔹 Chart + Revenue Card side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
  {/* 📊 Orders Over Time Chart */}
  <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
    <h2 className="text-2xl font-semibold text-center text-teal-700 mb-6 tracking-wide">
      📈 Orders Over Time
    </h2>

    {chartLabels.length > 0 ? (
      <Line data={chartData} options={chartOptions} />
    ) : (
      <p className="text-center text-gray-500 italic">
        No orders to display yet.
      </p>
    )}
  </div>



          {/* Revenue Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md text-center flex flex-col justify-center">
            <div className="flex justify-center gap-2 mb-4">
              {["week", "month", "year"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                    filter === f
                      ? "bg-teal-600 text-white"
                      : "bg-teal-100 text-teal-700 hover:bg-teal-200"
                  }`}
                >
                  {f === "week" ? "1 Week" : f === "month" ? "1 Month" : "1 Year"}
                </button>
              ))}
            </div>

            <p className="text-gray-600 mb-5 text-xl">📦 Total Orders</p>
            <h2 className="text-3xl font-bold text-teal-700">{filteredOrders.length}</h2>

            <p className="text-gray-600 mt-4 mb-1 text-xl">💰 Total Revenue</p>
            <h2 className="text-3xl font-bold text-green-600">₹{totalRevenue}</h2>
          </div>
        </div>

        {/* 🔹 Orders List below */}
        {filteredOrders.length === 0 ? (
          <p className="text-gray-600 text-center mt-1">No prepared orders found.</p>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-teal-700">Order ID: {order.id}</h2>
                  <p className="text-gray-500 text-sm">
                    {order.createdAt?.toDate?.().toLocaleString() || "—"}
                  </p>
                </div>

                <p className="text-gray-700 font-medium mb-2">
                  Customer: {order.name || "Unknown"}
                </p>

                {/* ✅ Conditional Rendering for Orders / PrintOrders */}
                {collectionName === "orders" ? (
                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <p className="font-semibold mb-1">Items Ordered:</p>
                    {order.items
                      ?.filter(
                        (item) =>
                          item.shopName === shopDetails[user.email.trim().toLowerCase()].key
                      )
                      .map((item, i) => (
                        <div key={i} className="flex justify-between text-gray-700 text-sm">
                          <span>{item.itemName}</span>
                          <span>
                            ₹{item.price} × {item.qty}
                          </span>
                        </div>
                      ))}
                    <p className="mt-3 font-bold text-teal-700">
                      Total: ₹
                      {order.items
                        ?.filter(
                          (item) =>
                            item.shopName === shopDetails[user.email.trim().toLowerCase()].key
                        )
                        .reduce((sum, item) => sum + item.price * item.qty, 0)}
                    </p>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <p className="font-semibold mb-2">Files Ordered:</p>
                    {order.files?.map((file, i) => (
                      <div key={i} className="flex justify-between text-gray-700 text-sm">
                        <span>{file.fileName}</span>
                        <span>₹{order.amount || 0}</span>
                      </div>
                    ))}
                    <p className="mt-3 font-bold text-teal-700">Total: ₹{order.amount || 0}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
