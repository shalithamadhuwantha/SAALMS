"use client"
import React from "react";
import { motion } from "framer-motion";
import {
  MdOutlineVerified,
  MdOutlineAssignment,
  MdLocationOn,
  MdVideoCall,
  MdAccessTime,
  MdClass,
  MdQrCode2,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";
import { TbCalendarClock } from "react-icons/tb";
import { FaUserCircle, FaLink } from "react-icons/fa";

const Dashboard = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  const currentLecture = {
    title: "Introduction to AI and Machine Learning",
    time: "10:00 AM - 12:00 PM",
    type: "Physical",
    location: "Room 301",
  };

  const studentProfile = {
    name: "John Doe",
    university: "Tech University",
    faculty: "School of Computing",
    department: "Computer Science"
  };

  const attendanceData = [
    { id: 1, date: currentDate, status: true },
    { id: 2, date: "2024-03-01", status: false },
    { id: 3, date: "2024-02-28", status: true },
    { id: 4, date: "2024-02-27", status: true },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {[
            { icon: <MdOutlineVerified className="text-blue-400" />, title: "Student ID", value: "ITT / 2022 / 000" },
            { icon: <MdOutlineAssignment className="text-green-400" />, title: "Lecture", value: "Introduction to AI and ML" },
            { icon: <TbCalendarClock className="text-yellow-400" />, title: "Time", value: "10.00am-12.00pm" },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 rounded-xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition duration-300"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className="text-3xl sm:text-4xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-300">{item.title}</h3>
                  <div className="text-sm sm:text-xl font-bold text-white">{item.value}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 rounded-xl p-4 sm:p-6 shadow-xl"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-indigo-300">Current Lecture</h2>
            <div className="space-y-2 sm:space-y-3">
              {[
                { icon: <MdClass />, value: currentLecture.title },
                { icon: <MdAccessTime />, value: currentLecture.time },
                { icon: <MdVideoCall />, value: currentLecture.type },
                { icon: <MdLocationOn />, value: currentLecture.location },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-2 sm:space-x-3 bg-gray-800 bg-opacity-50 p-2 sm:p-3 rounded-lg hover:bg-opacity-70 transition duration-300"
                >
                  <span className="text-indigo-400 text-lg sm:text-xl flex-shrink-0">{item.icon}</span>
                  <span className="text-sm sm:text-base font-medium">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 rounded-xl p-4 sm:p-6 shadow-xl"
          >
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-semibold px-3 sm:px-4 py-1 sm:py-2 bg-gray-800 rounded-full">Student Profile</h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 bg-gray-800 rounded-full">Status</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MdCheckCircle className="text-white text-sm sm:text-base" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <FaUserCircle className="text-gray-300 text-2xl sm:text-3xl" />
                </div>
                <div className="flex-1">
                  <p className="text-base sm:text-lg font-semibold text-white">{studentProfile.name}</p>
                  <p className="text-xs sm:text-sm text-gray-300">
                    {studentProfile.university} | {studentProfile.faculty} | {studentProfile.department}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-800 bg-opacity-50 p-3 sm:p-6 rounded-lg flex flex-col items-center justify-center">
                <MdQrCode2 className="text-3xl sm:text-5xl text-indigo-400 mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm text-gray-300">QR Code</p>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-3 sm:p-6 rounded-lg flex flex-col items-center justify-center">
                <FaLink className="text-3xl sm:text-5xl text-indigo-400 mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm text-gray-300">Link</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 rounded-xl p-4 sm:p-6 shadow-xl mt-4 sm:mt-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-300 mb-3 sm:mb-6">Attendance History</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">ID</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Date</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: item.id * 0.1 }}
                    className="border-b border-gray-700 hover:bg-gray-700 transition duration-200"
                  >
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">{item.id}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">{item.date}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      {item.status ? (
                        <MdCheckCircle className="text-green-500 text-base sm:text-xl" />
                      ) : (
                        <MdClose className="text-red-500 text-base sm:text-xl" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Dashboard;