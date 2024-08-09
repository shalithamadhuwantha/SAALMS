import React from "react";
import Image from "next/image";
import {
  MdOutlineVerified,
  MdOutlineAssignment,
  MdSpaceDashboard,
  MdAssignment,
  MdOutlineCalendarMonth,
  MdOutlineLogout,
} from "react-icons/md";
import { IoIosSchool, IoMdSettings } from "react-icons/io";
import { TbCalendarClock } from "react-icons/tb";
import SideNV from "../../components/Student/SideNvStdn";
const Dashboard = () => {
  return (
    <div className="flex overflow-hidden flex-col h-screen bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-full">
        <SideNV />
        <main className="col-span-4 p-6 bg-gray-900 text-white">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-semibold">
                    Hey, <b>John</b>
                  </p>
                  <small className="text-gray-400">User</small>
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src="/img/logo.png"
                    width={500}
                    height={300}
                    alt="logo"
                    className="w-10 h-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              {
                icon: <MdOutlineVerified />,
                title: "Student ID",
                value: "ITT / 2022 / 000 හුත්තෝ",
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
