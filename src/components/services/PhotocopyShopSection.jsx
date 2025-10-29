// import React, { useState, useRef } from 'react';
// import { CloudUpload, FileText, Trash2 } from 'lucide-react';
// import { db } from '../../firebase';
// import { useAuth } from '../../context/AuthContext';
// import { collection, addDoc, Timestamp } from 'firebase/firestore';
// import { useNavigate, Link } from 'react-router-dom';

// const allowedTypes = [
//   'image/png',
//   'image/jpeg',
//   'application/pdf',
//   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// ];

// const PRICE_PER_FILE = 5;

// const PhotocopyShopSection = () => {
//   const [files, setFiles] = useState([]);
//   const fileInputRef = useRef(null);
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const validFiles = selectedFiles.filter(file => allowedTypes.includes(file.type));

//     if (validFiles.length !== selectedFiles.length) {
//       alert('Some files were not PNG, JPG, PDF, or DOCX and were skipped.');
//     }

//     setFiles(prev => [...prev, ...validFiles]);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     const validFiles = droppedFiles.filter(file => allowedTypes.includes(file.type));

//     if (validFiles.length !== droppedFiles.length) {
//       alert('Some files were not PNG, JPG, PDF, or DOCX and were skipped.');
//     }

//     setFiles(prev => [...prev, ...validFiles]);
//   };

//   const handleDragOver = (e) => e.preventDefault();

//   const handleRemoveFile = (index) => {
//     const updated = files.filter((_, i) => i !== index);
//     setFiles(updated);
//     if (updated.length === 0 && fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleSubmit = async () => {
//     if (files.length === 0) {
//       alert('Please upload at least one file.');
//       return;
//     }

//     const amount = files.length * PRICE_PER_FILE;

//     try {
//       const docRef = await addDoc(collection(db, 'printOrders'), {
//         email: user?.email || 'guest@example.com',
//         name: user?.displayName || 'Guest User',
//         fileNames: files.map(file => file.name),
//         fileCount: files.length,
//         createdAt: Timestamp.now(),
//         status: 'Success',
//         amount,
//       });

//       const orderData = {
//         id: docRef.id,
//         email: user?.email || 'guest@example.com',
//         name: user?.displayName || 'Guest User',
//         fileNames: files.map(file => file.name),
//         fileCount: files.length,
//         status: 'Success',
//         amount,
//         source: "printOrders",
//       };

//       navigate('/thank-you', { state: { order: orderData } });

//       setFiles([]);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     } catch (error) {
//       console.error('Error submitting print order:', error);
//       alert('Something went wrong while submitting your order.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white p-6">
//       <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-10 text-center">
//         <h2 className="text-3xl font-bold text-teal-700 mb-2">📄 Print & Photocopy Order</h2>
//         <p className="text-gray-600 mb-8">
//           Upload your documents below. We accept PNG, JPG, PDF, and DOCX files.
//         </p>

//         {/* Drop Zone */}
//         <div
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           className="w-full border-2 border-dashed border-teal-400 rounded-xl p-10 mb-6 bg-teal-50 hover:bg-teal-100 transition text-center cursor-pointer"
//         >
//           <CloudUpload className="mx-auto text-teal-600 mb-3" size={40} />
//           <p className="text-gray-600 font-medium">Drag & drop files here</p>
//           <p className="text-gray-500 text-sm mb-4">or click below to browse</p>

//           <div className="flex justify-center items-center w-full">
//             <input
//               ref={fileInputRef}
//               type="file"
//               multiple
//               accept=".png, .jpg, .jpeg, .pdf, .docx"
//               onChange={handleFileChange}
//               className="block text-sm text-gray-700
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-teal-600 file:text-white
//                 hover:file:bg-teal-700 transition"
//             />
//           </div>
//         </div>

//         {/* File List */}
//         {files.length > 0 && (
//           <div className="mb-8 text-left">
//             <h3 className="text-lg font-semibold text-gray-700 mb-3">Selected Files:</h3>
//             <ul className="space-y-2">
//               {files.map((file, index) => (
//                 <li key={index} className="bg-gray-100 flex items-center justify-between px-4 py-2 rounded-md">
//                   <div className="flex items-center gap-2 text-gray-800">
//                     <FileText size={18} className="text-teal-600" />
//                     <span className="truncate max-w-xs">{file.name}</span>
//                   </div>
//                   <button
//                     onClick={() => handleRemoveFile(index)}
//                     className="text-red-500 hover:text-red-700"
//                     title="Remove"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             onClick={handleSubmit}
//             className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-medium transition"
//           >
//             Submit for Printing (₹{files.length * PRICE_PER_FILE})
//           </button>

//           {/* View Previous Orders */}
//           <div className="mt-4">
//             <Link
//               to="/my-orders?source=printOrders"
//               className="text-teal-600 hover:underline text-sm"
//             >
//               View Previous Print Orders
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotocopyShopSection;

import React, { useState, useRef } from "react";
import { CloudUpload, FileText, Trash2 } from "lucide-react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const allowedTypes = [
  "image/png",
  "image/jpeg",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const COLOUR_PRICE = 10;
const B_W_PRICE = 3;

const PrintAndPhotocopyPage = () => {
  const [files, setFiles] = useState([]);
  const [copies, setCopies] = useState(1);
  const [colorOption, setColorOption] = useState("coloured");
  const [orientation, setOrientation] = useState("portrait");
  const [printLayout, setPrintLayout] = useState("single");
  const [pageOrder, setPageOrder] = useState("normal"); // 'normal', 'back-front', 'next-to-next'
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- File Handling ---
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );
    if (validFiles.length !== selectedFiles.length)
      alert("Some files were not supported and were skipped.");
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );
    if (validFiles.length !== droppedFiles.length)
      alert("Some files were not supported and were skipped.");
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (updated.length === 0 && fileInputRef.current)
      fileInputRef.current.value = "";
  };

  const handleDragOver = (e) => e.preventDefault();

  // --- Print Preferences ---
  const handleCopyChange = (amount) => setCopies((prev) => Math.max(1, prev + amount));
  const handleColorChange = (option) => setColorOption(option);
  const handleOrientationChange = (option) => setOrientation(option);
  const handleLayoutChange = (layout) => setPrintLayout(layout);
  const handlePageOrderChange = (option) => setPageOrder(option);

  // --- Pricing ---
  const pricePerPage = colorOption === "coloured" ? COLOUR_PRICE : B_W_PRICE;
  const totalPages = files.length || 0;
  const subtotal =
    copies *
    totalPages *
    pricePerPage *
    (printLayout === "double" ? 0.8 : 1) *
    (pageOrder === "next-to-next" ? 1.1 : 1); // small surcharge for extra handling

  

  // --- Upload to Supabase + Store in Firestore ---
const handleSubmit = async () => {
  if (files.length === 0) {
    alert("Please upload at least one file.");
    return;
  }

  try {
    setUploading(true);

    const uploadedFiles = [];

    for (const file of files) {
      const filePath = `${user?.email || "guest"}/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("pageOrders")
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL for the file
      const { data: publicUrlData } = supabase.storage
        .from("pageOrders")
        .getPublicUrl(filePath);

      uploadedFiles.push({
        fileName: file.name,
        fileUrl: publicUrlData.publicUrl,
        copies,
        colorOption,
        orientation,
        layout: printLayout === "single" ? "Single Page" : "Double Side",
      });
    }

    // Create Firestore document
    const docRef = await addDoc(collection(db, "printOrders"), {
      name: user?.displayName || "Guest User",
      email: user?.email || "guest@example.com",
      files: uploadedFiles,
      fileCount: uploadedFiles.length,
      amount: subtotal,
      createdAt: Timestamp.now(),
      status: "Success", // or "Cancelled" if user cancels
    });

    // Redirect to Thank You page
    navigate("/thank-you", {
      state: {
        order: {
          id: docRef.id,
          name: user?.displayName || "Guest User",
          email: user?.email || "guest@example.com",
          files: uploadedFiles,
          amount: subtotal,
          status: "Success",
          source: "printOrders",
        },
      },
    });

    // Reset form
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";

  } catch (error) {
    console.error("❌ Error submitting print order:", error);
    alert("Something went wrong while uploading or saving your order.");
  } finally {
    setUploading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-white flex flex-col">
        
      {/* Header */}
      <header className="p-4 bg-white shadow-md flex justify-between items-center sticky top-18 z-10">
        <h1 className="text-2xl font-bold text-teal-700 tracking-tight">
          📄 Print
        </h1>
        <Link
          to="/my-orders?source=printOrders"
          className="text-teal-600 hover:text-teal-700 font-medium text-sm"
        >
          View Orders →
        </Link>
      </header>

      {/* Upload Section */}
      <main className="flex-grow px-6 py-25 space-y-8 max-w-4xl mx-auto w-full">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-teal-400 rounded-2xl p-10 bg-white shadow-sm hover:shadow-md transition text-center cursor-pointer"
        >
          <CloudUpload className="mx-auto text-teal-600 mb-4" size={50} />
          <h3 className="text-gray-800 font-semibold mb-2">
            Drag & drop files here
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            or click below to browse from your device
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".png, .jpg, .jpeg, .pdf, .docx"
            onChange={handleFileChange}
            className="block mx-auto text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 transition"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-teal-600" /> Selected Files
            </h3>
            <ul className="space-y-3">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="bg-gray-50 hover:bg-gray-100 transition flex items-center justify-between px-4 py-2 rounded-lg border border-gray-200"
                >
                  <span className="truncate text-gray-700 max-w-xs">
                    {file.name}
                  </span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-600"
                    title="Remove"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Print Options */}
        {files.length > 0 && (
          <div className="grid gap-6">
            {/* Copies */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">
                Number of Copies
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {files.length} files selected
                </span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleCopyChange(-1)}
                    disabled={copies === 1}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                  >
                    −
                  </button>
                  <span className="font-bold text-lg w-8 text-center">
                    {copies}
                  </span>
                  <button
                    onClick={() => handleCopyChange(1)}
                    className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Color Option */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">Color Option</h3>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="colorOption"
                    value="coloured"
                    checked={colorOption === "coloured"}
                    onChange={() => handleColorChange("coloured")}
                  />
                  Coloured
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="colorOption"
                    value="blackwhite"
                    checked={colorOption === "blackwhite"}
                    onChange={() => handleColorChange("blackwhite")}
                  />
                  Black & White
                </label>
              </div>
            </div>

            {/* Orientation */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">Orientation</h3>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="orientation"
                    value="portrait"
                    checked={orientation === "portrait"}
                    onChange={() => handleOrientationChange("portrait")}
                  />
                  Portrait
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="orientation"
                    value="landscape"
                    checked={orientation === "landscape"}
                    onChange={() => handleOrientationChange("landscape")}
                  />
                  Landscape
                </label>
              </div>
            </div>

            {/* Layout */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">Layout</h3>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="layout"
                    value="single"
                    checked={printLayout === "single"}
                    onChange={() => handleLayoutChange("single")}
                  />
                  Single Page
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="layout"
                    value="double"
                    checked={printLayout === "double"}
                    onChange={() => handleLayoutChange("double")}
                  />
                  Double Side
                </label>
              </div>
            </div>

                    
          </div>
        )}
      </main>

      {/* Footer */}
      {files.length > 0 && (
        <footer className="p-5 bg-white border-t shadow-sm sticky bottom-0">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div>
              <span className="text-gray-600 font-medium">Total:</span>{" "}
              <span className="text-2xl font-bold text-teal-700">₹{subtotal}</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className={`px-8 py-3 rounded-xl shadow-md font-semibold transition ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-600 text-white hover:bg-teal-700"
              }`}
            >
              {uploading ? "Uploading..." : "Confirm & Print →"}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PrintAndPhotocopyPage;
