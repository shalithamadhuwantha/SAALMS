import React from "react";
import {
   MdOutlineVerified,
   MdOutlineAssignment,
   MdLocationOn,
   MdVideoCall,
   MdAccessTime,
   MdClass,
   MdQrCodeScanner,
} from "react-icons/md";
import { TbCalendarClock } from "react-icons/tb";
import { FaUserCircle, FaLink } from "react-icons/fa";
import AuthGoogle from "../../root/AuthGoogle";



const Dashboard = () => {
   // Mocked data for the current lecture and lecturer
   const currentLecture = {
      title: "Introduction to AI and Machine Learning",
      time: "10:00 AM - 12:00 PM",
      type: "Physical", // Can be changed to "Online" as needed
      location: "Room 301", // Could be changed to "Virtual Classroom" for online lectures
   };

   const currentLecturer = {
      name: "Dr. Smith",
      subject: "AI and Machine Learning",
      attendance: 15,
      absent: 2
   };

   return (

      <AuthGoogle>
      <main className="col-span-4 p-6 bg-gray-900 text-white flex flex-col overflow-auto">

         <div className=" flex grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
               { icon: <MdOutlineVerified className="text-blue-500" />, title: "Student ID", value: "ITT / 2022 / 000" },
               { icon: <MdOutlineAssignment className="text-green-500" />, title: "Lecture", value: "Introduction to AI and Machine Learning" },
               { icon: <TbCalendarClock className="text-yellow-500" />, title: "Time", value: "10.00am-12.00pm" },
            ].map((item, index) => (
               <div key={index} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition">
                  <div className="flex items-center space-x-4 mb-2">
                     <span className="text-4xl flex-shrink-0">{item.icon}</span>
                     <div>
                        <h3 className="text-sm font-medium">{item.title}</h3>
                        <div className="text-xl font-bold">{item.value}</div>
                     </div>
                  </div>
                  <p className="text-xs text-gray-400">########</p>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-900 to-gray-800 rounded-xl p-5 hover:bg-gray-700 transition border-l-4 border-blue-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
               <h2 className="text-xl font-bold mb-3 text-blue-300">Current Lecture</h2>
               <div className="space-y-2">
                  <div className="flex items-center space-x-3 bg-gray-800 bg-opacity-50 p-2 rounded-lg">
                     <MdClass className="text-blue-400 text-xl flex-shrink-0" />
                     <span className="font-semibold">{currentLecture.title}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-800 bg-opacity-50 p-2 rounded-lg">
                     <MdAccessTime className="text-blue-400 text-xl flex-shrink-0" />
                     <span>{currentLecture.time}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-800 bg-opacity-50 p-2 rounded-lg">
                     <MdVideoCall className="text-blue-400 text-xl flex-shrink-0" />
                     <span>{currentLecture.type}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-800 bg-opacity-50 p-2 rounded-lg">
                     <MdLocationOn className="text-blue-400 text-xl flex-shrink-0" />
                     <span>{currentLecture.location}</span>
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-gray-800 rounded-xl p-5 hover:bg-gray-700 transition border-l-4 border-blue-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
               <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-blue-300">Lecturer Profile</h2>
                  <div className="flex space-x-2">
                     <button className="p-2 rounded-full hover:bg-gray-700 transition">
                        <MdQrCodeScanner className="text-white text-2xl" />
                     </button>
                     <button className="p-2 rounded-full hover:bg-gray-700 transition">
                        <FaLink className="text-white text-2xl" />
                     </button>
                  </div>
               </div>
               <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center space-x-3">
                     <FaUserCircle className="text-gray-400 text-5xl self-start mt-1" />
                     <div>
                        <p className="text-lg text-gray-300">{currentLecturer.name}</p>
                        <p className="text-sm text-gray-400">{currentLecturer.subject}</p>
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 bg-opacity-50 p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
                     <p className="text-lg text-white mb-2 text-center">Attendance count</p>
                     <p className="text-6xl font-bold text-green-500" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{currentLecturer.attendance}</p>
                  </div>
                  <div className="bg-gray-800 bg-opacity-50 p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
                     <p className="text-lg text-white mb-2 text-center">Absent count</p>
                     <p className="text-6xl font-bold text-red-500" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{currentLecturer.absent}</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition mt-auto">
            <h2 className="text-xl font-semibold mb-4">Recent Work</h2>
            <div className="overflow-x-auto">
               <table className="w-full text-left whitespace-nowrap">
                  <thead>
                     <tr className="border-b border-gray-700">
                        {/* put the sticky in to the code and that stick the colum */}
                        <th className="py-2 px-4 left-0 bg-gray-800">No.</th>
                        <th className="py-2 px-4">Course</th>
                        <th className="py-2 px-4">Course Code</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4"></th>
                     </tr>
                  </thead>
                  <tbody>
                     {Array(4).fill("").map((_, index) => (
                        <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                           {/* put the sticky in to the code and that stick the colum */}
                           <td className="py-2 px-4 left-0 bg-gray-800">0{index + 1}</td>
                           <td className="py-2 px-4">Programming</td>
                           <td className="py-2 px-4">ITT101</td>
                           <td className="py-2 px-4">
                              <span className="px-2 py-1 bg-yellow-500 text-white rounded text-sm">Pending</span>
                           </td>
                           <td className="py-2 px-4">
                              <button className="text-sky-500 hover:underline">Details</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <button className="w-full mt-4 text-sky-500 hover:underline">Show All</button>
         </div>
      </main>
      </AuthGoogle>
   );
};

export default Dashboard;