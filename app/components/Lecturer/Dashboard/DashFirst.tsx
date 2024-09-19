'use client';


import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MdAdd, MdFolder, MdSettings, MdEmail, MdSchool, MdBusinessCenter, MdQrCode } from 'react-icons/md';

interface Course {
  id: string;
  name: string;
  code: string;
  batch: string;
  bgColor: string;
}

const StudentDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', code: '', batch: '' });
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Web Tech", code: "ICT 1209", batch: "21/22 Batch", bgColor: "bg-indigo-600" },
    { id: "2", name: "Skills Devel", code: "ICT 1108", batch: "21/22 Batch", bgColor: "bg-yellow-600" },
    { id: "3", name: "Human Co", code: "ICT 1207", batch: "21/22 Batch", bgColor: "bg-green-600" },
  ]);

  const student = {
    name: "Guest User",
    email: "itt2022000@tec.rjt.ac.lk",
    faculty: "Faculty of Technology",
    department: "ICT Department",
    avatarBgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
    avatarText: "GU"
  };

  const route = useRouter();

  const handleCreateClass = () => {
    if (newClass.name && newClass.code && newClass.batch) {
      const newCourse: Course = {
        id: (courses.length + 1).toString(),
        ...newClass,
        bgColor: `bg-${['indigo', 'purple', 'blue', 'green', 'yellow', 'red'][Math.floor(Math.random() * 6)]}-600`
      };
      setCourses([...courses, newCourse]);
      setNewClass({ name: '', code: '', batch: '' });
      setIsModalOpen(false);
    }
  };

  

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-full ${student.avatarBgColor} flex items-center justify-center text-white text-2xl font-bold mr-4 shadow-lg`}>
                {student.avatarText}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">{student.name}</h1>
                <div className="flex items-center text-sm text-gray-300 space-x-2">
                  <div className="flex items-center">
                    <MdEmail className="mr-1" size={16} />
                    <span>{student.email}</span>
                  </div>
                  <span>|</span>
                  <div className="flex items-center">
                    <MdSchool className="mr-1" size={16} />
                    <span>{student.faculty}</span>
                  </div>
                  <span>|</span>
                  <div className="flex items-center">
                    <MdBusinessCenter className="mr-1" size={16} />
                    <span>{student.department}</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition-colors duration-300 text-sm">
              <MdSettings size={20} className="mr-1" />
              Settings
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-48"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="p-6 text-white h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">Create New Class</h2>
                <p className="text-lg mb-4">Add a new course to your dashboard</p>
              </div>
              <div className="mt-4 flex items-center justify-center bg-white bg-opacity-20 rounded-full w-12 h-12 self-end">
                <MdAdd size={32} className="text-white" />
              </div>
            </div>
          </div>
          {courses.map((course) => (
            <div key={course.id} className={`${course.bgColor} rounded-lg shadow-md overflow-hidden h-48 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
              <div className="p-4 text-white flex-grow">
                <h2 className="text-2xl font-bold mb-2">{course.code}</h2>
                <p className="text-lg mb-2">{course.name}</p>
                <p className="text-sm">{course.batch}</p>
              </div>
              <div className="bg-black bg-opacity-20 p-2 flex justify-end mt-auto">
                <button className="text-white hover:text-gray-300 transition-colors duration-300 mx-2">
                  <MdQrCode size={24} />
                </button>
                <button className="text-white hover:text-gray-300 transition-colors duration-300 mx-2" >
                  <MdFolder size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4 text-white">Create New Class</h2>
            <input
              className="w-full p-2 mb-4 border rounded bg-gray-700 text-white placeholder-gray-400"
              placeholder="Class Name"
              value={newClass.name}
              onChange={(e) => setNewClass({...newClass, name: e.target.value})}
            />
            <input
              className="w-full p-2 mb-4 border rounded bg-gray-700 text-white placeholder-gray-400"
              placeholder="Class Code"
              value={newClass.code}
              onChange={(e) => setNewClass({...newClass, code: e.target.value})}
            />
            <input
              className="w-full p-2 mb-4 border rounded bg-gray-700 text-white placeholder-gray-400"
              placeholder="Batch (e.g., 21/22)"
              value={newClass.batch}
              onChange={(e) => setNewClass({...newClass, batch: e.target.value})}
            />
            <div className="flex justify-end">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded mr-2 transition-colors duration-300" onClick={handleCreateClass}>Create</button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-300" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;