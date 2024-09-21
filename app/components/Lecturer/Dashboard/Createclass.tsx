'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdArrowBack, MdArrowForward, MdCheck } from 'react-icons/md';
import StudentsLec from '../Students/StudentsLec'; // Updated import path

interface ClassData {
  code: string;
  name: string;
  batch: string;
  lessonName: string;
  date: string;
  time: string;
  type: 'physical' | 'online';
  link: string;
  additionalLink: string;
  students: string[];
}

const CreateClassPage: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [isStepValid, setIsStepValid] = useState<boolean>(false);
  const [classData, setClassData] = useState<ClassData>({
    code: '',
    name: '',
    batch: '',
    lessonName: '',
    date: '',
    time: '',
    type: 'physical',
    link: '',
    additionalLink: '',
    students: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClassData(prevData => ({
      ...prevData,
      [name]: name === 'code' ? value.toUpperCase().replace(/[^A-Z0-9]/g, '') : value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Class created:", classData);
    router.push('/dashboard');
  };

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  useEffect(() => {
    const validateStep = () => {
      switch (step) {
        case 1:
          setIsStepValid(Boolean(classData.code && classData.name && classData.batch));
          break;
        case 2:
          setIsStepValid(Boolean(classData.lessonName && classData.date && classData.time &&
            (classData.type !== 'online' || (classData.type === 'online' && classData.link))));
          break;
        case 3:
          setIsStepValid(classData.students.length > 0);
          break;
        default:
          setIsStepValid(false);
      }
    };
    validateStep();
  }, [classData, step]);

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl transition-all duration-300 ease-in-out relative overflow-hidden w-full max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-300">Create New Class</h2>
          
          <ul className="steps w-full mb-8">
            <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Register</li>
            <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Class Info</li>
            <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Students</li>
          </ul>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="code" className="block text-sm font-medium text-indigo-300">Class Code</label>
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
                  <label htmlFor="name" className="block text-sm font-medium text-indigo-300">Class Name</label>
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
                  <label htmlFor="batch" className="block text-sm font-medium text-indigo-300">Batch</label>
                  <input
                    id="batch"
                    type="text"
                    name="batch"
                    value={classData.batch}
                    onChange={handleInputChange}
                    placeholder="Enter batch (e.g., 21/22)"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="lessonName" className="block text-sm font-medium text-indigo-300">Lesson Name</label>
                  <input
                    id="lessonName"
                    type="text"
                    name="lessonName"
                    value={classData.lessonName}
                    onChange={handleInputChange}
                    placeholder="Enter lesson name"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm font-medium text-indigo-300">Date</label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={classData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="time" className="block text-sm font-medium text-indigo-300">Time</label>
                  <input
                    id="time"
                    type="time"
                    name="time"
                    value={classData.time}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="block text-sm font-medium text-indigo-300">Class Type</label>
                  <select
                    id="type"
                    name="type"
                    value={classData.type}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                  >
                    <option value="physical">Physical</option>
                    <option value="online">Online</option>
                  </select>
                </div>
                {classData.type === 'online' && (
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="link" className="block text-sm font-medium text-indigo-300">Online Meeting Link</label>
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
                )}
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="additionalLink" className="block text-sm font-medium text-indigo-300">Additional Link (Optional)</label>
                  <input
                    id="additionalLink"
                    type="url"
                    name="additionalLink"
                    value={classData.additionalLink}
                    onChange={handleInputChange}
                    placeholder="Enter additional link"
                    className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-indigo-500 transition duration-300"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <StudentsLec>
                  {/* Pass necessary props to StudentsLec component */}
                  {/* For example: */}
                  {/* <StudentsLec 
                    students={classData.students}
                    onAddStudent={(newStudent) => setClassData(prevData => ({
                      ...prevData,
                      students: [...prevData.students, newStudent]
                    }))}
                  /> */}
                </StudentsLec>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-700 rounded-lg text-sm hover:bg-gray-600 transition duration-300 flex items-center space-x-2"
                >
                  <MdArrowBack className="text-xl" />
                  <span>Previous</span>
                </button>
              )}
              <button 
                type={step < 3 ? "button" : "submit"}
                onClick={step < 3 ? nextStep : undefined}
                className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition duration-300 flex items-center space-x-2 ${isStepValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-500 cursor-not-allowed'}`}
                disabled={!isStepValid}
              >
                <span>{step < 3 ? 'Continue' : 'Create Class'}</span>
                {step < 3 ? <MdArrowForward className="text-xl" /> : <MdCheck className="text-xl" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateClassPage;