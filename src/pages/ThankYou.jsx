import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

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

  const source = order.source || "orders"; // orders or printOrders
  const isPrintOrder = source === "printOrders";

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const statusKey = order?.status?.toLowerCase() || "pending";

  useEffect(() => {
    if (!order || !order.email) {
      console.warn("⚠️ Missing order or email:", order);
      return;
    }

    const emailParams = {
      email: order.email || "guest@example.com",
      customer_name: order.name || order.customer_name || "Customer",
      order_id: order.id || "Unknown",
      order_date: formattedDate,
      status: order.status || "Pending",
      status_class: statusKey,
      amount:
        typeof order.amount === "number"
          ? order.amount.toFixed(2)
          : "0.00",
    };

    console.log("📤 Prepared emailParams:");
    console.table(emailParams);

    emailjs
      .send(
        "service_vpomnph",         // your EmailJS service ID
        "template_udv3zrh",        // your EmailJS template ID
        emailParams,
        "uFMWqshSnK5ZXMCmN"        // your EmailJS public key
      )
      .then(() => console.log("✅ Order confirmation email sent"))
      .catch((error) => console.error("❌ Email sending failed:", error));
  }, [order, formattedDate, statusKey]);

  if (!order?.id) {
    return (
      <p className="text-center py-8 text-gray-600">
        No order details available.
      </p>
    );
  }

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

        <div className="mb-6 text-left border rounded-lg p-4 shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
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
            Amount: ₹{typeof order.amount === "number"
              ? order.amount.toFixed(2)
              : String(order.amount) || "0.00"}
          </p>

          {/* ✅ Show files if it's a print order */}
          {isPrintOrder && Array.isArray(order.fileNames) && (
            <div className="mt-4">
              <p className="font-semibold text-gray-700 mb-1">Files:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {order.fileNames.map((file, index) => (
                  <li key={index}>{file}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition"
          >
            Back to Home
          </Link>

          {/* ✅ Conditional redirect to correct order list */}
         <Link
  to={`/my-orders?source=${isPrintOrder ? 'printOrders' : 'orders'}`}
  className="text-teal-600 hover:underline text-sm"
>
  View My {isPrintOrder ? "Print" : "Canteen"} Orders
</Link>

        </div>
      </div>
    </div>
  );
};

export default ThankYou;
