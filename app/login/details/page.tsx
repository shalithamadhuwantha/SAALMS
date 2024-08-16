"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import { LogOff } from "@/app/components/root/MangeLogin";
import { Session } from "inspector";

export default function DetailWindow() {
  const [step, setStep] = useState(1);
  const { data: session, status } = useSession();
  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");

  const handleContinue = () => {
    if (step === 1 && university) {
      setStep(2);
    } else if (step === 2 && faculty) {
      setStep(3);
    }
  };

  const progress = (step / 3) * 100;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/img/leaning.png"
            alt="Background Logo"
            layout="fill"
            objectFit="cover"
            priority
            className="opacity-70 hover:opacity-100 transition-opacity duration-300"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:rounded-l-[50px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ul className="steps mb-2 items-center">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Roll</li>
            <li className="step step-primary">Detail</li>
            <li className="step">Done</li>
          </ul>
        </motion.div>
        <motion.div
          className="w-full max-w-md "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-slate-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-sky-400 to-sky-600 h-3 rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
          <motion.div
            className="text-right text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Step {step} of 3
          </motion.div>
        </motion.div>

        <motion.div
          className="card bg-slate-800 lg:w-96 w-[98%] px-8 shadow-2xl flex flex-col items-center justify-center py-12 rounded-3xl mx-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-full  hover:text-red-600"
            onClick={() => {
              LogOff();
            }}
          >
            <IoIosLogOut />
          </button>
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-8 text-center text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {step === 1 ? "University" : step === 2 ? "Faculty" : "Summary"}
          </motion.h1>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="university"
                {...fadeIn}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-lg md:text-xl mb-6 text-center text-slate-300">
                  Please enter your university:
                </p>
                <motion.input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full max-w-xs px-4 py-3 bg-slate-700 rounded-full text-xl mb-6 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  placeholder="Enter university"
                  whileFocus={{ scale: 1.05 }}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="faculty"
                {...fadeIn}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-lg md:text-xl mb-6 text-center text-slate-300">
                  Please enter your faculty:
                </p>
                <motion.input
                  type="text"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className="w-full max-w-xs px-4 py-3 bg-slate-700 rounded-full text-xl mb-6 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                  placeholder="Enter faculty"
                  whileFocus={{ scale: 1.05 }}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="summary"
                {...fadeIn}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="flex items-center justify-center text-sm md:text-lg mb-4 text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Image
                    src={session?.user?.image || "/img/default.png"}
                    width={200}
                    height={200}
                    alt="profile Logo"
                    className="w-16 h-16 rounded-full"
                  />
                </motion.div>

                <motion.p
                  className="text-sm md:text-lg mb-4 text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Name:{" "}
                  <span className="font-bold text-white">
                    {session?.user?.name}
                  </span>
                </motion.p>

                
                <motion.p
                  className="text-lg md:text-lg mb-4 text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Email:{" "}
                  <span className="font-bold text-white">
                    {session?.user?.email}
                  </span>
                </motion.p>
                <motion.p
                  className="text-lg md:text-lg mb-4 text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Roll:{" "}
                  <span className="font-bold text-white">{sessionStorage.getItem("roll")}</span>
                </motion.p>
                <motion.p
                  className="text-lg md:text-lg mb-4 text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  University:{" "}
                  <span className="font-bold text-white">{university}</span>
                </motion.p>
                <motion.p
                  className="text-lg md:text-lg mb-4 text-slate-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Faculty:{" "}
                  <span className="font-bold text-white">{faculty}</span>
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {step <= 3 && (
            <motion.button
              className="w-full max-w-xs px-8 py-3 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full text-xl font-semibold text-white hover:from-sky-600 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={handleContinue}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Continue
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
