import React from "react";
import Image from "next/image";
import {
  MdOutlineVerified,
  MdOutlineAssignment,
  MdLocationOn,
  MdVideoCall,
  MdAccessTime,
  MdClass,
} from "react-icons/md";
import { TbCalendarClock } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import SideNV from "../../components/Student/SideNvStdn";

const Dashboard = () => {
  // Mocked data for the current lecture and lecturer
  const currentLecture = {
    title: "Introduction to AI and Machine Learning",
    time: "10:00 AM - 12:00 PM",
    type: "Hybrid",
    location: "Room 301",
    progress: 45, // Percentage of lecture completed
  };

  const currentLecturer = {
    name: "Dr. Smith",
    subject: "AI and Machine Learning",
    attendance: 15,
    absent: 2
  };


  return (
    <div className="flex overflow-hidden flex-col h-screen bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-full">
        <SideNV />
        <main className="col-span-4 p-6 bg-gray-900 text-white flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="font-semibold">Hey, <b>John</b></p>
                <small className="text-gray-400">User</small>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image src="/img/logo.png" width={500} height={300} alt="logo" className="w-10 h-10" />

              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[

              { icon: <MdOutlineVerified className="text-blue-500" />, title: "Student ID", value: "ITT / 2022 / 000" },

              { icon: <MdOutlineAssignment className="text-green-500" />, title: "Assignment", value: "000" },

              { icon: <TbCalendarClock className="text-yellow-500" />, title: "Lecture", value: "000" },
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <span className="text-2xl">{item.icon}</span>
                  
                </div>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-gray-400">########</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold mb-4">Current Lecture</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MdClass className="text-blue-500 text-xl" />
                  <span>{currentLecture.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MdAccessTime className="text-blue-500 text-xl" />
                  <span>{currentLecture.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MdVideoCall className="text-blue-500 text-xl" />
                  <span>{currentLecture.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MdLocationOn className="text-blue-500 text-xl" />
                  <span>{currentLecture.location}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm mb-1">Lecture Progress</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${currentLecture.progress}%` }}></div>
                </div>
                <p className="text-right text-sm mt-1">{currentLecture.progress}%</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition">
              <h2 className="text-xl font-semibold mb-4">Lecturer Profile</h2>
              <div className="flex items-center space-x-3 mb-4">
                <FaUserCircle className="text-gray-400 text-4xl" />
                <div>
                  <p className="font-semibold text-lg">{currentLecturer.name}</p>
                  <p className="text-sm text-gray-400">{currentLecturer.subject}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Lecture Material
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                  Links
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded">
                  <p className="text-sm text-gray-400">Attendance count</p>
                  <p className="text-2xl font-bold">{currentLecturer.attendance}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded">
                  <p className="text-sm text-gray-400">Absent count</p>
                  <p className="text-2xl font-bold">{currentLecturer.absent}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition mt-auto">
            <h2 className="text-xl font-semibold mb-4">Recent Work</h2>
              {
                icon: <MdOutlineVerified />,
                title: "Student ID",
                value: "ITT / 2022 / 000",
              },
              {
                icon: <MdOutlineAssignment />,
                title: "Assignment",
                value: "000",
              },
              { icon: <TbCalendarClock />, title: "Lecture", value: "000" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 shadow-md rounded-xl p-4 hover:bg-gray-700 transition cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-sky-500">{item.icon}</span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold">{item.value}</h1>
                </div>
                <small className="text-gray-400">########</small>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 shadow-md rounded-xl p-4 hover:bg-gray-700 transition">
            <h2 className="text-lg font-semibold mb-4">Recent Work</h2>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4">No.</th>
                  <th className="py-2 px-4">Course</th>
                  <th className="py-2 px-4">Course Code</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>

                {Array(4).fill("").map((_, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-2 px-4">0{index + 1}</td>
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
            <button className="w-full mt-4 text-sky-500 hover:underline">Show All</button>

                {Array(6)
                  .fill("")
                  .map((_, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700"
                    >
                      <td className="py-2 px-4">01</td>
                      <td className="py-2 px-4">Programming</td>
                      <td className="py-2 px-4">ITT101</td>
                      <td className="py-2 px-4 text-yellow-500">Pending</td>
                      <td className="py-2 px-4">
                        <a href="#" className="text-sky-500 hover:underline">
                          Details
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <a
              href="#"
              className="block text-center text-sky-500 mt-4 hover:underline"
            >
              Show All
            </a>

          </div>
        </main>
      </div>
    </div>
  );
};


export default Dashboard;

