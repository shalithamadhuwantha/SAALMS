"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";

const UserTypeSelection: React.FC = () => {
  const { data: session, status } = useSession();
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/");
    return null;
  }

  const handleSelection = (type: string) => {
    setUserType(type);
    console.log(`User selected: ${type}`);
  };

  return (
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

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-slate-950 text-white p-8 md:rounded-l-[50px] border-l-4 border-indigo-500">
        <ul className="steps mb-20">
          <li className="step step-primary">Register</li>
          <li className="step step-primary">Roll</li>
          <li className="step">Organization</li>
          <li className="step">Done</li>
        </ul>
        <div className="card bg-slate-900 w-96 shadow-xl flex flex-col items-center justify-center pb-20 rounded-3xl">
          <button
            className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-full  hover:text-red-600"
            onClick={() => {
              signOut();
            }}
          >
            <IoIosLogOut />
          </button>
          <Image
            src={session?.user?.image || "/img/default.png"}
            width={200}
            height={200}
            alt="Google Logo"
            className="w-16 h-16 rounded-full mt-5"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center">
            Welcome!
          </h1>
          <p>{session?.user?.name} </p>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-center">
            Please select your role:
          </p>

          <div className="space-y-4 w-full max-w-xs">
            <button
              className="flex justify-center items-center w-full px-8 md:px-12 py-2 bg-sky-700 rounded-[90px] text-xl md:text-2xl hover:bg-sky-600 transition-colors duration-300"
              onClick={() => handleSelection("student")}
            >
              Student
            </button>
            <button
              className="flex justify-center items-center w-full px-8 md:px-12 py-2 bg-sky-700 rounded-[90px] text-xl md:text-2xl hover:bg-sky-600 transition-colors duration-300"
              onClick={() => handleSelection("lecturer")}
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
  );
};

export default UserTypeSelection;
