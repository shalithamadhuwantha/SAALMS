"use client";

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaUserPlus, FaUsers } from 'react-icons/fa';
import { CgPushUp } from "react-icons/cg";

interface Student {
   id: number;
   name: string;
   email: string;
   registrationNumber: string;
}

const Modal: React.FC<{
   isOpen: boolean;
   onClose: () => void;
   title: string;
   children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
   return (
      <div
         className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center 
            transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
         <div
            className={`bg-gray-700 p-6 rounded-lg max-w-md transform transition-transform
               duration-300 ${isOpen ? "scale-100" : "scale-95"}`}
         >
            <div className="flex flex-row mb-3">
               <h2 className="text-xl font-semibold">{title}</h2>
               <button
                  onClick={onClose}
                  className="ml-auto"
               >
                  <IoMdClose className="bg-gray-700 hover:text-red-700 text-xl" />
               </button>
            </div>
            {children}
         </div>
      </div>
   );
};

const AddStudent: React.FC = () => {
   const [students, setStudents] = useState<Student[]>([]);
   const [newStudent, setNewStudent] = useState<Student>({
      id: 0,
      name: "",
      email: "",
      registrationNumber: "",
   });
   const [editingStudent, setEditingStudent] = useState<Student>({
      id: 0,
      name: "",
      email: "",
      registrationNumber: "",
   });
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);

   const handleAddStudent = () => {
      if (newStudent.name && newStudent.email && newStudent.registrationNumber) {
         setStudents([...students, { ...newStudent, id: students.length + 1 }]);
         setNewStudent({ id: 0, name: "", email: "", registrationNumber: "" });
         setIsAddModalOpen(false);
      } else {
         console.log('All fields must be filled');
      }
   };

   const handleDeleteStudent = (id: number) => {
      const updatedStudents = students
         .filter((student) => student.id !== id)
         .map((student, index) => ({
            ...student,
            id: index + 1,
         }));
      setStudents(updatedStudents);
   };

   const handleEditStudent = (student: Student) => {
      setEditingStudent(student);
      setIsEditModalOpen(true);
   };

   const handleUpdateStudent = () => {
      if (editingStudent.name && editingStudent.email && editingStudent.registrationNumber) {
         const updatedStudents = students.map((student) =>
            student.id === editingStudent.id ? editingStudent : student
         );
         setStudents(updatedStudents);
         setIsEditModalOpen(false);
      } else {
         console.log('All fields must be filled');
      }
   };

   const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = (e) => {
            const csvData = e.target?.result as string;
            const csvLines = csvData.split("\n");
            const newStudents: Student[] = [];
            csvLines.forEach((line, index) => {
               if (index === 0) return;
               const [name, email, registrationNumber] = line.split(",");
               if (name && email && registrationNumber) {
                  newStudents.push({
                     id: students.length + newStudents.length + 1,
                     name,
                     email,
                     registrationNumber,
                  });
               }
            });
            setStudents([...students, ...newStudents]);
         };
         reader.readAsText(file);
      }
      setIsBulkUploadModalOpen(false);
   };

   const isAddButtonDisabled = !newStudent.name || !newStudent.email || !newStudent.registrationNumber;
   const isUpdateButtonDisabled = !editingStudent.name || !editingStudent.email || !editingStudent.registrationNumber;

   return (
      <div className="container p-4 lg:p-8 lg:pt-2">
         <header className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-indigo-300"> Student Registration </h1>
            <div className="my-6 flex flex-wrap gap-4">
               <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="text-white px-14 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none font-semibold
                     focus:ring-2 focus:ring-opacity-50 shadow-xl text-sm sm:text-base flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-700"
               >
                  <FaUserPlus className="mr-3 text-xl sm:text-2xl" />
                  Add Student
               </button>
               <button
                  onClick={() => setIsBulkUploadModalOpen(true)}
                  className="bg-green-500 hover:bg-green-700 text-white px-7 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none 
                     focus:ring-2 focus:ring-opacity-50 shadow-xl text-sm sm:text-base flex items-center justify-center space-x-2 font-semibold"
               >
                  <FaUsers className="mr-3 text-xl sm:text-2xl" />
                  Add Students in Bulk
               </button>
            </div>
         </header>

         {/* Student List */}
         <div className="card w-full bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl p-4 text-white">
            <div className="card-body">
               <div className="flex flex-row">
                  <h2 className="card-title"> Student List </h2>
                  <button onClick={() => console.log("Push button clicked")} className="bg-amber-500 hover:bg-amber-700 ml-auto text-white px-5 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none 
                     focus:ring-2 focus:ring-opacity-50 shadow-xl text-sm sm:text-base flex items-center justify-center space-x-2 font-semibold">
                     Push
                     <CgPushUp className="ml-3 text-xl sm:text-xl" />
                  </button>
               </div>
               <div className="overflow-x-auto">
                  <table className="table w-full">
                     <thead>
                        <tr className="text-base">
                           <th>ID</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Registration Number</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {students.map((student) => (
                           <tr key={student.id}>
                              <td>{student.id}</td>
                              <td>{student.name}</td>
                              <td>{student.email}</td>
                              <td className="text-center">{student.registrationNumber}</td>
                              <td>
                                 <button
                                    onClick={() => handleEditStudent(student)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded-lg mr-2 text-xs"
                                 >
                                    Edit
                                 </button>
                                 <button
                                    onClick={() => handleDeleteStudent(student.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg text-xs mt-1"
                                 >
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Add Student Modal */}
         <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            title="Add New Student"
         >
            <input
               type="text"
               value={newStudent.name}
               onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
               placeholder="Name"
               className="p-2 mb-2 w-full border rounded-lg bg-slate-800 input input-bordered input-primary"
            />
            <input
               type="email"
               value={newStudent.email}
               onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
               placeholder="Email"
               className="p-2 mb-2 w-full border rounded-lg bg-slate-800 input input-bordered input-primary"
            />
            <input
               type="text"
               value={newStudent.registrationNumber}
               onChange={(e) =>
                  setNewStudent({ ...newStudent, registrationNumber: e.target.value })
               }
               placeholder="Registration Number"
               className="p-2 mb-2 w-full border rounded-lg bg-slate-800 input input-bordered input-primary"
            />
            <button
               onClick={handleAddStudent}
               disabled={isAddButtonDisabled}
               className={`font-bold py-2 px-4 rounded-lg mt-4 btn ${isAddButtonDisabled
                  ? 'btn-disabled'
                  : 'btn-active btn-primary'
                  }`}
            >
               Add Student
            </button>
         </Modal>

         {/* Edit Student Modal */}
         <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Student"
         >
            <input
               type="text"
               value={editingStudent.name}
               onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
               placeholder="Name"
               className="p-2 mb-2 w-full border border-gray-400 rounded-lg bg-slate-800"
            />
            <input
               type="email"
               value={editingStudent.email}
               onChange={(e) =>
                  setEditingStudent({ ...editingStudent, email: e.target.value })
               }
               placeholder="Email"
               className="p-2 mb-2 w-full border border-gray-400 rounded-lg bg-slate-800"
            />
            <input
               type="text"
               value={editingStudent.registrationNumber}
               onChange={(e) =>
                  setEditingStudent({ ...editingStudent, registrationNumber: e.target.value })
               }
               placeholder="Registration Number"
               className="p-2 mb-2 w-full border border-gray-400 rounded-lg bg-slate-800"
            />
            <button
               onClick={handleUpdateStudent}
               disabled={isUpdateButtonDisabled}
               className={`font-bold py-2 px-4 rounded-lg mt-4 btn ${isUpdateButtonDisabled ? 'btn-disabled' : 'btn-active btn-primary'
                  }`}
            >
               Update Student
            </button>
         </Modal>

         {/* Bulk Upload Modal */}
         <Modal
            isOpen={isBulkUploadModalOpen}
            onClose={() => setIsBulkUploadModalOpen(false)}
            title="Bulk Upload Students"
         >
            <input
               type="file"
               accept=".csv"
               onChange={handleBulkUpload}
               className="p-2 mb-2 border bg-slate-800 rounded-lg file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
         </Modal>
      </div>
   );
};

export default AddStudent;