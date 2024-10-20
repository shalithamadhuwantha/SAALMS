"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
import { FiUserCheck } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Image from "next/image";
import { useSession } from "next-auth/react";

export interface StudentData {
  name: string;
  email: string;
  registrationNumber?: string;
  id: number; // Ensure id is a Number
}

export interface UpdateStudentResponse {
  message: string;
  updatedStudent: StudentData;
  // Add any other fields returned by your API if necessary
}

const Enroll = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [classDetails, setClassDetails] = useState<any>(null);
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [isAttended, setIsAttended] = useState<boolean>(false);

  // api/updateStudent.ts

  async function updateStudent(
    courseCode: string,
    newStudentData: StudentData
  ): Promise<UpdateStudentResponse> {
    const apiUrl = "/api/course/update_nodatalost";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseCode,
          newStudentData,
        }),
      });

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update student");
      }

      // Parse the JSON response
      const data: UpdateStudentResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating student:", error);
      throw error; // Optional: re-throw error for further handling
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hashFragment = window.location.hash.split("#")[1]; // Get the part after the #
        const pathname = window.location.pathname.split("/"); // Get the full path

        const courseCode = pathname[3]; // Assuming the course code is the 4th part of the path
        const classHash = hashFragment; // Class hash after #

        if (courseCode && classHash && session?.user?.email) {
          // Make the API call to fetch class and student details
          const response = await fetch("/api/attandace/get", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              classHash: classHash,
              courseCode: courseCode,
              email: session.user.email,
            }),
          });

          const data = await response.json();
console.log(data);

          if (response.ok) {
            if(data.message == "Course and student found."){
              router.push("/Student/Class/"+window.location.href.split("/")[5].split("#")[0])
            }
            if (data.classDetails) {
              setClassDetails(data.classDetails);
            }
            if (data.student) {
              setStudentDetails(data.student);
              setIsAttended(data.isAttended);
            }
          } else {
            // Handle errors returned from the API
            console.error("API Error:", data.message);
            alert(data.message);
          }
        } else {
          console.error("Missing parameters or user session.");
          alert("Unable to retrieve class details. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("There was an error processing your request.");
      } finally {
        setLoading(false); // Ensure loading is set to false after API call
      }
    };

    fetchData();
  }, [session]);

  const handleEnroll = () => {
    // Handle enrollment action, e.g., redirect to class page
    console.log("sss");

    const courseCode = window.location.href.split("/")[5].split("#")[0]; // Replace with actual course code
    const newStudentData = {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      registrationNumber: "",
      id: 1,
    };
    updateStudent(courseCode, newStudentData)
      .then((result) => {
        console.log("Update successful:", result);
        router.push("/Student/Class/" + courseCode);
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
    // router.push("/Student/Class/" + classDetails?.code);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-base-100">
        {/* Custom Tailwind Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-sm sm:max-w-lg bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={classDetails.lecturer.image || "/img/logo.png"}
            width={100}
            height={100}
            alt="Class"
            className="rounded-full"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-300">
            {classDetails?.name || "Class Details"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Please review the class details below.
          </p>
        </div>

        {classDetails && (
          <div className="space-y-4 mt-6">
            {/* Lecture Name */}
            <div className="flex items-center space-x-3">
              <FaChalkboardTeacher className="text-xl sm:text-2xl text-blue-500 dark:text-blue-300" />
              <span className="text-sm sm:text-lg font-semibold dark:text-gray-300">
                Lecture Name:
              </span>
              <span className="dark:text-gray-300">{classDetails.name}</span>
            </div>

            {/* Class Code */}
            <div className="flex items-center space-x-3">
              <MdOutlineClass className="text-xl sm:text-2xl text-blue-500 dark:text-blue-300" />
              <span className="text-sm sm:text-lg font-semibold dark:text-gray-300">
                Class Code:
              </span>
              <span className="dark:text-gray-300">{classDetails.code}</span>
            </div>

            {/* Lecturer Name */}
            <div className="flex items-center space-x-3">
              <FiUserCheck className="text-xl sm:text-2xl text-blue-500 dark:text-blue-300" />
              <span className="text-sm sm:text-lg font-semibold dark:text-gray-300">
                Lecturer:
              </span>
              <span className="dark:text-gray-300">
                {classDetails.lecturer.name}
              </span>
            </div>

            {/* Attendance Status */}
            <div className="flex items-center space-x-3">
              <AiOutlineCheckCircle
                className={`text-xl sm:text-2xl ${
                  isAttended ? "text-green-500" : "text-red-500"
                }`}
              />
              <span className="text-sm sm:text-lg font-semibold dark:text-gray-300">
                Attendance:
              </span>
              <span className="dark:text-gray-300">
                {isAttended ? "Attended" : "Not Attended"}
              </span>
            </div>

            <div className="mt-6">
              <button
                className="w-full bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105"
                onClick={()=>handleEnroll()}
                // disabled={!isAttended}
              >
                <AiOutlineCheckCircle className="text-2xl mr-2" />
                {isAttended ? "Go to Class" : "You are not enrolled"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Enroll;
