'use client';

import React, { useState } from 'react';
import { MdClass, MdQrCode, MdPictureAsPdf } from 'react-icons/md';

const LecturerDashboard = () => {
  const [currentAction, setCurrentAction] = useState('create-class');
  const [className, setClassName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [classCapacity, setClassCapacity] = useState('');

  const classes = [
    { id: 1, name: 'Introduction to Programming', students: 35, attendance: 90 },
    { id: 2, name: 'Data Structures', students: 28, attendance: 85 },
    { id: 3, name: 'Machine Learning', students: 22, attendance: 95 },
  ];

  const handleAction = (action: React.SetStateAction<string>) => {
    setCurrentAction(action);
  };

  const handleCreateClass = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log({ className, classCode, classCapacity });
    setClassName('');
    setClassCode('');
    setClassCapacity('');
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
                <label htmlFor="classCode" className="block text-sm font-medium text-gray-400">Class Code</label>
                <input
                  type="text"
                  id="classCode"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="classCapacity" className="block text-sm font-medium text-gray-400">Class Capacity</label>
                <input
                  type="number"
                  id="classCapacity"
                  value={classCapacity}
                  onChange={(e) => setClassCapacity(e.target.value)}
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
            <div className="bg-white p-4 rounded-lg">
              <div className="w-48 h-48 mx-auto bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600">QR Code Placeholder</span>
              </div>
            </div>
            <p className="mt-4 text-center text-gray-400">Scan this QR code to mark attendance</p>
          </>
        );
      case 'generate-report':
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Generate Report</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="reportType" className="block text-sm font-medium text-gray-400">Report Type</label>
                <select
                  id="reportType"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                >
                  <option>Attendance Report</option>
                </select>
              </div>
              <div>
                <label htmlFor="dateRange" className="block text-sm font-medium text-gray-400">Date Range</label>
                <input
                  type="text"
                  id="dateRange"
                  placeholder="Select date range"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300 mb-2"
              >
                Generate Report
              </button>
              <button
                type="button"
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                Download Report
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
                <div key={cls.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
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