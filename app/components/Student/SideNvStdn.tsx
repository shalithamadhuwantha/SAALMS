"use client";

import { useState } from 'react';
import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import {
  MdSpaceDashboard,
  MdOutlineLogout,
  MdClose,
  MdOutlineMenu
} from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import Dashboard from './Dashboard/DashStdn';


// Define a type for the possible tab values
type TabType = 'dashboard' | 'courses' | 'Time Table' | 'settings';

const SideNav = () => {

  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-900">
      {/* Sidebar code */}
      <div className={`fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 p-6 z-50 shadow-xl transition-transform 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:block md:w-64 md:z-auto`}>

        {/* This is for sidebar top profile */}
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

        {/* This is the sidebar items */}
        <nav className="flex flex-col space-y-4 flex-grow">
          <button
            className={`flex items-center h-12 px-4 text-gray-300 rounded-xl transition 
                     ${activeTab === 'dashboard' ? 'bg-gray-700 text-sky-400' : 'hover:bg-gray-700 hover:text-sky-400 hover:scale-105 hover:shadow-lg'}`}
            onClick={() => router.push('/Student/Dashboard')}
          >
            <MdSpaceDashboard className='text-sky-500 text-2xl mr-4' />
            Dashboard
          </button>

          <button
            className={`flex items-center h-12 px-4 text-gray-300 rounded-xl transition 
                     ${activeTab === "settings"
                ? "bg-gray-700 text-sky-400"
                : "hover:bg-gray-700 hover:text-sky-400 hover:scale-105 hover:shadow-lg"
              }`}
            onClick={() => router.push("/Student/Settings")}
          >
            <IoIosSettings className="text-sky-500 text-2xl mr-4" />
            Settings
          </button>
        </nav>
        <div className="pt-6 border-t border-gray-700 w-5/6 absolute inset-x-0 bottom-5 ml-4">
          <button
            className="flex justify-center items-center bg-red-600 text-white p-3 rounded-full w-full
                  hover:bg-red-800 transition shadow-md hover:shadow-lg hover:scale-105 "
          >
            <MdOutlineLogout className="text-2xl mr-2" />
            Logout
          </button>
        </div>
      </div>


      {/* Right side content in here */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* This is for right side top components */}
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <button className="md:hidden" onClick={handleSidebarToggle}>
            <MdOutlineMenu className='text-gray-200 text-2xl' />
          </button>
          <h2 className="text-2xl font-bold text-white">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <div className="flex items-center space-x-3">
            <p className="text-gray-200">John</p>
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image src="/img/logo.png" width={40} height={40} alt="logo" className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* call the content in here */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'courses' && <div className="p-4 text-white">Courses Content</div>}
          {activeTab === 'Time Table' && <div className="p-4 text-white">Time Table Content</div>}
          {activeTab === 'settings' && <div className="p-4 text-white">Settings Content</div>}
        </div>
      </div>
    </div>
  );
};

// export default React.memo(SideNav);
export default SideNav;