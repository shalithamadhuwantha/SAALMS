import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { MdDownload, MdRefresh, MdPieChart, MdEdit, MdClose, MdSave, MdQrCode2 } from 'react-icons/md';
import StudentList from './StudentList'; // Import the StudentList component

interface Student {
  id: number;
  name: string;
  email: string;
  registrationNumber: string;
}

const LecturerDashboard: React.FC = () => {
  const [qrValue, setQrValue] = useState<string>('');
  const [attendance, setAttendance] = useState<number>(0);
  const [absent, setAbsent] = useState<number>(0);
  const [view, setView] = useState<'attendance' | 'report'>('attendance');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]); // New state for students
  const [classDetails, setClassDetails] = useState({
    classCode: 'CMT1204',
    className: 'Introduction to Programming',
    batch: '21/22',
    department: 'BICT',
    date: '2024-09-22',
    time: '10:00 AM',
    classType: 'physical',
    totalStudents: 30
  });

  useEffect(() => {
    setQrValue(`attendance-${Math.random().toString(36).substr(2, 9)}`);
    const interval = setInterval(() => {
      setAttendance(prev => Math.min(prev + Math.floor(Math.random() * 3), classDetails.totalStudents));
      setAbsent(prev => Math.max(classDetails.totalStudents - attendance, 0));
    }, 5000);

    // Simulate fetching students data
    const dummyStudents: Student[] = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      email: `student${i + 1}@example.com`,
      registrationNumber: `REG${1000 + i}`
    }));
    setStudents(dummyStudents);

    return () => clearInterval(interval);
  }, [classDetails.totalStudents]);

  const handleGenerateReport = () => {
    console.log("Generating report for month:", selectedMonth);
  };

  const handleDownloadReport = () => {
    console.log("Downloading report for month:", selectedMonth);
  };

  const handleUpdateDetails = () => {
    setIsEditing(true);
  };

  const handleSaveDetails = () => {
    setIsEditing(false);
    console.log("Saving updated class details:", classDetails);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditStudent = (student: Student) => {
    console.log("Editing student:", student);
    // Implement edit functionality
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const renderAttendanceView = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-300">Real Time Attendance</h2>
        <button 
          onClick={() => setView('report')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full transition-colors duration-300 flex items-center shadow-lg"
        >
          <MdPieChart className="mr-2" /> Generate Report
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-center shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Attendance</h3>
          <p className="text-4xl font-bold">{attendance}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-center shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Absent</h3>
          <p className="text-4xl font-bold">{absent}</p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-center shadow-lg mt-6">
        <h3 className="text-lg font-semibold mb-2">Total</h3>
        <p className="text-4xl font-bold">{attendance + absent}</p>
      </div>
    </>
  );

  const renderReportView = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-300">Generate Attendance Report</h2>
        <button 
          onClick={() => setView('attendance')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full transition-colors duration-300 flex items-center shadow-lg"
        >
          <MdRefresh className="mr-2" /> Real Time Attendance
        </button>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="month" className="block text-lg font-medium text-gray-300 mb-2">
            Select Month
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
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
          onClick={handleGenerateReport}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-lg transition-colors duration-300 text-lg font-semibold shadow-lg"
        >
          Generate Report
        </button>
        <button
          onClick={handleDownloadReport}
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 rounded-lg transition-colors duration-300 flex items-center justify-center text-lg font-semibold shadow-lg"
        >
          <MdDownload className="mr-2" /> Download Report
        </button>
      </div>
    </>
  );

  const renderClassDetailsCard = () => (
    <div className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl rounded-2xl p-6 mt-8 relative">
      <h2 className="text-2xl font-bold mb-4 text-indigo-300">Class Details</h2>
      {isEditing ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={classDetails.classCode}
              onChange={(e) => setClassDetails({...classDetails, classCode: e.target.value})}
              placeholder="Class Code"
            />
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={classDetails.className}
              onChange={(e) => setClassDetails({...classDetails, className: e.target.value})}
              placeholder="Class Name"
            />
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={classDetails.batch}
              onChange={(e) => setClassDetails({...classDetails, batch: e.target.value})}
              placeholder="Batch"
            />
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={classDetails.department}
              onChange={(e) => setClassDetails({...classDetails, department: e.target.value})}
              placeholder="Department"
            />
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              type="date"
              value={classDetails.date}
              onChange={(e) => setClassDetails({...classDetails, date: e.target.value})}
            />
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              type="time"
              value={classDetails.time}
              onChange={(e) => setClassDetails({...classDetails, time: e.target.value})}
            />
            <select
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={classDetails.classType}
              onChange={(e) => setClassDetails({...classDetails, classType: e.target.value})}
            >
              <option value="physical">Physical</option>
              <option value="online">Online</option>
            </select>
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              type="number"
              value={classDetails.totalStudents}
              onChange={(e) => setClassDetails({...classDetails, totalStudents: parseInt(e.target.value)})}
              placeholder="Total Students"
            />
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow-lg transition-colors duration-300">
              <MdClose className="mr-1 inline" /> Cancel
            </button>
            <button onClick={handleSaveDetails} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-colors duration-300">
              <MdSave className="mr-1 inline" /> Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 text-gray-300">
            <p><strong className="text-white">Class Code:</strong> {classDetails.classCode}</p>
            <p><strong className="text-white">Class Name:</strong> {classDetails.className}</p>
            <p><strong className="text-white">Batch:</strong> {classDetails.batch}</p>
            <p><strong className="text-white">Department:</strong> {classDetails.department}</p>
            <p><strong className="text-white">Date:</strong> {classDetails.date}</p>
            <p><strong className="text-white">Time:</strong> {classDetails.time}</p>
            <p><strong className="text-white">Class Type:</strong> {classDetails.classType}</p>
            <p><strong className="text-white">Total Students:</strong> {classDetails.totalStudents}</p>
          </div>
          <button 
            onClick={handleUpdateDetails}
            className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-colors duration-300"
          >
            Update
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen text-white p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-indigo-300">QR Attendance</h2>
            <div className="flex justify-center items-center h-64 bg-white rounded-xl p-4 shadow-inner">
              <MdQrCode2 size={200} className="text-gray-800" />
            </div>
            <p className="text-center mt-6 text-lg text-gray-300">
              Scan this QR code to mark attendance
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl rounded-2xl p-6">
            {view === 'attendance' ? renderAttendanceView() : renderReportView()}
          </div>
        </div>

        {renderClassDetailsCard()}

        <div className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl rounded-2xl p-6 mt-8">
          <StudentList 
            students={students}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;