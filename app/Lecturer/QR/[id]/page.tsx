"use client";

import React, { useState, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import CryptoJS from "crypto-js";

export default function CoursePage() {
  const pathname = usePathname();
  const [id, setId] = useState<string | null>(null);
  const [lecid , setlecid] = useState<string | null>(null)
  const [uniqueCode, setUniqueCode] = useState<number>(1);
  const [qrData, setQrData] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const privateKey: string = "#5Du$855sSD*85sf$%";

  const extractCourseIdFromPath = () => {
    const segments = pathname.split("/");
    const courseId = segments[segments.length - 1];
    setId(courseId);
  };

  const validateCourseId = async (courseId: string) => {
    try {
      const response = await fetch("/api/attandace/search/by_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: courseId }),
      });

      if (response.status === 200) {
        setErrorMessage(null);
        const data = await response.json();
        setlecid(data.attendance.lectureId)
        // console.log(data.attendance.lectureId);
         // Clear any previous error message
        generateQRCodeData(); // Generate QR code if the course is valid
      } else if (response.status === 404) {
        setErrorMessage("Course not found."); // Set error message for not found
        setQrData(""); // Clear QR data if not valid
      } else {
        setErrorMessage("An error occurred. Please try again."); // Handle other errors
        setQrData(""); // Clear QR data on error
      }
    } catch (error) {
      console.error("Error validating course ID:", error);
      setErrorMessage("Network error. Please check your connection."); // Set network error message
      setQrData(""); // Clear QR data on error
    }
  };

  const generateQRCodeData = () => {
    if (!id) return;
    const currentDate = new Date();
    const date = currentDate.toISOString().split("T")[0];
    const time = currentDate.toTimeString().split(" ")[0];
    const newQrData = `${id}#${date}#${time}#${uniqueCode}`;

    const encryptedData = CryptoJS.AES.encrypt(newQrData, privateKey).toString();
    setQrData(encryptedData);
    setUniqueCode((prev) => prev + 1);
  };

  useEffect(() => {
    extractCourseIdFromPath();
  }, [pathname]);

  useEffect(() => {
    if (id) {
      validateCourseId(id); // Validate the course ID when it's set
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!errorMessage) {
        generateQRCodeData(); // Only refresh QR code if there's no error
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id, uniqueCode, errorMessage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <button
        onClick={() => router.push("/Lecturer/Course/" + lecid)}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-800"
      >
        <AiOutlineClose size={24} />
      </button>
      
      <div className="card w-full max-w-lg shadow-xl p-6 rounded-lg relative">
        <h1 className="text-2xl font-bold text-center mb-4">Course ID: {lecid}</h1>

        {errorMessage && (
          <p className="text-center text-red-600">{errorMessage}</p>
        )}
{/* app\Lecturer\QR\[id]\page.tsx */}
        <div className="flex justify-center mb-6">
          {qrData && (
            <QRCode
              value={qrData}
              size={330}
              bgColor={"#111828"}
              fgColor={"#12A9D3"}
              logoImage="/img/logo.png"
              logoWidth={60}
              qrStyle={"squares"}
              eyeColor={"#3C6CBF"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
