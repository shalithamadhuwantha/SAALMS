import React from "react";
import Image from "next/image";
import { MdSpaceDashboard, MdOutlineCalendarMonth, MdOutlineLogout } from "react-icons/md";
import { IoIosSchool, IoMdClose, IoMdSettings } from "react-icons/io";
import { GoChecklist } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi2";
import { PiStudent } from "react-icons/pi";
import { TbDeviceAnalytics } from "react-icons/tb";

interface sidenavprops{
  onClose:()=>void
}
const SideNav: React.FC<sidenavprops> = ({onClose}) => {
  const navItems = [
    { icon: <MdSpaceDashboard className="text-2xl" />, text: "Dashboard" },
    { icon: <GoChecklist className="text-2xl" />, text: "Attendance" },
    { icon: <HiUserCircle className="text-2xl" />, text: "Classes" },
    { icon: <PiStudent className="text-2xl" />, text: "Students" },
    { icon: <TbDeviceAnalytics className="text-2xl" />, text: "Reports" },
  ];
  
  return (
    <aside className="col-span-1 relative bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl p-6 flex flex-col h-screen">
      <div className="absolute right-3 top-3">
       <button className="block md:hidden" onClick={onClose}>
        <IoMdClose className="w-8 h-8"/>
       </button>
      </div>
      <div className="flex flex-col items-center justify-center mb-10">
        
        <Image
          src="/img/logo.png"
          width={500}
          height={300}
          alt="logo"
          className="w-20 h-20 mb-3"
        />
        <h2 className="text-3xl font-bold text-white text-center">
          SA <span className="text-sky-500">&</span> LMS
        </h2>
      </div>
      <nav className="flex flex-col space-y-6 flex-grow">
        {navItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex text-gray-300 space-x-4 items-center h-12 px-4 transition rounded-xl
              hover:bg-gray-700 hover:text-sky-400 hover:scale-105 hover:shadow-lg"
          >
            <div className="text-sky-500">{item.icon}</div>
            <h3 className="text-lg font-medium">{item.text}</h3>
          </a>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-gray-700">
        <a
          href="#"
          className="flex justify-center items-center space-x-3 bg-red-600 text-white p-3 rounded-full
            hover:bg-red-700 transition shadow-md hover:shadow-lg"
        >
          <MdOutlineLogout className="text-2xl" />
          <h3 className="text-lg font-medium">Logout</h3>
        </a>
      </div>
    </aside>
  );
};

export default SideNav;