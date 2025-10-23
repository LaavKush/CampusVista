import React, { useState } from "react";
import campusMap from "../assets/IGDTUW map.png";

const hotspots = [
  // Hostels and Residential
  { id: 1, name: "Kaveri Hostel", top: "18%", left: "21%", info: "Kaveri Hostel and Mess.", color: "#e6194b" },
  { id: 2, name: "Krishna Hostel", top: "51%", left: "23%", info: "Krishna Hostel and Mess.", color: "#3cb44b" },
  
  // Academic Blocks
  { id: 3, name: "Dept. of Mechanical", top: "16%", left: "41%", info: "Department of Mechanical Engineering.", color: "#ffe119" },
  { id: 4, name: "Dept. of Architecture", top: "20%", left: "53%", info: "Department of Architecture.", color: "#4363d8" },
  { id: 5, name: "Dept. of Computer Science and Eng.", top: "55%", left: "37%", info: "Department of Computer Science and Engineering (CSE).", color: "#f58231" },
  { id: 6, name: "Dept. of ECE", top: "62%", left: "37%", info: "Department of Electronics and Communication Engineering (ECE).", color: "#911eb4" },
  { id: 7, name: "Dept. of Information Technology", top: "63%", left: "50%", info: "Department of Information Technology (IT).", color: "#46f0f0" },
  { id: 8, name: "COE-AI", top: "12%", left: "31%", info: "Centre of Excellence in Artificial Intelligence.", color: "#f032e6" },
  { id: 9, name: "Dept. of AI-DS", top: "58%", left: "48%", info: "Department of Artificial Intelligence and Data Science.", color: "#bcf60c" },
  { id: 10, name: "Dept. of Management", top: "60%", left: "43%", info: "Department of Management Studies (MBA).", color: "#fabebe" },
  { id: 11, name: "Dept. of ASH", top: "58%", left: "52%", info: "Department of Applied Sciences and Humanities.", color: "#008080" },
  
  // Administration & Core Services
  { id: 12, name: "Administrative Block", top: "12%", left: "53%", info: "Registrar Office, Finance, and Admissions.", color: "#e6beff" },
  { id: 13, name: "Academics Branch", top: "47%", left: "53%", info: "Academic Branch for student records and registration.", color: "#9a6324" },
  { id: 14, name: "Examination Division", top: "30%", left: "54%", info: "Examination Division for results and marksheets.", color: "#fffac8" },
  { id: 15, name: "Digital Library", top: "34%", left: "56%", info: "Digital Library, and IT Services.", color: "#800000" },
  { id: 15, name: "Library", top: "35%", left: "54%", info: "Central Library", color: "#000000" },
  { id: 16, name: "Computer Centre", top: "40%", left: "53%", info: "Computer Centre and Labs.", color: "#aaffc3" },
  { id: 17, name: "IT Services", top: "38%", left: "54%", info: "IT Services Office.", color: "#808000" },
  
  // Canteen and Utility
  { id: 18, name: "Tuck Shop", top: "44%", left: "53.5%", info: "Tuck Shop for snacks and refreshments.", color: "#ffd8b1" }, 
  { id: 19, name: "Dispensary", top: "53%", left: "56%", info: "Dispensary/Medical Facility for first aid.", color: "#000075" },
  { id: 20, name: "Nescafe", top: "19%", left: "47%", info: "Nescafe Outlet.", color: "#808080" }, 
  { id: 21, name: "Tiwari Uncle's Shop", top: "51%", left: "53%", info: "Tiwari Uncle's Canteen/Shop.", color: "#ffffff" }, 
  
  // Central Areas and Sports
  { id: 22, name: "Main Entrance", top: "30%", left: "1%", info: "Main Gate on Lothian Road side.", color: "#ffe4e1" },
  { id: 23, name: "Auditorium", top: "31%", left: "27%", info: "Main Auditorium for events.", color: "#a52a2a" },
  { id: 24, name: "Conference Hall", top: "16%", left: "50%", info: "Conference Hall.", color: "#7fff00" },
  { id: 25, name: "Seminar Hall", top: "17%", left: "56%", info: "Seminar Hall.", color: "#d2691e" },
  { id: 26, name: "Main Lawn", top: "36%", left: "37%", info: "The Central Main Lawn/Ground.", color: "#ff7f50" },
  { id: 27, name: "Gazebo", top: "6%", left: "35%", info: "Campus Gazebo/Sitting Area.", color: "#6495ed" },
  { id: 28, name: "Open Gym", top: "78%", left: "24%", info: "Open Air Gym Area.", color: "#fffacd" },
  { id: 29, name: "Basketball Court", top: "57%", left: "30%", info: "Basketball Court.", color: "#ff69b4" },
  { id: 30, name: "Badminton Court", top: "70%", left: "49%", info: "Badminton Court.", color: "#cd5c5c" },
];

export default function Map() {
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Campus Map */}
      <img
  src={campusMap}
  alt="Campus Map"
  className="w-full h-screen object-contain transition-transform duration-700"
  style={{
    transform: activeHotspot
      ? `scale(2) translate(-${activeHotspot.left}, -${activeHotspot.top})`
      : "scale(1) translate(0, 0)",
  }}
/>

      {/* Hotspots */}
    {hotspots.map((spot) => (
  <button
    key={spot.id}
    className="absolute rounded-full border-2 transition-all hover:scale-110"
    style={{
      top: spot.top,
      left: spot.left,
      width: spot.id === 1 || spot.id === 2 ? "4rem" :
             spot.id === 18 ? "1.5rem" :
             spot.id === 26 ? "6rem" : "3rem", 
      height: spot.id === 1 || spot.id === 2 ? "4rem" :
              spot.id === 18 ? "1.5rem" :
              spot.id === 26 ? "20rem" : "3rem",
      borderColor: "transparent",   
      backgroundColor: "transparent", 
    }}
    onClick={() => setActiveHotspot(spot)}
  />
))}



      {/* Popup Modal */}
      {activeHotspot && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">{activeHotspot.name}</h2>
            <p>{activeHotspot.info}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setActiveHotspot(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
