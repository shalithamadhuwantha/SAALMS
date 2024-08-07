"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const UserTypeSelection: React.FC = () => {
  const [userType, setUserType] = useState<string | null>(null);

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

 
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-slate-700 text-white p-8 md:rounded-l-[50px] border-l-4 border-indigo-500">
        <Image
          src="/img/logo.png"
          width={200}
          height={200}
          alt="Google Logo"
          className="object-contain mb-6 w-[200px] md:w-[251px]"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center">Welcome!</h1>
        <p className="text-lg md:text-xl mb-6 md:mb-8 text-center">Please select your role:</p>
       
        <div className="space-y-4 w-full max-w-xs">
          <button
            className="flex justify-center items-center w-full px-8 md:px-12 py-2 bg-sky-700 rounded-[90px] text-xl md:text-2xl hover:bg-sky-600 transition-colors duration-300"
            onClick={() => handleSelection('student')}
          >
            Student
          </button>
          <button
            className="flex justify-center items-center w-full px-8 md:px-12 py-2 bg-sky-700 rounded-[90px] text-xl md:text-2xl hover:bg-sky-600 transition-colors duration-300"
            onClick={() => handleSelection('lecturer')}
          >
            Lecturer
          </button>
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