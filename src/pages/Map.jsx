import React, { useState } from "react";
import campusMap from "../assets/IGDTUW map.png";
import Navbar from '../components/Navbar';

const hotspots = [
  // Hostels and Residential
  { 
    id: 1, name: "Kaveri Hostel", top: "20%", left: "21%", 
    info: "Kaveri Hostel and Mess at IGDTUW provides on-campus accommodation through two women’s hostels — Krishna Hostel and Kaveri Hostel — with a combined capacity of around 500 students. These hostels offer a safe, secure, and hygienic environment that fosters learning, personal growth, and academic focus away from home. Each room is on a twin or triple-sharing basis and comes equipped with individual beds, study tables, chairs, and built-in cupboards, ensuring a comfortable and conducive living space for residents.", 
    color: "#e6194b",
    images: ["../assets/kaveri1.jpg"]
  },
  { 
    id: 2, name: "Krishna Hostel", top: "58%", left: "23%", 
    info: "IGDTUW provides on-campus accommodation through two women’s hostels — Krishna Hostel and Kaveri Hostel — with a combined capacity of around 500 students. These hostels offer a safe, secure, and hygienic environment that fosters learning, personal growth, and academic focus away from home. Each room is on a twin or triple-sharing basis and comes equipped with individual beds, study tables, chairs, and built-in cupboards, ensuring a comfortable and conducive living space for residents.", 
    color: "#3cb44b",
    images: ["../assets/krishna1.jpg"]
  },

  // Academic Blocks
  { id: 3, name: "Department of Mechanical", top: "22%", left: "41%", 
    info: "The Department of Mechanical Engineering (MAE) at IGDTUW provides students with a comprehensive curriculum in mechanical engineering. It focuses on developing technical expertise, practical skills, and innovative thinking through state-of-the-art labs, workshops, and project-based learning.", 
    color: "#ffe119", images: ["../assets/mechanical1.jpg","../assets/mechanical2.jpg"] 
  },
  { id: 4, name: "Department of Architecture", top: "27%", left: "53%", 
    info: "The Department of Architecture offers students rigorous academic training in architectural design, planning, and construction. It emphasizes creativity, sustainability, and practical exposure through studio work, model making, and field projects.", 
    color: "#4363d8", images: ["../assets/architecture1.jpg"] 
  },
  { id: 5, name: "Department of Computer Science and Engineering", top: "61%", left: "37%", 
    info: "The Department of Computer Science and Engineering (CSE) equips students with strong foundations in algorithms, programming, data structures, and software development. It promotes innovation through research, coding labs, and collaborative projects.", 
    color: "#f58231", images: ["../assets/cse1.jpg","../assets/cse2.jpg"] 
  },
  { id: 6, name: "Department of Electronics and Communication Engineering", top: "69%", left: "37%", 
    info: "The Department of Electronics and Communication Engineering (ECE) focuses on providing knowledge and hands-on experience in electronic circuits, communication systems, and embedded systems. Students engage in practical experiments and research-driven projects.", 
    color: "#911eb4", images: ["../assets/ece1.jpg","../assets/ece2.jpg"] 
  },
  { id: 7, name: "Department of Information Technology", top: "69%", left: "50%", 
    info: "The Department of Information Technology (IT) at IGDTUW develops students' expertise in software systems, networks, and data management. It combines theoretical learning with lab work, workshops, and real-world projects to enhance technical skills.", 
    color: "#46f0f0", images: ["../assets/it1.jpg","../assets/it2.jpg"] 
  },
  { id: 8, name: "Centre of Excellence and Artificial Intelligence", top: "16%", left: "31%", 
    info: "The Centre of Excellence in Artificial Intelligence (COE-AI) provides cutting-edge research and training in AI technologies. It facilitates student projects, industry collaborations, and innovation in machine learning, robotics, and data science.", 
    color: "#f032e6", images: ["../assets/coeai1.jpg","../assets/coeai2.jpg"] 
  },
  { id: 9, name: "Department of Artificial Intelligence and Data Science", top: "64%", left: "48%", 
    info: "The Department of Artificial Intelligence and Data Science (AI-DS) focuses on equipping students with skills in AI, data analytics, and computational modeling. It emphasizes practical learning, research, and hands-on projects to develop industry-ready professionals.", 
    color: "#bcf60c", images: ["../assets/aids1.jpg","../assets/aids2.jpg"] 
  },
  { id: 10, name: "Department of Management", top: "67%", left: "43%", 
    info: "The Department of Management Studies (MBA) provides students with knowledge in business management, leadership, and entrepreneurship. It emphasizes case studies, internships, and practical exposure to prepare students for corporate and entrepreneurial careers.", 
    color: "#fabebe", images: ["../assets/mba1.jpg","../assets/mba2.jpg"] 
  },
  { id: 11, name: "Department of Applied Science and Humanities", top: "64%", left: "53%", 
    info: "The Department of Applied Sciences and Humanities (ASH) offers foundational knowledge in mathematics, physics, chemistry, and communication skills. It supports students’ overall academic growth and equips them with essential skills for engineering and technology disciplines.", 
    color: "#008080", images: ["../assets/ash1.jpg","../assets/ash2.jpg"] 
  },

  // Administration & Core Services
  { id: 12, name: "Administrative Block", top: "20%", left: "53%", 
    info: "The Administrative Block at IGDTUW serves as the central hub for managing the University’s administrative and operational functions. It houses key offices, including those of the Vice Chancellor, Registrar, Finance, Accounts, and other administrative departments. The block ensures efficient coordination among various sections of the University, handling tasks related to governance, finance, human resources, and general administration. It plays a vital role in maintaining smooth institutional functioning and supporting academic and infrastructural growth through effective management and decision-making.", 
    color: "#e6beff", images: ["../assets/admin1.jpg","../assets/admin2.jpg"] 
  },
  { id: 13, name: "Academics Branch", top: "53%", left: "53%", 
    info: "The Academics Branch at IGDTUW oversees all academic activities of the University, including curriculum design, program implementation, and maintenance of academic standards across various departments. It ensures smooth conduct of teaching schedules, registration of courses, maintenance of student academic records, and coordination between faculty and departments. The branch also facilitates academic planning, introduction of new courses, and adherence to the University’s academic policies, ensuring an enriching and structured learning experience for students.", 
    color: "#9a6324", images: ["../assets/academics1.jpg","../assets/academics2.jpg"] 
  },
  { id: 14, name: "Examination Division", top: "38%", left: "54%", 
    info: "The Examination Division at IGDTUW is responsible for the smooth conduct and management of all academic assessments, including mid-semester tests, end-term examinations, and evaluation processes. It ensures transparency, accuracy, and fairness in the assessment system while maintaining confidentiality of student records and results. The division also handles activities such as schedule preparation, result declaration, re-evaluation, and issuance of transcripts and degrees, thereby upholding the academic integrity and standards of the University.", 
    color: "#fffac8", images: ["../assets/exam1.jpg","../assets/exam2.jpg"] 
  },
  { id: 15, name: "Digital Library", top: "40%", left: "56%", 
    info: "The Digital Library at IGDTUW provides students and faculty with seamless access to a vast collection of e-books, research papers, journals, and online databases. It complements the central library by offering digital resources that support learning, research, and innovation. Equipped with high-speed internet and modern computer systems, the Digital Library ensures that users can efficiently explore academic content, conduct literature reviews, and stay updated with the latest advancements across various disciplines.", 
    color: "#800000", images: ["../assets/digitallibrary1.jpg","../assets/digitallibrary2.jpg"] 
  },
  { id: 16, name: "Library", top: "41%", left: "54%", 
    info: "Learning Resource Centre (LRC) serves as the premier source of academic information for the IGDTUW community through its collections, educational and consulting services. The LRC has a highly selective collection of print, electronic, and audiovisual materials in the areas of science, engineering, technology and management to support the learning and research activities of students and faculty. A number of e- journals are being subscribed through consortia mode subscription. All these journals are available online to the members of the LRC in campus LAN. The Digital Library section has e-materials like CDs, DVDs and digital thesis of final year students and are available through an Open Source Institution Repository Software within the campus premises. Library is functional 24x7 in university campus.", 
    color: "#000000", images: ["../assets/library1.jpg","../assets/library2.jpg"] 
  },
  { id: 17, name: "Computer Centre", top: "46%", left: "53%", 
    info: "The university’s Computer Center, a fully air-conditioned facility operational 24x7, serves as the central hub for on-campus computing. It is equipped with newly procured HP 8000 SFF series systems featuring Intel Core i5-650 3.2 GHz processors, 4GB RAM, and 320GB hard drives. Each system supports dual-boot functionality, offering both Windows 7 Professional Edition and Ubuntu 10.04 (LTS) for flexibility across platforms. The center provides a robust and modern computing environment, fostering academic and research excellence for students.", 
    color: "#aaffc3", images: ["../assets/computercenter1.jpg","../assets/computercenter2.jpg"] 
  },

  // Canteen and Utility
  { id: 18, name: "Tuck Shop", top: "52%", left: "54%", 
    info: "The IGDTUW campus has a well-equipped tuck shop that caters to the daily needs of students. It provides a wide range of stationery items, printing and scanning facilities (both colored and black & white), as well as spiral binding services. The shop ensures that students have easy access to essential academic supplies and printing resources within the campus, saving time and effort while supporting their academic and project work efficiently.", 
    color: "#ffd8b1", images: ["../assets/tuckshop1.jpg","../assets/tuckshop2.jpg"] 
  },
  { id: 19, name: "Dispensary", top: "59%", left: "56%", 
    info: "The university dispensary was established to provide primary healthcare and first aid to students. It is well-equipped with over-the-counter medications, resting beds, medical equipment, physical screening tools, and first aid supplies. A registered nurse is available from 9:00 a.m. to 5:00 p.m. daily to attend to medical needs. The dispensary also has essential emergency facilities such as oxygen, a nebulizer, and minor surgical equipment. For university employees, since they receive a fixed medical allowance for OPD care and reimbursement for IPD treatment, only one over-the-counter medicine is provided in emergency cases.", 
    color: "#000075", images: ["../assets/dispensary1.jpg","../assets/dispensary2.jpg"] 
  },
  { id: 20, name: "Nescafe", top: "25%", left: "47%", 
    info: "The IGDTUW campus features a Nescafé outlet that serves as a convenient spot for students and staff to grab coffee and refreshments. It provides a comfortable and accessible place on campus for quick breaks, informal meetings, and social interactions, helping the university community stay energized and connected throughout the day.", 
    color: "#808080", images: ["../assets/nescafe1.jpg","../assets/nescafe2.jpg"] 
  },
  { id: 21, name: "Tiwari Uncle's Shop", top: "58%", left: "53%", 
    info: "Tiwari Uncle's Shop on the IGDTUW campus offers a variety of food items, along with tea and coffee, catering to students and staff looking for quick snacks and refreshments. It serves as a popular spot for casual gatherings and provides an accessible option for on-campus dining.", 
    color: "#ffffff", images: ["../assets/tiwari1.jpg","../assets/tiwari2.jpg"] 
  },

  // Central Areas and Sports
  { id: 22, name: "Main Entrance", top: "37%", left: "17%", 
    info: "The Main Entrance of IGDTUW, located on the Lothian Road side, serves as the primary gateway to the campus. It is designed to welcome students, faculty, and visitors, providing a safe and secure access point with clear signage and proper security arrangements.", 
    color: "#ffe4e1", images: ["../assets/mainentrance1.jpg","../assets/mainentrance2.jpg"] 
  },
  { id: 23, name: "Auditorium", top: "37%", left: "27%", 
    info: "The Auditorium is the central venue for academic events, cultural programs, seminars, and large gatherings. Equipped with modern seating, lighting, and acoustics, it serves as the hub for presentations, workshops, and celebrations within the university.", 
    color: "#a52a2a", images: ["../assets/auditorium1.jpg","../assets/auditorium2.jpg"] 
  },
  { id: 24, name: "Conference Hall", top: "22%", left: "50%", 
    info: "The Conference Hall is used for formal meetings, seminars, and professional discussions. It is equipped with projection facilities, sound systems, and seating arrangements to accommodate faculty, staff, and guest speakers for various events and presentations.", 
    color: "#7fff00", images: ["../assets/conference1.jpg","../assets/conference2.jpg"] 
  },
  { id: 25, name: "Seminar Hall", top: "23%", left: "56%", 
    info: "The Seminar Hall provides a dedicated space for smaller academic sessions, student presentations, and interactive workshops. It is designed to facilitate focused discussions and learning experiences in a comfortable environment.", 
    color: "#d2691e", images: ["../assets/seminar1.jpg","../assets/seminar2.jpg"] 
  },
  { id: 26, name: "Main Lawn", top: "36%", left: "37%", 
    info: "The Main Lawn is the central green area of the campus, serving as a gathering space for students and staff. It provides an open, scenic environment for recreation, outdoor activities, and informal events amidst lush greenery.", 
    color: "#ff7f50", images: ["../assets/mainlawn1.jpg","../assets/mainlawn2.jpg"] 
  },
  { id: 27, name: "Gazebo", top: "12%", left: "35%", 
    info: "The Campus Gazebo is a designated sitting and relaxation area for students. It offers a peaceful outdoor space where students can socialize, study, or take a break while enjoying the fresh air and campus views.", 
    color: "#6495ed", images: ["../assets/gazebo1.jpg","../assets/gazebo2.jpg"] 
  },
  { id: 28, name: "Open Gym", top: "84%", left: "24%", 
    info: "The Open Gym is an outdoor fitness area that provides students and staff with access to exercise equipment and space for physical workouts. It promotes health and wellness through convenient, open-air exercise opportunities.", 
    color: "#fffacd", images: ["../assets/opengym1.jpg","../assets/opengym2.jpg"] 
  },
  { id: 29, name: "Basketball Court", top: "63%", left: "30%", 
    info: "The Basketball Court is a dedicated sports facility for students to play basketball and engage in physical activity. It encourages teamwork, fitness, and recreational engagement within the campus community.", 
    color: "#ff69b4", images: ["../assets/basketball1.jpg","../assets/basketball2.jpg"] 
  },
  { id: 30, name: "Badminton Court", top: "77%", left: "49%", 
    info: "The Badminton Court offers students a venue for recreational and competitive badminton games. It supports physical fitness, social interaction, and campus sports events, enhancing the overall student experience.", 
    color: "#cd5c5c", images: ["../assets/badminton1.jpg","../assets/badminton2.jpg"] 
  }
];

export default function Map() {
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
    <Navbar visible={true} />
      {/* Campus Map */}
      <br></br>
      <br></br>
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
              spot.id === 26 ? "10rem" : "3rem",
      borderColor: spot.color,   
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
