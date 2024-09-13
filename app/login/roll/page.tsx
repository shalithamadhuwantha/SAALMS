"use client";
import React, { useState, Suspense, useEffect } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import AuthGoogle from "@/app/components/root/AuthGoogle";
import { LogOff } from "@/app/components/root/MangeLogin";


const UserTypeSelection: React.FC = () => {
  const { data: session, status } = useSession();
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();

  

  const sessionmanagement = () => {
    if (sessionStorage.getItem("roll") !== null) {
      if (sessionStorage.getItem("login") !== null) {
        if (sessionStorage.getItem("roll") === "Student") {
          router.push("/Student/Dashboard");
          return;
        } else if (sessionStorage.getItem("roll") === "Lecturer") {
          router.push("/Lectuer/Dashboard");
          return;
        }
      } else if (
        sessionStorage.getItem("roll") === "Student" ||
        sessionStorage.getItem("roll") === "Lecturer"
      ) {
        router.push("/login/details");
        return;
      }
    }
  };

  const handleSelection = (type: string) => {
    setUserType(type);
    sessionStorage.setItem("roll", type);
    sessionmanagement();
  };

  useEffect(() => {
    sessionmanagement();
  });
  
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <AuthGoogle>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.5 }}
          className="flex overflow-hidden flex-col h-screen"
        >
          <div className="flex h-screen">
            <div className="hidden md:block md:w-1/2 relative">
              <Image
                src="/img/leaning.png"
                alt="Background Logo"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-slate-950 text-white p-8 md:rounded-l-[50px]  ">
              <ul className="steps mb-10 ">
                <li className="step step-primary">Register</li>
                <li className="step step-primary">Roll</li>
                <li className="step">Detail</li>
                <li className="step">Done</li>
              </ul>
              <div className="card bg-slate-900 lg:w-96 w-[98%] px-5 shadow-xl flex flex-col items-center justify-center pb-20 rounded-3xl mx-5">
                <button
                  className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-full  hover:text-red-600"
                  onClick={() => {
                    LogOff();
                  }}
                >
                  <IoIosLogOut />
                </button>
                <Image
                  src={session?.user?.image || "/img/default.png"}
                  width={200}
                  height={200}
                  alt="profile Logo"
                  className="w-16 h-16 rounded-full mt-5"
                />

                <p className="text-slate-400 mb-7">{session?.user?.name} </p>
                <h1 className="text-3xl md:text-4xl font-bold md:mb-6 text-center">
                  Welcome!
                </h1>
                <p className="text-lg md:text-xl mb-6 md:mb-8 text-center">
                  Please select your role:
                </p>

                <div className="space-y-4 w-full max-w-xs">
                  <button
                    className="flex justify-center items-center w-full px-8 md:px-12 py-2 bg-sky-700 rounded-[90px] text-xl md:text-2xl hover:bg-sky-600 transition-colors duration-300"
                    onClick={() => handleSelection("Student")}
                  >
                    Student
                  </button>
                  <button
                    className="flex justify-center items-center w-full px-8 md:px-12 py-2 bg-sky-700 rounded-[90px] text-xl md:text-2xl hover:bg-sky-600 transition-colors duration-300"
                    onClick={() => handleSelection("Lecturer")}
                  >
                    Lecturer
                  </button>
                </div>
              </div>

              {userType && (
                <p className="mt-6 md:mt-8 text-base md:text-lg text-center">
                  Youve selected: <span className="font-bold">{userType}</span>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </AuthGoogle>
  );
};

export default UserTypeSelection;
