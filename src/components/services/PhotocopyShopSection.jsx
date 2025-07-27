import React, { useState, useRef } from 'react';
import { CloudUpload, FileText, Trash2 } from 'lucide-react';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const allowedTypes = [
  'image/png',
  'image/jpeg',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const PRICE_PER_FILE = 5;

const PhotocopyShopSection = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => allowedTypes.includes(file.type));

    if (validFiles.length !== selectedFiles.length) {
      alert('Some files were not PNG, JPG, PDF, or DOCX and were skipped.');
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => allowedTypes.includes(file.type));

    if (validFiles.length !== droppedFiles.length) {
      alert('Some files were not PNG, JPG, PDF, or DOCX and were skipped.');
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (updated.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert('Please upload at least one file.');
      return;
    }

    const amount = files.length * PRICE_PER_FILE;

    try {
      const docRef = await addDoc(collection(db, 'printOrders'), {
        email: user?.email || 'guest@example.com',
        name: user?.displayName || 'Guest User',
        fileNames: files.map(file => file.name),
        fileCount: files.length,
        createdAt: Timestamp.now(),
        status: 'Success',
        amount,
      });

      const orderData = {
        id: docRef.id,
        email: user?.email || 'guest@example.com',
        name: user?.displayName || 'Guest User',
        fileNames: files.map(file => file.name),
        fileCount: files.length,
        status: 'Success',
        amount,
        source: "printOrders",
      };

      navigate('/thank-you', { state: { order: orderData } });

      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error submitting print order:', error);
      alert('Something went wrong while submitting your order.');
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center text-teal-700 mb-2">📄 Print & Photocopy Order</h2>
      <p className="text-center text-gray-600 mb-8">
        Upload your documents below. We accept PNG, JPG, PDF, and DOCX files.
      </p>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-[90%] max-w-3xl mx-auto border-2 border-dashed border-teal-400 rounded-xl p-10 mb-6 bg-teal-50 hover:bg-teal-100 transition text-center cursor-pointer"
      >
        <CloudUpload className="mx-auto text-teal-600 mb-3" size={40} />
        <p className="text-gray-600 font-medium">Drag & drop files here</p>
        <p className="text-gray-500 text-sm mb-4">or click below to browse</p>

        <div className="flex justify-center items-center w-full">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".png, .jpg, .jpeg, .pdf, .docx"
            onChange={handleFileChange}
            className="block text-sm text-gray-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-teal-600 file:text-white
              hover:file:bg-teal-700 transition"
          />
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Selected Files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="bg-gray-100 flex items-center justify-between px-4 py-2 rounded-md">
                <div className="flex items-center gap-2 text-gray-800">
                  <FileText size={18} className="text-teal-600" />
                  <span className="truncate max-w-xs">{file.name}</span>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-medium transition"
        >
          Submit for Printing (₹{files.length * PRICE_PER_FILE})
        </button>

        {/* View Previous Orders */}
        <div className="mt-4">
          <Link
            to="/my-orders?source=printOrders"
            className="text-teal-600 hover:underline text-sm"
          >
            View Previous Print Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PhotocopyShopSection;
