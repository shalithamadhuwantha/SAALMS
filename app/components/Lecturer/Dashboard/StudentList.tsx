import React, { useState, useEffect } from "react";
import { GiCheckMark } from "react-icons/gi";
import { signOut, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { CiMedicalClipboard } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";


interface Student {
  id: number;
  name: string;
  email: string;
  registrationNumber: string;
  attendance?: string; // Optional property for attendance state
}

const StudentList = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [filterDate, setFilterDate] = useState<string>(""); // State for filter date
  const [classHeldDates, setClassHeldDates] = useState<string[]>([]);
  const [students, setStudents] = useState<Student[]>([]); // State for storing fetched students
  const [idcode, setidcode] = useState<String>(""); // State for storing fetched students
  const [copied, setCopied] = useState(false);
  const { data: session, status } = useSession();
  const [classId, setClassId] = useState<string>(""); // State for class ID
  const [studentEmail, setStudentEmail] = useState<string>(""); 
  const router = useRouter();// State for student email

  // copy invite link to clip board
  const handleCopy = () => {
    const code = window.location.pathname.split("/").pop();
    const name = session?.user?.name;
    const textCls =
      `
` +
      name +
      ` invites you to join class ` +
      code +
      `
Use the link below to join the class 👇

    `;
    const link =
      textCls +
      window.location.href
        .replace("Lecturer", "Student")
        .replace("Course", "Enroll") +
      "#" +
      idcode;

    // Copy the link to the clipboard
    navigator.clipboard
      .writeText(link)
      .then(() => {
        // Set copied state to true for feedback
        setCopied(true);
        toast("Liked Copyed Successfully!", {
          icon: "✅",
          style: {
            background: "#0f172a",
            color: "#0f0",
          },
        });
        // Reset copied state after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  // fetstudent from the table

  const fetchStudents = async () => {
    const courseCodeURL = window.location.pathname.split("/").pop();
    try {
      const response = await fetch("/api/attandace/search/bydate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: filterDate,
          lectureId: courseCodeURL,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setStudents(data.students || []); // Update state with the fetched students
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // add student attendace manually

  const updateAttendance = async () => {
    try {
      const response = await fetch("/api/attandace/add", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classId: idcode,
          studentEmail: studentEmail,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast("Attendance updated successfully!", {
          icon: "✅",
          style: {
            background: "#0f172a",
            color: "#0f0",
          },
        });
        // alert('Attendance updated successfully!');
      } else {
        console.log(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast("Failed to update attendance.!", {
        icon: "⚠️",
        style: {
          background: "#0f172a",
          color: "#fff",
        },
      });
      // alert('Failed to update attendance.');
    }
  };

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const courseCodeURL = window.location.pathname.split("/").pop();
      try {
        const response = await fetch("/api/attandace/search/lecid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lectureId: courseCodeURL }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data.attendance[0]._id);
        setidcode(data.attendance[0]._id);

        if (data.attendance) {
          const fetchedDates: string[] = data.attendance.map(
            (record: { createdAt: string }) =>
              new Date(record.createdAt).toISOString().split("T")[0]
          );

          // Set unique class held dates
          const uniqueDates = Array.from(new Set(fetchedDates));
          setClassHeldDates(uniqueDates);

          // Automatically select the first date
          if (uniqueDates.length > 0) {
            setFilterDate(uniqueDates[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();

    if (filterDate) {
      fetchStudents();
    } else {
      setStudents([]); // Clear students if no date is selected
    }
  }, [filterDate]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (filterDate) {
        fetchStudents();
      }
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [filterDate]);
  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };


  const handelUpdatestdnBTN = () =>{
   const id = window.location.pathname.split("/").pop();
   router.push("/Lecturer/addstudent/"+id)
  }

  const handelupdateAtdnc = async (mail: string) => {
    setStudentEmail(mail);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-blue-950 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">
                Confirm Attendance Update
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Are you sure you want to update attendance {mail}?
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => {
              updateAttendance(); // Log the confirmation message
              toast.dismiss(t.id); // Dismiss the toast
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    ));

    // updateAttendance()
  };

  return (
    <div className="container mx-auto p-4 bg-navy-900">
      <button onClick={handelUpdatestdnBTN} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-full	 float-end	">
      Add/Edit
      </button>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <h2 className="text-2xl font-bold mb-4 text-blue-200">Student List</h2>
      <p
        className="text-blue-200 mr-2 break-all cursor-pointer mb-3 "
        onClick={handleCopy}
      >
        <b>Invite Link:</b>{" "}
        {window.location.href
          .replace("Lecturer", "Student")
          .replace("Course", "Enroll") +
          "#" +
          idcode}
      </p>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="filterDate" className="text-blue-200 mr-2">
            Filter by Date:
          </label>
          <select
            id="filterDate"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-gray-700 text-blue-200 border border-gray-600 rounded-lg px-3 py-2"
          >
            <option value="">Select a date</option>
            {classHeldDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-gray-800">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-gray-300">ID</th>
              <th className="px-4 py-2 text-left text-gray-300">Name</th>
              <th className="px-4 py-2 text-left text-gray-300">Email</th>
              <th className="px-4 py-2 text-left text-gray-300">
                Registration Number
              </th>
              <th className="px-4 py-2 text-left text-gray-300">State</th>
              <th className="px-4 py-2 text-left text-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-700">
                <td className="px-4 py-2 text-blue-200">{student.id}</td>
                <td className="px-4 py-2 text-blue-200">{student.name}</td>
                <td className="px-4 py-2 text-blue-200">{student.email}</td>
                <td className="px-4 py-2 text-blue-200">
                  {student.registrationNumber}
                </td>
                <td className="px-4 py-2 text-blue-200">
                  {student.attendance}
                </td>
                <td className="px-4 py-2 text-blue-200">
                  <button
                    className="btn btn-outline btn-accent"
                    onClick={() => handelupdateAtdnc(student.email)}
                  >
                    <GiCheckMark />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
