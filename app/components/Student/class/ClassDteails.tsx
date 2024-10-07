"use client";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MdOutlineVerified,
  MdOutlineAssignment,
  MdLocationOn,
  MdVideoCall,
  MdAccessTime,
  MdClass,
  MdQrCode2,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";

import { IoMdOpen } from "react-icons/io";

import { TbCalendarClock } from "react-icons/tb";
import { FaUserCircle, FaLink } from "react-icons/fa";
import { useSession } from "next-auth/react";

interface CardItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}
interface stdnProps {
  atdnce: string;
  value: string;
}

interface LectureItemProps {
  icon: React.ReactNode;
  value: string;
}

interface StudentProfile {
  name: string;
  university: string;
  faculty: string;
  department: string;
}

interface AttendanceData {
  id: number;
  date: string;
  status: boolean;
}

interface CurrentLecture {
  title: string;
  time: string;
  type: string;
  location: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Stateatdn: React.FC<stdnProps> = ({ atdnce, value }) => {
  const router = useRouter();
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, delay: 0.4 }}
      className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 rounded-xl p-6 shadow-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold px-4 py-2 bg-gray-800 rounded-full text-white">
          Attendance Status {atdnce}
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm px-4 py-2 bg-gray-800 rounded-full text-white">
            Status
          </span>
          <div
            className={`w-8 h-8 ${
              atdnce === "🟢" ? "bg-green-500" : "bg-red-500"
            } rounded-full flex items-center justify-center`}
          >
            {atdnce === "🟢" ? (
              <MdCheckCircle className="text-white text-lg" />
            ) : (
              <MdClose className="text-white text-lg" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-4">
        <div
          className={`p-4 rounded-lg flex flex-col items-center justify-center ${
            atdnce === "🟢" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <div className="text-white text-3xl mb-2">
            {atdnce === "🟢" ? <MdCheckCircle /> : <MdClose />}
          </div>
          <p className="text-sm text-white font-semibold">
            {atdnce === "🟢" ? "Present" : "Absent"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer">
            <MdQrCode2 className="text-4xl text-indigo-400 mb-2" />
            <p className="text-sm text-gray-300">Add Attendace</p>
          </div>
        </div>

        <div onClick={() => router.push(value)}>
          <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer">
            <IoMdOpen className="text-4xl text-indigo-400 mb-2" />
            <p className="text-sm text-gray-300">meeting / location</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CardItem: React.FC<CardItemProps> = ({ icon, title, value }) => {
  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 rounded-xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition duration-300"
    >
      <div className="flex items-center space-x-3 sm:space-x-4">
        <span className="text-3xl sm:text-4xl flex-shrink-0">{icon}</span>
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-300">
            {title}
          </h3>
          <div className="text-sm sm:text-xl font-bold text-white">{value}</div>
        </div>
      </div>
    </motion.div>
  );
};

const LectureItem: React.FC<LectureItemProps> = ({ icon, value }) => {
  // const { course, student, latestAttendance } = clzdtls;
  // // const { course, student, latestAttendance } = clzdtls;
  // console.log(course);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-2 sm:space-x-3 bg-gray-800 bg-opacity-50 p-2 sm:p-3 rounded-lg hover:bg-opacity-70 transition duration-300"
    >
      <span className="text-indigo-400 text-lg sm:text-xl flex-shrink-0">
        {icon}
      </span>
      <span className="text-sm sm:text-base font-medium">{value}</span>
    </motion.div>
  );
};

export interface AttendanceRecord {
  id: number;
  date: string; // Format: "YYYY-MM-DD"
  status: boolean; // True for present, false for absent
}

export interface AttendanceResponse {
  date: string; // The date of the class
  status: boolean; // True for present, false for absent
}

const ClassDetails: React.FC = () => {
  const [clzdtls, setClzDtls] = useState<any>(null); // State for storing lecture details
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  useEffect(() => {
    if (status === "loading") return; // Wait for the session to load

    console.log(session?.user?.email);
    const fetchLectureDetails = async (): Promise<void> => {
      try {
        const response = await fetch("/api/student/getlecture", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseCode: id,
            studentEmail: session?.user?.email,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // Store the fetched data in state
        setClzDtls(data);
      } catch (error) {
        console.error("Error fetching lecture details:", error);
      }
    };

    const fetchAttendanceData = async () => {
      try {
        const response = await fetch("/api/student/class/table", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lectureId: id, // Your lecture ID
            studentEmail: session?.user?.email, // Student email
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: AttendanceResponse[] = await response.json();

        // Format the attendance data
        const formattedAttendanceData = data.map((record, index) => ({
          id: index + 1, // Generate ID starting from 1
          date: record.date,
          status: record.status,
        }));

        setAttendanceData(formattedAttendanceData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchAttendanceData();
    fetchLectureDetails();
  }, [session, status]);
  const currentDate = new Date().toISOString().split("T")[0];
  const { id } = useParams();

  // const attendanceData: AttendanceData[] = [
  //   { id: 1, date: currentDate, status: true },
  //   { id: 2, date: "2024-03-01", status: false },
  //   { id: 3, date: "2024-02-28", status: true },
  //   { id: 4, date: "2024-02-27", status: true },
  // ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <CardItem
            icon={<MdOutlineVerified className="text-blue-400" />}
            title="Student ID"
            value={clzdtls?.student.registrationNumber || "Loading..."}
          />
          <CardItem
            icon={<MdOutlineAssignment className="text-green-400" />}
            title="Lecture"
            value={clzdtls?.course.name || "Loading..."}
          />
          <CardItem
            icon={<TbCalendarClock className="text-yellow-400" />}
            title="Time"
            value={
              clzdtls?.latestAttendance?.createdAt
                ? clzdtls.latestAttendance.createdAt.split("T")[0] +
                  " " +
                  clzdtls.latestAttendance.createdAt.split("T")[1].split(".")[0]
                : "Loading..."
            }
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 rounded-xl p-4 sm:p-6 shadow-xl"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-indigo-300">
              Current Lecture
            </h2>
            <div className="space-y-2 sm:space-y-3">
              <LectureItem
                icon={<MdClass />}
                value={clzdtls?.course?.name || "Loading..."}
              />
              <LectureItem
                icon={<MdAccessTime />}
                value={
                  clzdtls?.latestAttendance?.createdAt
                    ? clzdtls.latestAttendance.createdAt.split("T")[0] +
                      " " +
                      clzdtls.latestAttendance.createdAt
                        .split("T")[1]
                        .split(".")[0]
                    : "Loading..."
                }
              />
              <LectureItem
                icon={<MdVideoCall />}
                value={clzdtls?.course?.type || "Loading..."}
              />
              <LectureItem
                icon={<MdLocationOn />}
                value={clzdtls?.course?.link || "Loading..."}
              />
            </div>
          </motion.div>

          {/* put here  */}
          <Stateatdn
            atdnce={
              clzdtls?.latestAttendance?.studentAttendance?.attendance ||
              "Loading..."
            }
            value={clzdtls?.course?.link || "/#"}
          />
        </div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 rounded-xl p-4 sm:p-6 shadow-xl mt-4 sm:mt-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-indigo-300">
            Attendance Summary
          </h2>
          <ul className="space-y-2">
            {attendanceData.map((attendance) => (
              <li
                key={attendance.id}
                className="flex justify-between items-center bg-gray-800 bg-opacity-50 p-2 rounded-lg hover:bg-opacity-70 transition duration-300"
              >
                <span className="text-sm sm:text-base font-medium">
                  {attendance.date}
                </span>
                <span
                  className={`text-xs sm:text-sm font-semibold px-4 py-1 rounded-full ${
                    attendance.status
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {attendance.status ? "Present" : "Absent"}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </main>
  );
};

export default ClassDetails;
