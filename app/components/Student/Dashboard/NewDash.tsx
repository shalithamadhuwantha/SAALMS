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
  FaBook
} from "react-icons/fa";
import { TbBrandZoom } from "react-icons/tb";
import { RiDirectionLine } from "react-icons/ri";
import Image from "next/image";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../../root/LoadingSpinner";
import { useRouter, usePathname } from "next/navigation";
import StudentProfile from "./StudentProfile";
import LectureFeeds from "./LectireFeed";

// Define the Class interface
interface ClassItem {
  id: number;
  code: string;
  name: string;
  lecturerName: string;
  batch: string;
  lessonName: string;
  date: string;
  time: string;
  type: string;
  lecturerImage: string;
  color: string; // You can adjust this if you have a specific set of colors
}

// Define the API response interface
interface ApiResponse {
  message: string;
  email: string;
  classes: ClassItem[];
}

interface ClassCardProps {
  code: string;
  name: string;
  batch: string;
  lessonName: string;
  date: string;
  time: string;
  type: 'physical' | 'online';
  lecturerImage: string;
  color: string;
  instructor: string;
  emailS: string;
}

const ClassCard: React.FC<ClassCardProps> = ({
  code,
  name,
  batch,
  lessonName,
  date,
  time,
  type,
  lecturerImage,
  color,
  instructor,
  emailS
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  return (
    <div 
    onClick={()=> router.push("/Student/Class/"+code) }
      className={`rounded-lg overflow-hidden ${color} transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer`}
      style={{ 
        minHeight: '300px',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 10px 20px -5px rgba(255, 255, 255, 0.15) inset',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`p-6 relative flex flex-col h-full bg-black bg-opacity-30`}>
        <div className="absolute top-2 right-2">
          <span className={`text-sm font-bold text-white rounded-full px-3 py-1 bg-opacity-25 bg-black`}>{code}</span>
        </div>
       
        <div className="flex items-center mb-4">
          <div className="relative w-14 h-14 mr-3">
            <Image 
              src={lecturerImage}   
              alt="Lecturer" 
              layout="fill" 
              objectFit="cover"
              className="rounded-full"
              style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            />
          </div>
          <div>
            <p className="text-white font-semibold">{instructor}</p>
            <p className="text-sm text-white opacity-75">{batch}</p>
          </div>
        </div>
        <h2 className="text-xl font-bold text-white mb-3">{truncateText(name, 28)}</h2>
        <p className="text-md text-white mb-4 font-medium">
          <FaBook className="inline mr-2 mb-1" />
          {truncateText(lessonName, 35)}
        </p>
        <div className="flex-grow"></div>
        <div className="flex flex-wrap gap-4 text-white text-xs mt-auto">
          <div className="flex items-center">
            <FaCalendarAlt className="w-5 h-5 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="w-5 h-5 mr-2" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            {type === 'physical' ? <FaMapMarkerAlt className="w-5 h-5 mr-2" /> : <FaVideo className="w-5 h-5 mr-2" />}
            <span className="capitalize">{type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const { data: session, status } = useSession();
  const [emailSTDN, setemailSTDN] = useState<string>();

  useEffect(() => {
    setLoading(false);
    setemailSTDN(session?.user?.email || "");
    fetchAndMergeClasses();
    console.log(session?.user?.email);
  }, [session]);

  const fetchAndMergeClasses = async () => {
    try {
      const response = await fetch('/api/student/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": session?.user?.email,
        }),
      });

      const data: ApiResponse = await response.json();
      console.log(data);  
      setClasses([]);
      if (data.classes && data.classes.length > 0) {
        const newClasses = data.classes.map((apiClass, index) => ({
          id: classes.length + index + 1, // Generate a unique id based on existing length
          code: apiClass.code,
          name: apiClass.name,
          batch: apiClass.batch,
          lessonName: apiClass.lessonName,
          lecturerName: apiClass.lecturerName,
          date: apiClass.date,
          time: apiClass.time,
          type: apiClass.type,
          lecturerImage: apiClass.lecturerImage,
          color: "bg-blue-500 text-white", // Default color or based on logic
        }));
        
        setClasses(prevClasses => [...prevClasses, ...newClasses]);
      } else {
        console.log("No classes found for the student.");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const getRandomColor = () => {
    const backgroundColors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-gray-500',
      'bg-orange-500',
    ];

    const textColors = [
      'text-white',
    ];

    const randomBgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    const randomTextColor = textColors[Math.floor(Math.random() * textColors.length)];

    return `${randomBgColor} ${randomTextColor}`;
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      {loading && <LoadingSpinner />}
      <div className="max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <StudentProfile />
        <LectureFeeds />
        </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => (
            <ClassCard
              key={cls.id}
              code={cls.code}
              name={cls.name}
              batch={cls.batch}
              lessonName={cls.lessonName}
              date={cls.date}
              time={cls.time}
              type={cls.type as 'physical' | 'online'}
              lecturerImage={cls.lecturerImage}
              color={getRandomColor()}
              instructor={cls.lecturerName}
              emailS={session?.user?.email || ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
