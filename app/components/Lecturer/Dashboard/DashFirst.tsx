"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  MdAdd,
  MdFolder,
  MdSettings,
  MdEmail,
  MdSchool,
  MdBusinessCenter,
  MdQrCode,
} from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface Course {
  id: string;
  name: string;
  code: string;
  batch: string;
  bgColor: string;
}
const StudentDashboard: React.FC = () => {
  const [profileid, setProfileid] = useState<string | undefined>();
  const [courses, setCourses] = useState<Course[]>([]);
  const { data: session, status } = useSession(); // Getting session status
  const [student, setStudent] = useState({
    name: "Guest User",
    email: "itt2022000@tec.rjt.ac.lk",
    faculty: "Faculty of Technology",
    department: "ICT Department",
    avatarBgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
    avatarText: "Gx",
  }); 

  const getRandomBgColor = (): string => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-lime-500",
      "bg-red-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-yellow-400",
      "bg-purple-400",
      "bg-indigo-400",
      "bg-pink-400",
      "bg-orange-400",
      "bg-teal-400",
      "bg-lime-400",
      "bg-red-600",
      "bg-blue-600",
      "bg-green-600",
      "bg-yellow-600",
      "bg-purple-600",
      "bg-indigo-600",
      "bg-pink-600",
      "bg-orange-600",
      "bg-teal-600",
      "bg-lime-600",
    ];
    
  
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  
  // Function to fetch course data from the API
  const fetchCourses = async (lecturerID: string) => {
    try {
      const response = await fetch("/api/course/find/lecid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lecturerID }), // Use lecturerID from the argument
      });
  
      if (response.ok) {
        const data = await response.json();
        const fetchedCourses = data.courses;
  
        // Map fetched data to the format expected by your state
        const formattedCourses = fetchedCourses.map((course: any) => ({
          id: course._id,
          name: course.name,
          code: course.code,
          batch: course.batch,
          bgColor: getRandomBgColor(), // You can customize this
        }));
  
        setCourses(formattedCourses);
      } else {
        console.error("Failed to fetch courses:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  
  // Function to fetch profile and set the lecturerID
  const getUserid = async () => {
    const email = session?.user?.email; // Make sure email is available
    if (!email) return; // Early return if email is not available
  
    try {
      const profileResponse = await fetch("/api/lecturer/Profilegrab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setProfileid(profileData._id); // Set profile ID
  
        // Update the student state
        setStudent({
          name: profileData.name || "Guest User",
          email: profileData.email || "itt2022000@tec.rjt.ac.lk",
          faculty: profileData.faculty || "Faculty of Technology",
          department: profileData.university || "ICT Department",
          avatarBgColor: "bg-gradient-to-r from-blue-500 to-purple-600", // Keep existing values
          avatarText: "Gx", // Keep existing values
        });
  
        // Fetch courses once the lecturerID is set
        fetchCourses(profileData._id);
      } else {
        console.error(
          "Failed to retrieve lecturer profile:",
          await profileResponse.text()
        );
      }
    } catch (error) {
      console.error("Error retrieving lecturer profile:", error);
    }
  };
  
  useEffect(() => {
    if (status === "authenticated") {
      getUserid(); // Call once the session is authenticated
    }
  }, [status]); // Dependency on session status to ensure session is available before calling the API
  

  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center mb-4">
            <Image
              src={session?.user?.image || "/img/logo.png"}
              alt="User profile"
              width={96}
              height={96}
              className="sm:w-24 sm:h-24 object-cover rounded-full mr-5"
              layout="intrinsic"
              priority
            />

            <div>
              <h1 className="text-xl font-bold mb-1">{student.name}</h1>
              <button
                onClick={() => router.push("/Lecturer/Settings")}
                className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition-colors duration-300 text-sm"
              >
                <MdSettings size={20} className="mr-1" />
                Settings
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-300 space-y-2 mb-4">
            <div className="flex items-center">
              <MdEmail className="mr-1" size={16} />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center">
              <MdSchool className="mr-1" size={16} />
              <span>{student.faculty}</span>
            </div>
            <div className="flex items-center">
              <MdBusinessCenter className="mr-1" size={16} />
              <span>{student.department}</span>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-gray-800 rounded-lg shadow-lg p-4 mb-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-24  mr-5 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 p-1 shadow-lg">
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
              <div>
                <h1 className="text-2xl font-bold mb-2">{student.name}</h1>
                <div className="flex items-center text-sm text-gray-300 space-x-2">
                  <div className="flex items-center">
                    <MdEmail className="mr-1" size={16} />
                    <span>{student.email}</span>
                  </div>
                  <span>|</span>
                  <div className="flex items-center">
                    <MdSchool className="mr-1" size={16} />
                    <span>{student.faculty}</span>
                  </div>
                  <span>|</span>
                  <div className="flex items-center">
                    <MdBusinessCenter className="mr-1" size={16} />
                    <span>{student.department}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/Lecturer/Settings")}
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition-colors duration-300 text-sm"
            >
              <MdSettings size={20} className="mr-1" />
              Settings
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Create New Class Card */}
          <div
            onClick={() => router.push("/Lecturer/Createcls")}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-48"
          >
            <div className="p-6 text-white h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
                  Create New Class
                </h2>
                <p className="text-base sm:text-lg mb-2 sm:mb-4">
                  Add a new course to your dashboard
                </p>
              </div>
              <div className="mt-2 sm:mt-4 flex items-center justify-center bg-white bg-opacity-20 rounded-full w-10 h-10 sm:w-12 sm:h-12 self-end">
                <MdAdd size={24} className="text-white" />
              </div>
            </div>
          </div>

          {/* Existing Courses */}
          {courses.map((course) => (
           <div
           key={course.id}
           onClick={() => router.push("/Lecturer/Course/" + course.code)} // Close the parentheses here
           className={`${course.bgColor} rounded-lg shadow-md overflow-hidden h-48 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
         >
         
              <div className="p-4 text-white flex-grow">
                <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                  {course.code}
                </h2>
                <p className="text-base sm:text-lg mb-1 sm:mb-2">
                  {course.name}
                </p>
                <p className="text-sm">{course.batch}</p>
              </div>
              <div className="bg-black bg-opacity-20 p-2 flex justify-end mt-auto">
                <button className="text-white hover:text-gray-300 transition-colors duration-300 mx-1 sm:mx-2">
                  <MdQrCode size={20} />
                </button>
                <button className="text-white hover:text-gray-300 transition-colors duration-300 mx-1 sm:mx-2">
                  <MdFolder size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
