'use client';

import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

const EnrollmentPage = () => {
   const [enrollmentKey, setEnrollmentKey] = useState('');

   const handleEnroll = () => {
      if (enrollmentKey === '123') {
         toast("Enrollment successful!", {
            icon: "✅",
            style: {
               background: "#0f172a",
               color: "#fff",
            },
         });
      } else {
         toast("Invalid enrollment key!", {
            icon: "❌",
            style: {
               background: "#0f172a",
               color: "#fff",
            },
         });
      }
   };

   return (
      <div className="h-screen flex justify-center items-center">

         <Toaster
            position="top-center"
            toastOptions={{
               style: {
                  background: "#333",
                  color: "#fff",
               },
            }}
         />

         <div className="max-w-md w-full mx-auto p-8 bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl rounded-lg flex flex-col justify-center items-center space-y-4">
            <h2 className="text-3xl font-bold mb-4 text-center text-indigo-300">Enrollment Page</h2>

            <input
               type="text"
               value={enrollmentKey}
               onChange={(e) => setEnrollmentKey(e.target.value)}
               placeholder="Enter your enrollment key"
               className="w-full p-2 mb-4 border rounded-lg input input-bordered input-info max-w-xs text-center"
            />

            <button
               onClick={handleEnroll}
               className="text-white px-5 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none font-semibold
               focus:ring-2 focus:ring-opacity-50 shadow-xl text-sm sm:text-base flex items-center justify-center space-x-1 bg-blue-500 hover:bg-blue-700"
            >
               Enroll
            </button>
         </div>


      </div>
   );
};

export default EnrollmentPage;
