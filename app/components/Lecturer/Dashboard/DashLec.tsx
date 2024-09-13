"use client";

import React, { useState, useEffect } from 'react';
import { MdClass, MdQrCode, MdPictureAsPdf, MdSchedule, MdDownload } from 'react-icons/md';

interface Class {
  id: number;
  name: string;
  students: number;
  attendance: number;
}

const LecturerDashboard: React.FC = () => {
  const [currentAction, setCurrentAction] = useState<string>('create-class');
  const [className, setClassName] = useState<string>('');
  const [enrollLink, setEnrollLink] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [qrValue, setQrValue] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [lessonName, setLessonName] = useState<string>('');
  const [lessonDate, setLessonDate] = useState<string>('');
  const [lessonTime, setLessonTime] = useState<string>('');
  const [lessonType, setLessonType] = useState<string>('physical');
  const [lessonLocation, setLessonLocation] = useState<string>('');

  const classes: Class[] = [
    { id: 1, name: 'Introduction to Programming', students: 35, attendance: 90 },
    { id: 2, name: 'Data Structures', students: 28, attendance: 85 },
    { id: 3, name: 'Machine Learning', students: 22, attendance: 95 },
  ];

  useEffect(() => {
    setQrValue(`attendance-${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  const handleAction = (action: string) => {
    setCurrentAction(action);
  };

  const handleCreateClass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ className, enrollLink });
    setClassName('');
    setEnrollLink('');
  };

  const handleGenerateReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Generating report for month:", selectedMonth);
  };

  const handleScheduleClass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ lessonName, lessonDate, lessonTime, lessonType, lessonLocation });
  };

  const renderActionContent = () => {
    switch (currentAction) {
      case 'create-class':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Create New Class</h2>
            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label htmlFor="className" className="block text-sm font-medium text-gray-400">Class Name</label>
                <input
                  type="text"
                  id="className"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="enrollLink" className="block text-sm font-medium text-gray-400">Enroll Link</label>
                <input
                  type="text"
                  id="enrollLink"
                  value={enrollLink}
                  onChange={(e) => setEnrollLink(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                Create Class
              </button>
            </form>
          </>
        );
      case 'qr-attendance':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">QR Attendance</h2>
            <div className="flex justify-center items-center h-64">
              <img src="/api/placeholder/200/200" alt="QR Code Placeholder" className="border-4 border-white" />
            </div>
            <p className="text-center mt-4 text-sm text-gray-400">
              Scan this QR code to mark attendance
            </p>
          </>
        );
      case 'generate-report':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Generate Attendance Report</h2>
            <form onSubmit={handleGenerateReport} className="space-y-4">
              <div>
                <label htmlFor="month" className="block text-sm font-medium text-gray-400">Select Month</label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                  required
                >
                  <option value="">Select a month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                Generate Report
              </button>
            </form>
            <button
              onClick={() => console.log("Downloading report...")}
              className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300 flex items-center justify-center"
            >
              <MdDownload className="mr-2" /> Download Report
            </button>
          </>
        );
      case 'class-schedule':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Schedule a Class</h2>
            <form onSubmit={handleScheduleClass} className="space-y-4">
              <div>
                <label htmlFor="lessonName" className="block text-sm font-medium text-gray-400">Lesson Name</label>
                <input
                  type="text"
                  id="lessonName"
                  value={lessonName}
                  onChange={(e) => setLessonName(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="lessonDate" className="block text-sm font-medium text-gray-400">Date</label>
                <input
                  type="date"
                  id="lessonDate"
                  value={lessonDate}
                  onChange={(e) => setLessonDate(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="lessonTime" className="block text-sm font-medium text-gray-400">Time</label>
                <input
                  type="time"
                  id="lessonTime"
                  value={lessonTime}
                  onChange={(e) => setLessonTime(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="lessonType" className="block text-sm font-medium text-gray-400">Type</label>
                <select
                  id="lessonType"
                  value={lessonType}
                  onChange={(e) => setLessonType(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                  required
                >
                  <option value="physical">Physical</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <div>
                <label htmlFor="lessonLocation" className="block text-sm font-medium text-gray-400">Location</label>
                <input
                  type="text"
                  id="lessonLocation"
                  value={lessonLocation}
                  onChange={(e) => setLessonLocation(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                Schedule Class
              </button>
            </form>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-indigo-300 mb-6">Lecturer Dashboard</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: MdClass, label: 'Create Class', action: 'create-class', color: 'bg-blue-600 hover:bg-blue-700' },
              { icon: MdQrCode, label: 'QR Attendance', action: 'qr-attendance', color: 'bg-purple-600 hover:bg-purple-700' },
              { icon: MdPictureAsPdf, label: 'Generate Report', action: 'generate-report', color: 'bg-red-600 hover:bg-red-700' },
              { icon: MdSchedule, label: 'Class Schedule', action: 'class-schedule', color: 'bg-yellow-600 hover:bg-yellow-700' },
            ].map((button) => (
              <button
                key={button.action}
                onClick={() => handleAction(button.action)}
                className={`${button.color} text-white px-5 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-xl text-sm sm:text-base flex items-center justify-center space-x-2 ${currentAction === button.action ? 'ring-2 ring-white' : ''}`}
              >
                <button.icon className="text-xl sm:text-2xl" />
                <span>{button.label}</span>
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            {renderActionContent()}
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Classes</h2>
            <div className="space-y-4">
              {classes.map((cls) => (
                <div 
                  key={cls.id} 
                  className={`flex items-center justify-between bg-gray-700 p-4 rounded-lg cursor-pointer transition-colors duration-300 ${selectedClass === cls.id ? 'ring-2 ring-indigo-500' : 'hover:bg-gray-600'}`}
                  onClick={() => setSelectedClass(cls.id)}
                >
                  <div>
                    <h3 className="font-semibold">{cls.name}</h3>
                    <p className="text-sm text-gray-400">{cls.students} students</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-indigo-400">{cls.attendance}%</p>
                    <p className="text-sm text-gray-400">Attendance</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;