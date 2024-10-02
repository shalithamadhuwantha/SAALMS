"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdArrowForward, MdCheck } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";

interface ClassData {
  code: string;
  name: string;
  batch: string;
  lessonName: string;
  date: string;
  time: string;
  type: "physical" | "online";
  link: string;
  additionalLink: string;
  students: string[];
}

const CreateClassPage: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [isStepValid, setIsStepValid] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const [classData, setClassData] = useState<ClassData>({
    code: "",
    name: "",
    batch: "",
    lessonName: "",
    date: "",
    time: "",
    type: "physical",
    link: "",
    additionalLink: "",
    students: [],
  });

  const getUserid = async () => {
    const email = session?.user?.email; // Replace with the actual email variable
    console.log(email);
    console.log("sssssss");
    
    try {
      const profileResponse = await fetch("/api/lecturer/Profilegrab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      console.log(profileResponse.ok);
      
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        sessionStorage.setItem("lecturerId", profileData._id); // Store lecturer ID in session storage
        console.log(`Lecturer ID stored: ${profileData._id}`);
        return profileData._id;
      } else {
        console.error(
          "Failed to retrieve lecturer profile:",
          await profileResponse.text()
        );
        return null; // Exit if unable to get the profile
      }
    } catch (error) {
      console.error("Error retrieving lecturer profile:", error);
      return null; // Exit on error
    }
  };

  useEffect(() => {
    // Load data from session storage on component mount
    const storedData = sessionStorage.getItem("classData");
    if (storedData) {
      setClassData(JSON.parse(storedData));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    
    const { name, value } = e.target;
    console.log(name);
    
    setClassData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]:
          name === "code"
            ? value.toUpperCase().replace(/[^A-Z0-9]/g, "")
            : value,
      };
      // Save to session storage
      sessionStorage.setItem("classData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    await getUserid();
    // Define the payload that matches your API structure
     console.log(sessionStorage.getItem("lecturerId"));
    
    const payload = {
      lecturerID: sessionStorage.getItem("lecturerId"),
      code: classData.code,
      name: classData.name,
      batch: classData.batch,
      lessonName: classData.lessonName,
      date: classData.date,
      time: classData.time,
      type: classData.type,
      link: classData.link,
      additionalLink: classData.additionalLink,
      students: [], // Send an empty students array as requested
    };

    try {
      console.log(payload);
      
      // Check if the class code already exists
      const checkResponse = await fetch("/api/lecturer/createclass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await checkResponse.json();

      if (
        checkResponse.status === 201 &&
        data.message ===
          "Class code already exists. Please use a different code."
      ) {
        toast("Class code already exists. Please use a different code.", {
          icon: "❌",
          style: {
            background: "#0f172a",
            color: "#fff",
          },
        });

        // console.log(`Class code already exists: ${classData.code}`);
        return; // Stop further execution if code exists
      } else if (checkResponse.ok) {
        toast("Class create successfully !", {
          icon: "✅",
          style: {
            background: "#0f172a",
            color: "#0f0",
          },
        });
        const codeR = classData.code
        setClassData({ // Clear classData
          code: "",
          name: "",
          batch: "",
          lessonName: "",
          date: "",
          time: "",
          type: "physical",
          link: "",
          additionalLink: "",
          students: [],
      });
      sessionStorage.removeItem("classData");

        setTimeout(() => {
          router.push('/Lecturer/addstudent/'+codeR);
      }, 2000);
      }

      // Proceed to create the class if the code doesn't exist
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  const nextStep = () => {
    setStep((prevStep) => {
      const newStep = prevStep + 1;
      sessionStorage.setItem("currentStep", newStep.toString());
      return newStep;
    });
  };

  const prevStep = () => {
    setStep((prevStep) => {
      const newStep = prevStep - 1;
      sessionStorage.setItem("currentStep", newStep.toString());
      return newStep;
    });
  };

  useEffect(() => {
    const validateStep = () => {
      switch (step) {
        case 1:
          setIsStepValid(
            Boolean(classData.code && classData.name && classData.batch)
          );
          break;
        case 2:
          setIsStepValid(
            Boolean(
              classData.lessonName &&
                classData.date &&
                classData.time &&
                classData.type 
            )
          );
          break;
        case 3:
          setIsStepValid(true); // No student addition step
          break;
        case 4:
          setIsStepValid(true); // Summary step is always valid
          break;
        default:
          setIsStepValid(false);
      }
    };
    validateStep();
  }, [classData, step]);

  const renderSummary = () => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <h2 className="text-2xl font-bold text-white mb-4">Class Summary</h2>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
            <h3 className="text-lg font-semibold text-indigo-300">
              Class Name
            </h3>
            <p className="text-white">{classData.name}</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
            <h3 className="text-lg font-semibold text-indigo-300">Batch</h3>
            <p className="text-white">{classData.batch}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
              <h3 className="text-lg font-semibold text-indigo-300">
                Short Description
              </h3>
              <p className="text-white">{classData.lessonName}</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
              <h3 className="text-lg font-semibold text-indigo-300">
                Date & Time
              </h3>
              <p className="text-white">
                {classData.date} at {classData.time}
              </p>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
            <h3 className="text-lg font-semibold text-indigo-300">
              Class Type
            </h3>
            <p className="text-white">{classData.type}</p>
          </div>

         
            <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300">
              <h3 className="text-lg font-semibold text-indigo-300">
                Meeting / Map Link
              </h3>
              <p className="text-blue-400">
                <a
                  href={classData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {classData.link}
                </a>
              </p>
            </div>
         
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl transition-all duration-300 ease-in-out relative overflow-hidden w-full max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-300">
            Create New Class
          </h2>

          <ul className="steps w-full mb-8">
            <li className={`step ${step >= 1 ? "step-primary" : ""}`}>
              Register
            </li>
            <li className={`step ${step >= 2 ? "step-primary" : ""}`}>
              Class Info
            </li>
            <li className={`step ${step >= 3 ? "step-primary" : ""}`}>
              Summary
            </li>
          </ul>

          <form className="space-y-6">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-indigo-300"
                  >
                    Class Code
                  </label>
                  <input
                    id="code"
                    type="text"
                    name="code"
                    value={classData.code}
                    onChange={handleInputChange}
                    placeholder="Enter class code"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                    required
                    maxLength={10}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-indigo-300"
                  >
                    Class Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={classData.name}
                    onChange={handleInputChange}
                    placeholder="Enter class name"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="batch"
                    className="block text-sm font-medium text-indigo-300"
                  >
                    Batch
                  </label>
                  <input
                    id="batch"
                    type="text"
                    name="batch"
                    value={classData.batch}
                    onChange={handleInputChange}
                    placeholder="Enter batch information"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="lessonName"
                    className="block text-sm font-medium text-indigo-300"
                  >
                    Short Description
                  </label>
                  <input
                    id="lessonName"
                    type="text"
                    name="lessonName"
                    value={classData.lessonName}
                    onChange={handleInputChange}
                    placeholder="Enter Short Description"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-indigo-300"
                    >
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      name="date"
                      value={classData.date}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-indigo-300"
                    >
                      Time
                    </label>
                    <input
                      id="time"
                      type="time"
                      name="time"
                      value={classData.time}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-indigo-300">
                      Class Type
                    </label>
                    <select
                      name="type"
                      value={classData.type}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                      required
                    >
                      <option value="physical">Physical</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
                  
                    <div className="space-y-2 md:col-span-2">
                      <label
                        htmlFor="link"
                        className="block text-sm font-medium text-indigo-300"
                      >
                        Meeting / Map Link
                      </label>
                      <input
                        id="link"
                        type="url"
                        name="link"
                        value={classData.link}
                        onChange={handleInputChange}
                        placeholder="Enter meeting link"
                        className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                        required
                      />
                    </div>
                  
                </div>
              </div>
            )}

            {step === 3 && renderSummary()}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition duration-300"
                >
                  <MdArrowBack className="mr-2" />
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid}
                  className={`flex items-center px-4 py-2 text-sm text-white rounded-lg transition duration-300 ${
                    !isStepValid
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500"
                  }`}
                >
                  Next
                  <MdArrowForward className="ml-2" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-500 transition duration-300"
                >
                  Create Class
                  <MdCheck className="ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateClassPage;
