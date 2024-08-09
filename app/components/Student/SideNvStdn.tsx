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

const SideNvstdn: React.FC = () => {
  return (
    <aside className="col-span-1 bg-gray-800 shadow-lg p-4">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Image
          src="/img/logo.png"
          width={500}
          height={300}
          alt="logo"
          className="w-10 h-10"
        />
        <h2 className="text-lg font-semibold text-white">
          SA <span className="text-sky-500">&</span> LMS
        </h2>
      </div>
    </div>

    <nav className="flex flex-col space-y-4">
      {[
        { icon: <MdSpaceDashboard />, text: "Dashboard" },
        { icon: <IoIosSchool />, text: "My Courses" },
        { icon: <MdAssignment />, text: "Assignments" },
        { icon: <MdOutlineCalendarMonth />, text: "Time Table" },
        { icon: <IoMdSettings />, text: "Settings" },
      ].map((item, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center text-gray-300 space-x-4 hover:text-sky-500 transition"
        >
          {item.icon}
          <h3 className="text-sm font-medium">{item.text}</h3>
        </a>
      ))}
      <a
        href="#"
        className="flex items-center text-gray-300 space-x-4 hover:text-sky-500 transition mt-auto"
      >
        <MdOutlineLogout />
        <h3 className="text-sm font-medium">Logout</h3>
      </a>
    </nav>
  </aside>
  )}


  export default SideNvstdn;