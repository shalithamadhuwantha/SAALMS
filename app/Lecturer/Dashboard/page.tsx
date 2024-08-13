"use client"
import React, { useState } from "react";
import Image from "next/image";
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
import { FaUserCircle, FaLink, FaChalkboardTeacher } from "react-icons/fa";
import SideNV from "../../components/Lecturer/SideNvLec";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuSchool } from "react-icons/lu";
import WeeklyChart from "@/app/components/Lecturer/WeeklyChart";
import { GiHamburgerMenu } from "react-icons/gi";
import {motion} from "framer-motion"

const Dashboard = () => {
    type LocationList = {
        items: string[]
    }
    // Mocked data for the current lecture and lecturer
    const [value, setValue] = useState('ICT Lab');
    const locations = [
        "ICT Lab", "Lecture A1", "Science Lab b1"
    ]
    const [SideBar,setSideBar]=useState(false)
    const openSidebar=()=>{
        setSideBar(true)
    }
    const closeSidebar=()=>{
        setSideBar(false)
    }
    return (
        <div className="flex overflow-hidden flex-col h-screen bg-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-full">
                <motion.div
                initial={{x:'-100%'}}
                animate={{x:SideBar?0:'-100%'}}
                transition={{type:"spring" ,stiffness:300,damping:30}}
                className="fixed top-0 left-0 h-full w-72 bg-gray-800 z-50 md:relative md:!translate-x-0 md:col-span-1 md:flex md:flex-col"
                >

                <SideNV onClose={closeSidebar} />
                </motion.div>
                <main className="col-span-4 p-6 bg-gray-900 text-white overflow-y flex flex-col">
                    <div className="flex justify-between items-center mb-5">
                       <button onClick={openSidebar}>
                        <GiHamburgerMenu className="block md:hidden w-8 h-8"/>
                       </button>
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
                            { icon: <FaPeopleGroup className="text-blue-500" />, title: "Total Students", value: "126" },
                            { icon: <LuSchool className="text-green-500" />, title: "Total Classes", value: "26" },
                            { icon: <FaChalkboardTeacher className="text-yellow-500" />, title: "Total Lecturers", value: "16" },
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-800 flex items-center rounded-xl px-8 py-4 hover:bg-gray-700 transition">
                                <div className="flex items-center space-x-4 mb-2">
                                    <span className="text-4xl flex-shrink-0">{item.icon}</span>
                                    <div>
                                        <h3 className="text-sm font-medium">{item.title}</h3>
                                        <div className="text-xl font-bold">{item.value}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className=" rounded-xl bg-gray-800 p-4 mb-6">
                        <div className="flex justify-center md:justify-end w-full">
                            <select className="py-1 px-5 rounded-full text-gray-400" value={value} onChange={event => setValue(event.target.value)}>
                                {locations.map((location, index) =>
                                    (<option key={index} value={location}>{location}</option>)
                                )}
                            </select>
                        </div>
                        <div className="text-lg mt-4 text-center w-full font-semibold
                        ">Weekly Attendance</div>
                        <div className="h-80 flex justify-center mt-10">
                            <WeeklyChart/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;