"use client"
import React, { useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuSchool } from "react-icons/lu";


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
     <>
     <p>Dahsboard </p>
     </>
   );
};

export default DashboardLec;