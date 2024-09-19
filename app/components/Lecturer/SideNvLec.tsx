"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  MdSpaceDashboard,
  MdOutlineLogout,
  MdClose,
  MdOutlineMenu,
} from "react-icons/md";
import { IoIosSettings, IoMdPerson } from "react-icons/io";
// import DashboardLec from "./Dashboard/DashLec";

import StudentsLec from "./Students/StudentsLec";
import SettingsLec from "./Settings/SettingsLec";
import { LogOff } from "../root/MangeLogin";
import LoadingSpinner from "../root/LoadingSpinner";
import StudentDashboard from "./Dashboard/DashFirst";

// Define a type for the possible tab values
type TabType = "dashboard" | "students" | "settings";

const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Simulate loading finished
  }, []);

  useEffect(() => {
    if (pathname.includes("/Lecturer/Dashboard")) {
      setActiveTab("dashboard");
    } else if (pathname.includes("/Lecturer/Students")) {
      setActiveTab("students");
    } else if (pathname.includes("/Lecturer/Settings")) {
      setActiveTab("settings");
    }
  }, [pathname]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path: string, tab: TabType) => {
    router.push(path);
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-900">
      {loading && <LoadingSpinner />}
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 p-6 z-50 shadow-xl transition-transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:block md:w-64 md:z-auto`}
      >
        {/* Sidebar header */}
        <div className="flex flex-col items-center justify-center mb-10">
          <button className="md:hidden ml-auto" onClick={handleSidebarToggle}>
            <MdClose className="text-gray-200 text-2xl" />
          </button>
          <Image src="/img/logo.png" alt="Logo" width={50} height={50} className="mr-4" />
          <h2 className="text-2xl font-bold text-white">
            {" "}
            SA <span className="text-sky-500">&</span> LMS{" "}
          </h2>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col space-y-4 flex-grow">
          <button
            onClick={() => handleNavigation("/Lecturer/Dashboard", "dashboard")}
            className={`flex items-center h-12 px-4 text-gray-300 rounded-xl transition 
              ${activeTab === "dashboard"
                ? "bg-gray-700 text-sky-400"
                : "hover:bg-gray-700 hover:text-sky-400 hover:scale-105 hover:shadow-lg"
              }`}
          >
            <MdSpaceDashboard className="text-sky-500 text-2xl mr-4" />
            Dashboard
          </button>

          <button
            onClick={() => handleNavigation("/Lecturer/Students", "students")}
            className={`flex items-center h-12 px-4 text-gray-300 rounded-xl transition 
              ${activeTab === "students"
                ? "bg-gray-700 text-sky-400"
                : "hover:bg-gray-700 hover:text-sky-400 hover:scale-105 hover:shadow-lg"
              }`}
          >
            <IoMdPerson className="text-sky-500 text-2xl mr-4" />
            Students
          </button>

          <button
            onClick={() => handleNavigation("/Lecturer/Settings", "settings")}
            className={`flex items-center h-12 px-4 text-gray-300 rounded-xl transition 
              ${activeTab === "settings"
                ? "bg-gray-700 text-sky-400"
                : "hover:bg-gray-700 hover:text-sky-400 hover:scale-105 hover:shadow-lg"
              }`}
          >
            <IoIosSettings className="text-sky-500 text-2xl mr-4" />
            Settings
          </button>
        </nav>

        {/* Logout button */}
        <div className="pt-6 border-t border-gray-700 w-5/6 absolute inset-x-0 bottom-5 ml-4">
          <button
            className="flex justify-center items-center bg-red-600 text-white p-3 rounded-full w-full
            hover:bg-red-800 transition shadow-md hover:shadow-lg hover:scale-105 "
            onClick={LogOff}
          >
            <MdOutlineLogout className="text-2xl mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <button className="md:hidden" onClick={handleSidebarToggle}>
            <MdOutlineMenu className="text-gray-200 text-2xl" />
          </button>
          <h2 className="text-2xl font-bold text-white">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="flex items-center space-x-3">
            <p className="text-gray-200">John</p>
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image src="/img/logo.png" width={40} height={40} alt="logo" className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === "dashboard" && <StudentDashboard />}
          {activeTab === "students" && <StudentsLec />}
          {activeTab === "settings" && <SettingsLec />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SideNav);
