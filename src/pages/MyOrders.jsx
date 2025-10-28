// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   getDocs,
// } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "../components/Navbar";
// import { useLocation } from "react-router-dom";

// const statusColors = {
//   pending: "bg-yellow-100 text-yellow-800",
//   shipped: "bg-blue-100 text-blue-800",
//   delivered: "bg-green-100 text-green-800",
//   cancelled: "bg-red-100 text-red-800",
//   success: "bg-green-100 text-green-800",
// };

// const MyOrders = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const sourceFromURL = searchParams.get("source");
//   const source = location.state?.source || sourceFromURL || "orders";

//   const { user } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const formattedDate = new Date().toLocaleDateString("en-IN", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   useEffect(() => {
//   const fetchOrders = async () => {
//     if (!user?.email) {
//       setLoading(false);
//       return;
//     }

//     try {
//       let q;

//       // If using a collection that has 'createdAt', use orderBy
//       if (source === "orders") {
//         q = query(
//           collection(db, source),
//           where("email", "==", user.email),
//           orderBy("createdAt", "desc")
//         );
//       } else {
//         // Skip ordering if collection doesn't use createdAt
//         q = query(
//           collection(db, source),
//           where("email", "==", user.email)
//         );
//       }

//       const snapshot = await getDocs(q);
//       const fetchedOrders = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setOrders(fetchedOrders);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setError("Failed to load orders. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchOrders();
// }, [user, source]);


//   if (loading) {
//     return (
//       <>
//         <Navbar visible={true} />
//         <p className="text-center py-8 text-gray-600">Loading orders...</p>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Navbar visible={true} />
//         <p className="text-center py-8 text-red-600 font-semibold">{error}</p>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar visible={true} />
//       <div className="max-w-5xl mx-auto px-4 py-30">
//         <h1 className="text-4xl font-extrabold text-[#13524D] mb-2 border-b-2 border-[#3fb5ac] pb-3">
//           My {source === "printOrders" ? "Print Orders" : "Orders"}
//         </h1>

//         {orders.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">No orders found.</p>
//         ) : (
//           <div className="space-y-8 mt-6">
//             {orders.map((order) => {
//               const statusKey = order.status?.toLowerCase() || "pending";

//               return (
//                 <div
//                   key={order.id}
//                   className="border rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 bg-white"
//                 >
//                   <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       {order.name || order.customer_name || `Order #${order.id}`}
//                     </h2>
//                     <span
//                       className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                         statusColors[statusKey] || "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {order.status || "Pending"}
//                     </span>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 text-sm mb-6">
//                     <div>
//                       <p className="font-semibold mb-1">Order ID</p>
//                       <p>{order.id}</p>
//                     </div>
//                     <div>
//                       <p className="font-semibold mb-1">Order Date</p>
//                       <p>{formattedDate}</p>
//                     </div>
//                     <div>
//                       <p className="font-semibold mb-1">Email</p>
//                       <p>{order.email}</p>
//                     </div>
//                   </div>

//                   <div className="text-right text-2xl font-bold text-gray-900">
//                     ₹{Number(order.amount || 0).toFixed(2)}
//                   </div>

//                   {source === "printOrders" && order.fileNames && (
//                     <div className="mt-4">
//                       <p className="font-semibold text-gray-700 mb-1">Files:</p>
//                       <ul className="list-disc list-inside text-sm text-gray-600">
//                         {order.fileNames.map((file, i) => (
//                           <li key={i}>{file}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MyOrders;

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  success: "bg-green-100 text-green-800",
};

const MyOrders = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sourceFromURL = searchParams.get("source");
  const source = location.state?.source || sourceFromURL || "orders";

  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const collectionName =
          source === "printOrders" ? "printOrders" : "orders";

        // 🔹 Query by email, ordered by createdAt if available
        let q;
        try {
          q = query(
            collection(db, collectionName),
            where("email", "==", user.email),
            orderBy("createdAt", "desc")
          );
        } catch {
          q = query(collection(db, collectionName), where("email", "==", user.email));
        }

        const snapshot = await getDocs(q);
        const fetchedOrders = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            status: data.status?.trim()?.toLowerCase() || "pending",
          };
        });

        // 🕵️‍♀️ Debug — see what statuses are coming
        console.log(
          "Fetched orders:",
          fetchedOrders.map((o) => ({ id: o.id, status: o.status }))
        );

        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, source]);

  if (loading)
    return (
      <>
        <Navbar visible={true} />
        <p className="text-center py-8 text-gray-600">Loading orders...</p>
      </>
    );

  if (error)
    return (
      <>
        <Navbar visible={true} />
        <p className="text-center py-8 text-red-600 font-semibold">{error}</p>
      </>
    );

  return (
    <>
      <Navbar visible={true} />
      <div className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-extrabold text-[#13524D] mb-2 border-b-2 border-[#3fb5ac] pb-3">
          My {source === "printOrders" ? "Print Orders" : "Orders"}
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No orders found.
          </p>
        ) : (
          <div className="space-y-8 mt-6">
            {orders.map((order) => {
              const statusKey = order.status || "pending";
              const colorClass =
                statusColors[statusKey] || "bg-gray-100 text-gray-800";

              return (
                <div
                  key={order.id}
                  className="border rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 bg-white"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {order.name || order.customer_name || `Order #${order.id}`}
                    </h2>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 text-sm mb-6">
                    <div>
                      <p className="font-semibold mb-1">Order ID</p>
                      <p>{order.id}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Order Date</p>
                      <p>
                        {order.createdAt
                          ? new Date(
                              order.createdAt.seconds * 1000
                            ).toLocaleString("en-IN")
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p>{order.email}</p>
                    </div>
                  </div>

                  <div className="text-right text-2xl font-bold text-gray-900">
                    ₹{Number(order.amount || 0).toFixed(2)}
                  </div>

                  {/* Print Files */}
                  {source === "printOrders" && order.fileNames && (
                    <div className="mt-4">
                      <p className="font-semibold text-gray-700 mb-1">Files:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {order.fileNames.map((file, i) => (
                          <li key={i}>{file}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrders;
