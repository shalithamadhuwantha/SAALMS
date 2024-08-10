import React from "react";
import Image from "next/image";
import {

  MdSpaceDashboard,
  MdOutlineCalendarMonth,
  MdOutlineLogout,
} from "react-icons/md";
import { IoIosSchool, IoMdSettings } from "react-icons/io";

const SideNvstdn: React.FC = () => {
  const navItems = [
    { icon: <MdSpaceDashboard />, text: "Dashboard" },
    { icon: <IoIosSchool />, text: "My Courses" },
    { icon: <MdOutlineCalendarMonth />, text: "Time Table" },
    { icon: <IoMdSettings />, text: "Settings" },
  ];

  return (
    <aside className="col-span-1 bg-gray-800 shadow-lg p-4 flex flex-col h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Image
            src="/img/logo.png"
            width={500}
            height={300}
            alt="logo"
            className="w-10 h-10"
          />
          <h2 className="text-3xl font-semibold text-white">
            SA <span className="text-sky-500">&</span> LMS
          </h2>
        </div>
      </div>
      <nav className="flex flex-col space-y-6 flex-grow mt-8">
        {navItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex text-gray-300 space-x-4 items-center h-8 transition rounded-xl transform
              transition duration-500 ease-in-out hover:-translate-y-1 hover:text-sky-500 hover:scale-110"
            style={{ paddingLeft: "20px" }}
          >
            {item.icon}
            <h3 className="text-lg font-xl">{item.text}</h3>
          </a>
        ))}
      </nav>
      <div className="mt-auto">
        <a
          href="#"
          className="flex justify-center items-center space-x-4 bg-red-600 text-white p-2 rounded-md
            hover:bg-red-700 transition"
        >
          <MdOutlineLogout />
          <h3 className="text-lg font-lg">Logout</h3>
        </a>
      </div>
    </aside>
  );
};

export default SideNvstdn;
