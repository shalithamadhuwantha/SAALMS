"use client"
import React, { useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuSchool } from "react-icons/lu";
import WeeklyChart from "./WeeklyChart";

const DashboardLec = () => {
   type LocationList = {
      items: string[]
   }
   // Mocked data for the current lecture and lecturer
   const [value, setValue] = useState('ICT Lab');
   const locations = [
      "ICT Lab", "Lecture A1", "Science Lab b1"
   ]

   return (
      <div className="flex overflow-hidden flex-col h-screen bg-gray-900">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
            <main className="col-span-4 p-6 bg-gray-900 text-white overflow-y flex flex-col">
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
                     <WeeklyChart />
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
};

export default DashboardLec;