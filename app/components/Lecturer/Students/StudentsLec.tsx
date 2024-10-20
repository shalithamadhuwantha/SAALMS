"use client";

import React, { useState , useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { CgPushUp } from "react-icons/cg";
import { IoIosDownload } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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
            transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
    >
      <div
        className={`bg-gray-700 p-6 rounded-lg max-w-md transform transition-transform
               duration-300 ${isOpen ? "scale-100" : "scale-95"}`}
      >
        <div className="flex flex-row mb-3">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="ml-auto">
            <IoMdClose className="bg-gray-700 hover:text-red-700 text-xl" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};




export interface GreetingProps {
  name: string;
  code: string; // Optional prop
}

const AddStudent: React.FC<GreetingProps> = ({ name, code }) => {

  // utils/fetchStudents.ts
const [datalist , setdatalist] = useState<String[]>([])

  // console.log(name);
  useEffect(() => {
    // Set the demo students array to the state when the component mounts
    const fetchStudents = async () => {
      const id = window.location.pathname.split("/").pop()
      const response = await fetch('/api/course/find', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              code: id
          }),
      });
    
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
    
      const data = await response.json();
      setdatalist(data.course.students);
      
      setStudents(data.course.students);
      return data.course.students; // Return the students array
    };
    fetchStudents()
  
    
   
  
    // Update the students state with demo data
   
  }, []);
  
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
  const router = useRouter();

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.registrationNumber) {
      setStudents([...students, { ...newStudent, id: students.length + 1 }]);
      setNewStudent({ id: 0, name: "", email: "", registrationNumber: "" });
      setIsAddModalOpen(false);
    } else {
      toast("All fields must be filled !", {
        icon: "⚠️",
        style: {
          background: "#0f172a",
          color: "#ebba34",
        },
      });
      // console.log("All fields must be filled");
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
    if (
      editingStudent.name &&
      editingStudent.email &&
      editingStudent.registrationNumber
    ) {
      const updatedStudents = students.map((student) =>
        student.id === editingStudent.id ? editingStudent : student
      );
      setStudents(updatedStudents);
      setIsEditModalOpen(false);
    } else {
      toast("All fields must be filled !", {
        icon: "⚠️",
        style: {
          background: "#0f172a",
          color: "#ebba34",
        },
      });
      console.log("All fields must be filled");
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

  const isAddButtonDisabled =
    !newStudent.name || !newStudent.email || !newStudent.registrationNumber;
  const isUpdateButtonDisabled =
    !editingStudent.name ||
    !editingStudent.email ||
    !editingStudent.registrationNumber;

  // console.log(name);

  const updatestudent = async () => {
    // console.log(students);

    try {
      const response = await fetch("/api/course/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          students: students,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Success toast
        toast("Student added successfully !", {
          icon: "✅",
          style: {
            background: "#0f172a",
            color: "#0f0",
          },
        });

        setTimeout(() => {
          router.push("/Lecturer/Course/"+window.location.pathname.split("/").pop() )
      }, 2000);

      } else {
        // Error toast with message from the server
        toast("Something is worng !", {
          icon: "❌",
          style: {
            background: "#0f172a",
            color: "#fff",
          },
        });
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container p-4 lg:p-8 lg:pt-2">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <header className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-indigo-300">
          {" "}
          Student Registration{" "}

          
        </h1>

        <h3 className="text-xl font-bold text-indigo-600">
          {name} ({code})
          <br />
        </h3>
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
            <span className="text-red-600"> ⚠️ After adding all the student details, make sure to <b>click the 'Update' button </b> to securely save the information. !</span>
      </header>

      {/* Student List */}
      <div className="card w-full bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl p-4 text-white">
        <div className="card-body">
          <div className="flex flex-row">
            <h2 className="card-title"> Student List </h2>
            <button
              onClick={() => updatestudent()}
              className="bg-amber-500 hover:bg-amber-700 ml-auto text-white px-5 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none 
                     focus:ring-2 focus:ring-opacity-50 shadow-xl text-sm sm:text-base flex items-center justify-center space-x-2 font-semibold"
            >
<<<<<<< Updated upstream
              Push
=======
              Update
>>>>>>> Stashed changes
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
                    <td className="text-center">
                      {student.registrationNumber}
                    </td>
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
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
          placeholder="Name"
          className="p-2 mb-2 w-full border rounded-lg bg-slate-800 input input-bordered input-primary"
        />
        <input
          type="email"
          value={newStudent.email}
          onChange={(e) =>
            setNewStudent({ ...newStudent, email: e.target.value })
          }
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
          className={`font-bold py-2 text-indigo-50 px-4 rounded-lg mt-4 btn ${
            isAddButtonDisabled ? "btn-disabled" : "btn-active btn-primary"
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
          onChange={(e) =>
            setEditingStudent({ ...editingStudent, name: e.target.value })
          }
          placeholder="Name"
          className="p-2 mb-2 w-full border rounded-lg bg-slate-800 input input-bordered input-primary"
        />
        <input
          type="email"
          value={editingStudent.email}
          onChange={(e) =>
            setEditingStudent({ ...editingStudent, email: e.target.value })
          }
          placeholder="Email"
          className="p-2 mb-2 w-full border rounded-lg bg-slate-800 input input-bordered input-primary"
        />
        <input
          type="text"
          value={editingStudent.registrationNumber}
          onChange={(e) =>
            setEditingStudent({
              ...editingStudent,
              registrationNumber: e.target.value,
            })
          }
          placeholder="Registration Number"
          className="p-2 mb-2 w-full border rounded-lg bg-slate-800 input input-bordered input-primary"
        />
        <button
          onClick={handleUpdateStudent}
          disabled={isUpdateButtonDisabled}
          className={`font-bold text-indigo-50 py-2 px-4 rounded-lg mt-4 btn ${
            isUpdateButtonDisabled ? "btn-disabled" : "btn-active btn-primary"
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
        <button
          onClick={() => router.push("/dummy.csv")}
          className="bg-blue-600 hover:bg-blue-800 text-white px-2 py-2 self-center justify-self-center	 mb-5 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none 
     focus:ring-2 focus:ring-opacity-50 focus:ring-blue-300 shadow-lg text-sm sm:text-base flex items-center justify-center space-x-2 font-medium"
        >
          <IoIosDownload className="text-lg sm:text-xl" />
          Download Dummy File
        </button>
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
