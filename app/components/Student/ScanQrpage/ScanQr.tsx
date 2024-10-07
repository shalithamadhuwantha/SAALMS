"use client";

import React, { useEffect, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/library";
import { FaQrcode, FaCamera } from "react-icons/fa";
import { IoIosQrScanner } from "react-icons/io";
import CryptoJS from "crypto-js"; // Import CryptoJS
import { useSession } from "next-auth/react";

const privateKey: string = "#5Du$855sSD*85sf$%"; // Replace with your actual private key

const ScanQr = () => {
  const [result, setResult] = useState<string | null>(null);
  const [decryptedData, setDecryptedData] = useState<string | null>(null); // State for decrypted data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const getSriLankaTime = () => {
    const sriLankaTime = new Date().toLocaleString("en-LK", {
      timeZone: "Asia/Colombo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Set to true if you want 12-hour format
    });
    console.log(sriLankaTime); // Output: HH:MM:SS
    return sriLankaTime;
  };

  const updateAttendance = async (id: string ) => {
    try {
      const response = await fetch("/api/attandace/add", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classId: id,
          studentEmail: session?.user?.email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        
        alert('Attendance updated successfully!');
      } else {
        console.log(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      
      alert('Failed to update attendance.');
    }
  };


  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    // Destructure session and status from useSession

    const startScanner = async () => {
      if (status !== "authenticated") {
        setError("User not authenticated"); // Error if session is not ready
        return;
      }

      try {
        const result = await codeReader.decodeFromInputVideoDevice(
          undefined,
          "qr-video"
        );
        setResult(result.getText());

        // Decrypt the scanned QR code data
        const decryptedData = decryptData(result.getText());
        setDecryptedData(decryptedData);
        const atdncid = decryptedData.split("#")[0];
        console.log(decryptedData.split("#")[0]);

        // Assuming the decryptedData contains the attendanceId, you can fetch the attendance here
        await fetchAttendance(decryptedData); // Fetch attendance after successful scan and decryption
      } catch (err) {
        setError(
          "Failed to access camera. Please ensure you have granted permission."
        );
      } finally {
        setLoading(false);
      }
    };

    // Ensure that the session is ready before starting the scanner
    if (status === "authenticated") {
      startScanner();
    }

    return () => {
      codeReader.reset();
    };
  }, [session, status]);

  // Function to fetch the attendance from the API
  const fetchAttendance = async (attendanceId: string) => {
    try {
      if (!session?.user?.email) {
        setError("User email not found."); // Error if email is missing
        return;
      }
      console.log(attendanceId);

      const response = await fetch("/api/attandace/student/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: attendanceId.split("#")[0],
          email: session.user.email,
        }), // Send the attendance ID and user email
      });

      const textResponse = await response.text(); // Get the response as text first
      console.log(textResponse); // Log the raw response

      if (!response.ok) {
        const errorData = JSON.parse(textResponse); // Try to parse the text response as JSON
        throw new Error(
          errorData.message || "Failed to fetch attendance record"
        );
      }

      const data = JSON.parse(textResponse); // Parse the text response as JSON

      // Check if the dates match (Optional)
      const apiDate = new Date(data.attendance.createdAt)
        .toISOString()
        .split("T")[0]; // Extract date from API response
      if (apiDate == attendanceId.split("#")[1]) {
        const apitimeco = Number((getSriLankaTime()).replaceAll(":",""))
        const qrtimeco = Number(attendanceId.split("#")[2].replaceAll(":",""))
        console.log(attendanceId);
        
        // const qrtimeco = Number(apitimeco)+12
        console.log(qrtimeco);
        console.log(apitimeco);
        console.log(apitimeco+10 >= qrtimeco);
        console.log(apitimeco <= qrtimeco);
        // 40 >= 31 && 31 >=30
        if(qrtimeco+10 >= apitimeco &&  apitimeco >= qrtimeco ){

          console.log("Attendance recorded");
          updateAttendance(attendanceId.split("#")[0]);
        }else{
          setError("Expired QR -- ");
        }

      } else {
        setError("Expired QR");
      }
    } catch (error) {
      setError("Error fetching attendance record: " + error);
    }
  };

  const decryptData = (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, privateKey);
    const originalData = bytes.toString(CryptoJS.enc.Utf8);
    const id = originalData.split("#")[0];
    // fetchAttendance(id)
    return originalData;
  };

  return (
    <div className="max-w-md mx-auto p-6 gradient bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl rounded-xl shadow-lg space-y-6">
      <div className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
        <FaQrcode className="w-8 h-8 text-blue-500" />
        <h1 className="text-white">QR Code Scanner</h1>
      </div>

      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-blue-500">
        <video id="qr-video" className="w-full h-full object-cover" />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex space-x-4">
              <IoIosQrScanner className="animate-pulse text-white text-8xl" />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div
          className="bg-black/20 border-l-4 border-red-500 text-red-700 p-4 rounded-lg"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div
          className="bg-black/20 border-l-4 border-green-500 text-green-700 p-4 rounded-lg"
          role="alert"
        >
          <p className="font-bold flex items-center">
            <FaCamera className="mr-2" /> QR Code Detected
          </p>
          <p>{result}</p>
          {decryptedData && (
            <p className="mt-2">
              <strong>Decrypted Data:</strong> {decryptedData}
            </p>
          )}
        </div>
      )}

      <p className="text-sm text-gray-500 text-center">
        Position the QR code within the frame to scan
      </p>
    </div>
  );
};

export default ScanQr;
