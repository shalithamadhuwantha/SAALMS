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
import { BsQrCode } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import Dashboard from "./Dashboard/NewDash";
import Settings from "./Settings/SettingsStdn";
import { LogOff } from "../root/MangeLogin";
import LoadingSpinner from "../root/LoadingSpinner";
import ClassDteails from "./class/ClassDteails";
import ScanQr from "./ScanQrpage/ScanQr";
import { signOut, useSession } from "next-auth/react";

// Define a type for the possible tab values
type TabType = "dashboard" | "settings" | "class" | "scan";

const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    setLoading(false); // Simulate loading finished
  }, []);

  useEffect(() => {
    if (pathname.includes("/Student/Dashboard")) {
      setActiveTab("dashboard");
    } else if (pathname.includes("/Student/Settings")) {
      setActiveTab("settings");
    } else if (pathname.startsWith("/Student/Class/")) {
      setActiveTab("class");
    } else if (pathname.includes("/Student/Scan")) {
      setActiveTab("scan");
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

  // Check if the current page is the Enroll page
  const isEnrollPage = pathname.startsWith("/Student/Enroll");

  // Dynamic heading based on the active tab or pathname
  const heading =
    activeTab === "class"
      ? "Class Details"
      : activeTab === "scan"
      ? "Scan QR"
      : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  // If Enroll page, return only the content without sidebar and header
  if (isEnrollPage) {
    return null; // No side navigation or header for the Enroll page
  }

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
            SA <span className="text-sky-500">&</span> LMS
          </h2>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col space-y-4 flex-grow">
          <button
            onClick={() => handleNavigation("/Student/Dashboard", "dashboard")}
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
            onClick={() => handleNavigation("/Student/Scan", "scan")}
            className={`flex items-center h-12 px-4 text-gray-300 rounded-xl transition 
              ${activeTab === "scan"
                ? "bg-gray-700 text-sky-400"
                : "hover:bg-gray-700 hover:text-sky-400 hover:scale-105 hover:shadow-lg"
              }`}
          >
            <BsQrCode className="text-sky-500 text-2xl mr-4" />
            Mark Attendace
          </button>

          <button
            onClick={() => handleNavigation("/Student/Settings", "settings")}
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
            hover:bg-red-800 transition shadow-md hover:shadow-lg hover:scale-105"
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
            {heading} {/* Dynamic heading */}
          </h2>
          <div className="flex items-center space-x-3">
            <p className="text-gray-200">Student</p>
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={session?.user?.image || "/img/logo.png"}
                width={40}
                height={40}
                alt="logo"
                className="w-8 h-8"
                onClick={() => router.push("/Student/Settings")}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {pathname.startsWith("/Student/Class/") ? (
            <ClassDteails />
          ) : activeTab === "dashboard" ? (
            <Dashboard />
          ) : activeTab === "scan" ? (
            <ScanQr />
          ) : (
            <Settings />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SideNav);
