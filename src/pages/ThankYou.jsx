// ✅ src/pages/ThankYou.jsx

// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { CheckCircle, XCircle } from "lucide-react";
// import emailjs from "@emailjs/browser";
// import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
// import { db } from "../firebase"; // ✅ import Firestore instance
// import { XCircle } from "lucide-react"; // or whichever icon lib you use



// const statusColors = {
//   pending: "bg-yellow-100 text-yellow-800",
//   shipped: "bg-blue-100 text-blue-800",
//   delivered: "bg-green-100 text-green-800",
//   cancelled: "bg-red-100 text-red-800",
//   success: "bg-green-100 text-green-800",
// };

// const ThankYou = () => {
//   const location = useLocation();
//   const order = location.state?.order || {};
//   const navigate = useNavigate();
//   const [isCancelling, setIsCancelling] = useState(false);

//   const source = order.source || "orders"; // orders or printOrders
//   const isPrintOrder = source === "printOrders";

//   const currentDate = new Date();
//   const formattedDate = currentDate.toLocaleDateString("en-IN", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   const statusKey = order?.status?.toLowerCase() || "pending";
  

//   // ✅ Send confirmation email after placing order
//   useEffect(() => {
//     if (!order || !order.email) {
//       console.warn("⚠️ Missing order or email:", order);
//       return;
//     }

//     const emailParams = {
//       email: order.email || "guest@example.com",
//       customer_name: order.name || order.customer_name || "Customer",
//       order_id: order.id || "Unknown",
//       order_date: formattedDate,
//       status: order.status || "Pending",
//       status_class: statusKey,
//       amount:
//         typeof order.amount === "number" ? order.amount.toFixed(2) : "0.00",
//     };

//     console.log("📤 Sending order confirmation email...");
//     emailjs
//       .send(
//         "service_vpomnph",
//         "template_udv3zrh",
//         emailParams,
//         "uFMWqshSnK5ZXMCmN"
//       )
//       .then(() => console.log("✅ Order confirmation email sent"))
//       .catch((error) => console.error("❌ Email sending failed:", error));
//   }, [order, formattedDate, statusKey]);

//   // 🗑️ Handle order cancellation
//   const handleCancelOrder = async () => {
//   if (!order.id || !order.email) return alert("Invalid order data.");

//   const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
//   if (!confirmCancel) return;

//   try {
//     setIsCancelling(true);

//     // 🔍 Find the document where the 'id' field matches the order.id
//     const q = query(collection(db, source), where("id", "==", order.id));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       console.error("⚠️ No document found for this order ID:", order.id);
//       alert("Order not found in database.");
//       return;
//     }

//     // ✅ Update the first matching document
//     const docRef = querySnapshot.docs[0].ref;
//     await updateDoc(docRef, { status: "cancelled" });
//     console.log("🚫 Order marked as cancelled in Firestore.");

//     // 📩 Send cancellation email
//     const cancelParams = {
//       email: order.email,
//       customer_name: order.name || order.customer_name || "Customer",
//       order_id: order.id,
//       order_date: formattedDate,
//       amount:
//         typeof order.amount === "number"
//           ? order.amount.toFixed(2)
//           : "0.00",
//     };

//     await emailjs.send(
//       "service_vpomnph",
//       "template_vcvwcfv",
//       cancelParams,
//       "uFMWqshSnK5ZXMCmN"
//     );

//     alert("Order cancelled successfully! A confirmation email has been sent.");
//     navigate(`/my-orders?source=${isPrintOrder ? "printOrders" : "orders"}`);
//   } catch (error) {
//     console.error("❌ Error cancelling order:", error);
//     alert("Failed to cancel order. Try again later.");
//   } finally {
//     setIsCancelling(false);
//   }
// };
// const CancelButton = ({ handleCancelOrder, isCancelling }) => {
//   const [canCancel, setCanCancel] = useState(true);
//   const [countdown, setCountdown] = useState(30);

//   useEffect(() => {
//     // ⏱ Countdown timer (30 seconds)
//     if (countdown > 0 && canCancel) {
//       const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
//       return () => clearTimeout(timer);
//     }

//     // ❌ After 30 seconds
//     if (countdown === 0) setCanCancel(false);
//   }, [countdown, canCancel]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
//       <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
//         <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">
//           Thank You for Your Order!
//         </h2>
//         <p className="text-gray-600 mb-4">
//           Your order has been placed successfully. You’ll receive a confirmation email shortly.
//         </p>

//         <div className="mb-6 text-left border rounded-lg p-4 shadow-sm bg-white">
//           <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
//           <p><strong>Order ID:</strong> {order.id}</p>
//           <p><strong>Order Date:</strong> {formattedDate}</p>
//           <p><strong>Email:</strong> {order.email}</p>
//           <p>
//             <strong>Status:</strong>{" "}
//             <span
//               className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                 statusColors[statusKey] || "bg-gray-100 text-gray-800"
//               }`}
//             >
//               {order.status || "Pending"}
//             </span>
//           </p>
//           <p className="mt-2 text-2xl font-bold">
//             Amount: ₹
//             {typeof order.amount === "number"
//               ? order.amount.toFixed(2)
//               : String(order.amount) || "0.00"}
//           </p>

//           {isPrintOrder && Array.isArray(order.fileNames) && (
//             <div className="mt-4">
//               <p className="font-semibold text-gray-700 mb-1">Files:</p>
//               <ul className="list-disc list-inside text-sm text-gray-600">
//                 {order.fileNames.map((file, index) => (
//                   <li key={index}>{file}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col gap-3">
//           <Link
//             to="/"
//             className="bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition"
//           >
//             Back to Home
//           </Link>

//           <Link
//             to={`/my-orders?source=${isPrintOrder ? "printOrders" : "orders"}`}
//             className="text-teal-600 hover:underline text-sm"
//           >
//             View My {isPrintOrder ? "Print" : "Canteen"} Orders
//           </Link>

//           {/* ❌ Cancel Order Button */}
//           <button
//             onClick={handleCancelOrder}
//             disabled={isCancelling}
//             className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${
//               isCancelling
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-red-600 hover:bg-red-700 text-white"
//             }`}
//           >
//             <XCircle className="w-5 h-5" />
//             {isCancelling ? "Cancelling..." : "Cancel Order"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThankYou;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  success: "bg-green-100 text-green-800",
};

const ThankYou = () => {
  const location = useLocation();
  const order = location.state?.order || {};
  const navigate = useNavigate();

  const [isCancelling, setIsCancelling] = useState(false);
  const [canCancel, setCanCancel] = useState(true);
  const [countdown, setCountdown] = useState(30);

  const source = order.source || "orders";
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate short readable order number
  const orderNumber =
    order?.number ||
    (order?.id ? order.id.slice(-3) : Math.floor(Math.random() * 100));

  const statusKey = order?.status?.toLowerCase() || "pending";

  // Disable cancel after 30 seconds
  useEffect(() => {
    if (countdown > 0 && canCancel) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) setCanCancel(false);
  }, [countdown, canCancel]);

  // ✅ Send confirmation email (formatted safely)
  useEffect(() => {
    if (!order || !order.email) return;

    const formattedItemsHTML = Array.isArray(order.items)
  ? order.items
      .map(
        (item) => `
          <tr>
            <td>${item.name || item.itemName || "Item"}</td>
            <td>${item.qty || 1}</td>
            <td>₹${item.price || 0}</td>
          </tr>`
      )
      .join("")
  : "<tr><td colspan='3'>No items listed.</td></tr>";

const emailParams = {
  email: order.email,
  customer_name: order.name || "Customer",
  order_id: order.id,
  order_date: formattedDate,
  status: order.status || "Pending",
  amount:
    typeof order.amount === "number"
      ? order.amount.toFixed(2)
      : String(order.amount || "0.00"),
  items_html: formattedItemsHTML,
};


    console.log("📧 Sending confirmation email:", emailParams);

    emailjs
      .send(
        "service_vpomnph", // your service ID
        "template_udv3zrh", // confirmation template ID
        emailParams,
        "uFMWqshSnK5ZXMCmN" // public key
      )
      .then(() => console.log("✅ Order confirmation email sent"))
      .catch((error) => console.error("❌ Email sending failed:", error));
  }, [order, formattedDate]);

  // ❌ Handle Cancel Order
  const handleCancelOrder = async () => {
    if (!order.id || !order.email) return alert("Invalid order data.");

    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      setIsCancelling(true);
      const q = query(collection(db, source), where("id", "==", order.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Order not found in database.");
        return;
      }

      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, { status: "cancelled" });

      console.log("🚫 Order marked as cancelled in Firestore.");

      const cancelParams = {
        email: order.email,
        customer_name: order.name || "Customer",
        order_id: `#${orderNumber}`,
        order_date: formattedDate,
        amount:
          typeof order.amount === "number"
            ? order.amount.toFixed(2)
            : String(order.amount || "0.00"),
      };

      console.log("📧 Sending cancellation email:", cancelParams);

      await emailjs.send(
        "service_vpomnph",
        "template_vcvwcfv", // cancellation template ID
        cancelParams,
        "uFMWqshSnK5ZXMCmN"
      );

      alert("Order cancelled successfully! Confirmation email sent.");
      navigate(`/my-orders?source=${source}`);
    } catch (error) {
      console.error("❌ Error cancelling order:", error);
      alert("Failed to cancel order. Try again later.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Thank You for Your Order!
        </h2>
        <p className="text-gray-600 mb-4">
          Your order has been placed successfully. You’ll receive a confirmation email shortly.
        </p>

        {/* Order Summary */}
        <div className="mb-6 text-left border rounded-lg p-4 shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <p><strong>Order No.:</strong> #{orderNumber}</p>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Order Date:</strong> {formattedDate}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[statusKey] || "bg-gray-100 text-gray-800"
              }`}
            >
              {order.status || "Pending"}
            </span>
          </p>
          <p className="mt-2 text-2xl font-bold">
            Amount: ₹
            {typeof order.amount === "number"
              ? order.amount.toFixed(2)
              : String(order.amount) || "0.00"}
          </p>

          {Array.isArray(order.items) && order.items.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-gray-700 mb-1">Items:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name || item.itemName} × {item.qty || 1} — ₹
                    {item.price || 0}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition"
          >
            Back to Home
          </Link>

          <Link
            to={`/my-orders?source=${source}`}
            className="text-teal-600 hover:underline text-sm"
          >
            View My Orders
          </Link>

          {canCancel ? (
            <button
              onClick={handleCancelOrder}
              disabled={isCancelling}
              className={`flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition ${
                isCancelling
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              <XCircle className="w-5 h-5" />
              {isCancelling ? "Cancelling..." : `Cancel Order (${countdown}s left)`}
            </button>
          ) : (
            <p className="text-gray-500 text-sm italic mt-2">
              ⏱️ You won’t be able to cancel the order after 30 seconds.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
