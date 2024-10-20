"use client"

import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaFolder,
  FaBell,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaVideo,
  FaClock,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaBook
} from "react-icons/fa";
import { TbBrandZoom } from "react-icons/tb";
import { RiDirectionLine } from "react-icons/ri";
import Image from "next/image";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../../root/LoadingSpinner";
import { useRouter, usePathname } from "next/navigation";


const StudentProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const [degree, setDegree] = useState<string>("");
  const [stid, setStid] = useState<string>("");
  const [stnm, setStnm] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      
        try {
          const response = await fetch("/api/student/Profilegrab", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session?.user?.email }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          // console.log(data);

          setDegree(data.university + "," + data.faculty);
          setStid(data._id); 
          setStnm(data.name); 
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching profile:", error);
        }
      
    };

    if (session?.user?.email) {
      fetchProfile();
    }
  }, [session, degree, stid , stnm]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="card bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl">
      <div className="card-body">
        <div className="flex items-center mb-4">
          <div className="avatar placeholder mr-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                <Image
                  src={session?.user?.image || "/img/logo.png"}
                  alt="User profile"
                  width={96}
                  height={96}
                  className="sm:w-24 sm:h-24 object-cover rounded-full"
                  layout="intrinsic"
                  priority
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="card-title">{stnm}</h2>
            <p className="opacity-70">Student ID: {stid}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="flex items-center">
            <FaEnvelope className="mr-2" /> {session?.user?.email}
          </p>
          <p className="flex items-center">
            <FaUser className="mr-2" /> {degree}
          </p>
        </div>
      </div>
    </div>
  );
};


export default StudentProfile;
