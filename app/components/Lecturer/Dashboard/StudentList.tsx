import React, { useState } from 'react';

interface Student {
  id: number;
  name: string;
  email: string;
  registrationNumber: string;
}

interface StudentListProps {
  students: Student[];
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (id: number) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onEditStudent, onDeleteStudent }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    onEditStudent(updatedStudent);
    setShowEditModal(false);
  };

  return (
    <div className="container mx-auto p-4 bg-navy-900">
      <h2 className="text-2xl font-bold mb-4 text-blue-200">Student List</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-gray-800">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-gray-300">ID</th>
              <th className="px-4 py-2 text-left text-gray-300">Name</th>
              <th className="px-4 py-2 text-left text-gray-300">Email</th>
              <th className="px-4 py-2 text-left text-gray-300">Registration Number</th>
              <th className="px-4 py-2 text-left text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-700">
                <td className="px-4 py-2 text-blue-200">{student.id}</td>
                <td className="px-4 py-2 text-blue-200">{student.name}</td>
                <td className="px-4 py-2 text-blue-200">{student.email}</td>
                <td className="px-4 py-2 text-blue-200">{student.registrationNumber}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditStudent(student)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-1 px-2 rounded-lg text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteStudent(student.id)}
                      className="bg-red-500 hover:bg-red-600 text-gray-900 font-bold py-1 px-2 rounded-lg text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 shadow-xl rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-2 text-blue-200 hover:text-blue-300"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-blue-200">Edit Student</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-blue-200 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={selectedStudent.name}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 text-blue-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-200 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={selectedStudent.email}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 text-blue-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-200 text-sm font-bold mb-2" htmlFor="registrationNumber">
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  value={selectedStudent.registrationNumber}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, registrationNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 text-blue-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleUpdateStudent(selectedStudent)}
                  className="bg-blue-500 hover:bg-blue-600 text-gray-900 font-bold py-2 px-4 rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;