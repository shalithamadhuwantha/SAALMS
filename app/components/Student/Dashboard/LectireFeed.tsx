"use client";

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
  FaBook,
} from "react-icons/fa";
import { TbBrandZoom } from "react-icons/tb";
import { RiDirectionLine } from "react-icons/ri";
import Image from "next/image";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../../root/LoadingSpinner";
import { useRouter, usePathname } from "next/navigation";
import { IoOpenOutline } from "react-icons/io5";


interface UpcomingLectureProps {
  name: string;
  code: string;
  time: string;
  lecturer: string;
  type: string;
  link: string;
}

interface ClassData {
  name: string;
  code: string;
  time: string;
  lecturer: string;
  type: string;
  link: string;
}

const LectureFeeds: React.FC = () => {
    const router = useRouter();
    const [lectureData, setLectureData] = useState<ClassData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();
  
    useEffect(() => {
      if (!session) {
        setLoading(false);
        return; // Prevent further execution if session is not available
      }
  
      const fetchLectureData = async () => {
        try {
          setLoading(true);
          const response: Response = await fetch("/api/attandace/student/feeds", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "email": session?.user?.email }),
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch lecture data");
          }
  
          const data = await response.json();
          if (!data.classData) {
            throw new Error("No class data found");
          }
  
          const fetchedLecture: ClassData = {
            name: data.classData.name,
            code: data.classData.code,
            time: data.classData.time,
            lecturer: data.classData.lessonName || "Unknown",
            type: data.classData.type,
            link: data.classData.link,
          };
  
          setLectureData(fetchedLecture);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchLectureData();
    }, [session]);
  
    if (status === "loading") {
      return <LoadingSpinner />; // Show loading spinner while session is loading
    }
  
    if (loading) {
      return <LoadingSpinner />; // Show a loading indicator
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!lectureData) {
      return <div>No lecture data available</div>;
    }
  
    return (
      <div className="card bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="card-title text-2xl font-bold mb-2 underline">Next Lecture</h2>
              <p className="text-xl font-semibold">{lectureData.name}</p>
              <p className="text-lg opacity-90">{lectureData.code}</p>
            </div>
            <div className="text-right">
              <div className="bg-white text-blue-600 rounded-full p-3 inline-block">
                {lectureData.type === "online" ? (
                  <FaVideo size={24} />
                ) : (
                  <FaMapMarkerAlt size={24} />
                )}
              </div>
              <p className="mt-2 font-medium">
                {lectureData.type === "online" ? "Online" : "On Class"}
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <p className="flex items-center">
              <FaClock className="mr-2" /> {lectureData.time}
            </p>
            <p className="flex items-center">
              <FaChalkboardTeacher className="mr-2" /> {lectureData.lecturer}
            </p>
          </div>
          <div className="card-actions justify-end mt-4">
            <button
              onClick={() => router.push(lectureData.link)}
              rel="noopener noreferrer"
              className="btn btn-primary bg-white text-blue-600 hover:bg-blue-100 border-none"
            >
              {lectureData.type === "online" ? <TbBrandZoom size={20}/> : <RiDirectionLine size={20} />}
            </button>
            <button  onClick={()=> router.push("/Student/Class/"+lectureData.code)} className="btn btn-outline btn-accent"><IoOpenOutline size={20}/> Open
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LectureFeeds;
  
