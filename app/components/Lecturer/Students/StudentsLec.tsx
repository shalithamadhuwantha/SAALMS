"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface Student {
   id: number;
   name: string;
   email: string;
   registrationNumber: string;
}

const Modal = ({
   isOpen,
   onClose,
   title,
   children,
}: {
   isOpen: boolean;
   onClose: () => void;
   title: string;
   children: React.ReactNode;
}) => {
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

const AttendingSystem = () => {
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
      setStudents([...students, { ...newStudent, id: students.length + 1 }]);
      setNewStudent({ id: 0, name: "", email: "", registrationNumber: "" });
      setIsAddModalOpen(false);
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
      const updatedStudents = students.map((student) =>
         student.id === editingStudent.id ? editingStudent : student
      );
      setStudents(updatedStudents);
      setIsEditModalOpen(false);
   };

   const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = () => {
            const csvData = reader.result as string;
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

   return (
      <div className="container p-4 lg:p-8 lg:pt-2">
         <h1 className="text-xl font-semibold mb-4">Student Registration</h1>
         <div className="my-6 flex flex-wrap gap-2">
            <button
               onClick={() => setIsAddModalOpen(true)}
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex-1 sm:flex-none"
            >
               Add Student
            </button>
            <button
               onClick={() => setIsBulkUploadModalOpen(true)}
               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex-1 sm:flex-none"
            >
               Add Students in Bulk
            </button>
         </div>

         {/* Student List in a Card with Gradient */}
         <div className="card w-full bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl p-4 text-white">
            <div className="card-body">
               <div className="flex flex-row">
                  <h2 className="card-title"> Student List </h2>
                  <button onClick={console.log} className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg ml-auto">
                     Push
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
               className="p-2 mb-2 w-full border border-gray-400 rounded-lg bg-slate-800"
            />
            <input
               type="email"
               value={newStudent.email}
               onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
               placeholder="Email"
               className="p-2 mb-2 w-full border border-gray-400 rounded-lg bg-slate-800"
            />
            <input
               type="text"
               value={newStudent.registrationNumber}
               onChange={(e) =>
                  setNewStudent({ ...newStudent, registrationNumber: e.target.value })
               }
               placeholder="Registration Number"
               className="p-2 mb-2 w-full border border-gray-400 rounded-lg bg-slate-800"
            />
            <button
               onClick={handleAddStudent}
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
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
               className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
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
               className="p-2 mb-2 w-full border bg-slate-800 rounded-lg"
            />
         </Modal>
      </div>
   );
};

export default AttendingSystem;