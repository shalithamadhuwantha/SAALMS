import Image from "next/image";
import React, { useState, useEffect } from "react";
import { PiStudentBold } from "react-icons/pi";
import {
  MdDownload,
  MdRefresh,
  MdPieChart,
  MdEdit,
  MdClose,
  MdSave,
  MdQrCode2,
} from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import StudentList from "./StudentList"; // Import the StudentList component
import AttendanceComponent from "./AttendaceFile";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";

import LoadingSpinner from "../../root/LoadingSpinner";

interface Student {
  id: number;
  name: string;
  email: string;
  registrationNumber: string;
}
interface StudentCSV {
  id: number;
  name: string;
  email: string;
  registrationNumber: string;
  attendance: string;
}

interface AttendanceRecord {
  _id: string;
  lectureId: string;
  students: StudentCSV[];
  createdAt: string;
  date: string;
}

const LecturerDashboard: React.FC = () => {
  const [qrValue, setQrValue] = useState<string>("");
  const [attendance, setAttendance] = useState<number>(0);
  const [absent, setAbsent] = useState<number>(0);
  const [view, setView] = useState<"attendance" | "report">("attendance");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [classId, setClassId] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const lectureDates = ["2024-09-01", "2024-09-05", "2024-09-10"];
  const [filterDate, setFilterDate] = useState<string>("");
  const [classHeldDates, setClassHeldDates] = useState<string[]>([]);
  const [attendanceData, setAttendanceData] = useState<any>(null);
  const [absentcounter, setabsentcounter] = useState<Number>(0);
  const [attendacecounter, setattendacecounter] = useState<Number>(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // New state for students
  const { data: session, status } = useSession();
  const [classDetails, setClassDetails] = useState({
    classCode: "CMT1204",
    className: "Introduction to Programming",
    batch: "21/22",
    department: "BICT",
    date: "2024-09-22",
    time: "10:00 AM",
    classType: "physical",
    totalStudents: 30,
    link: "zoom or map",
  });

  const getAttendance = async () => {
    const code = window.location.pathname.split("/").pop() || "";
    try {
      const data = await fetchLectureAttendance(code); // Await the fetch

      // Set the attendance data state
      setAttendanceData(data);

      // Initialize counters
      let attendaceCount = 0;
      let absentCount = 0;

      // Check if the fetched data is structured as expected
      if (
        data &&
        data.attendance &&
        data.attendance.length > 0 &&
        data.attendance[0].students
      ) {
        const students = data.attendance[0].students; // Extract students array

        // Loop through students
        for (let i = 0; i < students.length; i++) {
          // console.log(students[i].attendance); // Log attendance status

          // Count attendance based on the status
          if (students[i].attendance === "🔴") {
            absentCount++;
          } else if (students[i].attendance === "🟢") {
            attendaceCount++;
          }
        }

        // console.log("Attendance Count: ", attendaceCount);
        // console.log("Absent Count: ", absentCount);
        setattendacecounter(attendaceCount);
        setabsentcounter(absentCount);
      } else {
        console.error("Attendance data structure is not as expected", data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    setLoading(false);

    getAttendance();

    setQrValue(`attendance-${Math.random().toString(36).substr(2, 9)}`);
    const interval = setInterval(() => {
      setLoading(false);
      getAttendance();
      setLoading(false);
    }, 5000);

    // Simulate fetching students data
    const dummyStudents: Student[] = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      email: `student${i + 1}@example.com`,
      registrationNumber: `REG${1000 + i}`,
    }));
    setStudents(dummyStudents);

    // load the student data
    setLoading(false);
    const fetchClassDetails = async () => {
      setLoading(true);
      try {
        const Ccode = window.location.pathname.split("/").pop();
        console.log(Ccode);

        const response = await fetch("/api/course/find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: Ccode }), // Example course code
        });

        if (!response.ok) {
          throw new Error("Failed to fetch class details");
        }

        const data = await response.json();
        // Update the class details state with the response data
        const course = data.course;
        setClassDetails({
          classCode: course.code,
          className: course.name,
          batch: course.batch,
          date: course.date,
          time: course.time,
          classType: course.type,
          totalStudents: course.students.length,
          department: course.lessonName,
          link: course.link,
        });

        // Update students state with fetched data
        setLoading(false);
        setStudents(
          course.students.map((student: any) => ({
            id: student.id,
            name: student.name,
            email: student.email,
            registrationNumber: student.registrationNumber,
          }))
        );
      } catch (error) {
        setLoading(false);
        console.error("Error fetching class details:", error);
      }
      setLoading(false);
    };

    fetchClassDetails();
    const fetchAttendanceData = async () => {
      // setLoading(true);
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
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
    return () => clearInterval(interval);
  }, [classDetails.totalStudents]);

  // update courses details

  const handelUpdateBasic = async () => {
    setLoading(true);
    try {
      const courseCodeURL = window.location.pathname.split("/").pop();
      const response = await fetch("/api/course/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: courseCodeURL,
          name: classDetails.className,
          batch: classDetails.batch,
          lessonName: classDetails.department,
          date: classDetails.date,
          time: classDetails.time,
          type: classDetails.classType,
          link: classDetails.link,
        }),
      });

      const result = await response.json();
      setLoading(false);
      if (response.ok) {
        toast("Update Successfully!", {
          icon: "✅",
          style: {
            background: "#0f172a",
            color: "#0f0",
          },
        });
      } else {
        toast("ERROR: Fail to Update!", {
          icon: "❌",
          style: {
            background: "#0f172a",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error saving class details:", error);
    }

    setIsEditing(false); // Exit edit mode after saving
  };

  function convertToCSV(
    data: AttendanceRecord[],
    lectureId: string,
    createDate: string
  ): string {
    // CSV Header
    console.log(createDate);

    const headers = [
      `lecture id,${lectureId},,,,`,
      `Create Date,${createDate},,,,`,
      `,,,,`,
      `Date,ID,Email,Name,Register number,attendance`,
    ];

    // CSV Rows
    const rows = data
      .map((record) => {
        return record.students.map((student) => {
          // Get attendance value as 0 or 1 based on the emoji
          const attendanceValue = student.attendance === "🔴" ? 0 : 1;
          return `"${record.date}",${student.id},${student.email},${student.name},${student.registrationNumber},${attendanceValue}`;
        });
      })
      .flat(); // Flatten the array of arrays into a single array

    // Combine headers and rows
    const csvContent = [...headers, ...rows].join("\n");
    return csvContent;
  }

  // Function to download CSV file
  function downloadCSV(data: AttendanceRecord[]) {
    if (data.length === 0) {
      console.error("No data to download");
      return;
    }

    const lectureId = data[0].lectureId; // Get the lectureId from the first record
    const createDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Colombo",
    }); // Create date from the first record

    const csvContent = convertToCSV(data, lectureId, createDate);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `attendance_${lectureId}.csv`); // Name of the downloaded file
    link.style.visibility = "hidden";

    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // realtime genarating
  // services/attendance.ts
  const fetchLectureAttendance = async (lectureId: string) => {
    setLoading(true);
    const response = await fetch("/api/attandace/search/lecid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lectureId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch attendance data");
    }

    const data = await response.json();
    setLoading(false);
    return data;
  };

  // QR attendace manupitaing button (Start Attandace Marks )

  const handleStartMark = async () => {
    setLoading(true);
    const courseCodeURL = window.location.pathname.split("/").pop();

    const courseCode = courseCodeURL || ""; // Adjust as needed
    const fetchedData = await AttendanceComponent.handleAttendance(courseCode);

    console.log(fetchedData); // Log the fetched data

    // Ensure fetchedData is defined and check if it has classId or attendanceId
    if (fetchedData && (fetchedData.classId || fetchedData.attendanceId)) {
      // Construct the URL using the classId
      const idToUse = fetchedData.classId || fetchedData.attendanceId;
      router.push(`/Lecturer/QR/${idToUse}`);

      // Set the classId state if it exists, fallback to null if undefined
      setClassId(fetchedData.classId ?? null);
    } else {
      console.error("No classId or attendanceId found."); // Handle case when no IDs are available
    }

    console.log(classId); // Log the current classId
    setLoading(false);
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    // Convert month name to number
    const monthNumber = selectedMonth !== "" ? selectedMonth : "0"; // "0" if no month is selected

    // Set student selection to "0" if all students are selected
    const studentSelection = selectedStudent === "" ? "0" : selectedStudent;

    console.log("Generating report for:");
    console.log("Month:", monthNumber); // Month number or "0"
    console.log("Student Selection:", studentSelection); // Student selection or "0"

    // Your API endpoint
    const Ccode = window.location.pathname.split("/").pop();
    const requestData = {
      courseCode: Ccode,
      date: Number(monthNumber),
      student: Number(studentSelection),
    };

    console.log(requestData);

    try {
      const response = await fetch("/api/course/find/doc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log(response.status);
      if (response.status == 404) {
        toast("No Data Found!", {
          icon: "❌",
          style: {
            background: "#0f172a",
            color: "#f00",
          },
        });
      }

      if (!response.ok) {
        throw new Error(result.message || "Error fetching data");
      }

      // console.log("Data retrieved successfully:", result.data);
      console.log(result.data);

      const lectureId = result.data[0].lectureId; // Example lectureId
      const createDate = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Colombo",
      }); // Create date
      const csvOutput = convertToCSV(result.data, lectureId, createDate);
      downloadCSV(result.data);
      // Log CSV output or use it as needed
      // console.log(csvOutput);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  // delete post request

  const deleteClass = async (classCode: string): Promise<void> => {
    if (!classCode) {
      Swal.fire({
        icon: 'warning',
        title: 'No Class Code',
        text: 'Please provide a class code!',
      });
      return;
    }
  
    try {
      const response = await fetch('/api/course/del', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: classCode }),
      });
  
      const data: { message: string; error?: string } = await response.json();
  
      if (response.ok) {
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Class Deleted',
          text: data.message,
          timer: 2000,
          showConfirmButton: false,
          willClose: () => {
            // Redirect to the dashboard after the alert
            window.location.href = '/Lecturer/Dashboard';
          },
        });
      } else {
        // Show error alert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to delete class.',
        });
      }
    } catch (error) {
      // Show error alert in case of exception
      Swal.fire({
        icon: 'error',
        title: 'An Error Occurred',
        text: 'Please try again.',
      });
    }
  };
  // delete function



  const handleUpdateDetails = () => {
    setIsEditing(true);
  };

  const handleSaveDetails = () => {
    setIsEditing(false);
    console.log("Saving updated class details:", classDetails);
    handelUpdateBasic();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteDetails = () => {
    Swal.fire({
      title: "Are you sure?",
      html: `
      <p>Deleting this course will <strong>permanently remove the course and all associated data</strong>.</p>
<p>Please type <strong style="color: red;">'CONFIRM'</strong> to proceed with the deletion.</p>

    `,
      icon: "warning",
      input: "text",
      inputPlaceholder: "Type CONFIRM",
      showCancelButton: true,
      confirmButtonText: "Delete Account",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (value !== "CONFIRM") {
          return "You need to type 'CONFIRM'!";
        }
      },
      customClass: {
        popup:
          "gradient bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 shadow-xl text-white", // Reference the CSS class here
      },
    }).then((result) => {
      if (result.isConfirmed && result.value === "CONFIRM") {
        deleteClass(window.location.pathname.split("/").pop() || "");
      }
    });
  };

  const renderAttendanceView = () => (
    <>
      {loading && <LoadingSpinner />}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-300">
          Real Time Attendance
        </h2>
        <button
          onClick={() => setView("report")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full transition-colors duration-300 flex items-center shadow-lg"
        >
          <MdPieChart className="mr-2" /> Generate Report
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-center shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Attendance</h3>
          <p className="text-4xl font-bold">{String(attendacecounter)}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-center shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Absent</h3>
          <p className="text-4xl font-bold">{String(absentcounter)}</p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-center shadow-lg mt-6">
        <h3 className="text-lg font-semibold mb-2">Total</h3>
        <p className="text-4xl font-bold">{classDetails.totalStudents}</p>
      </div>
    </>
  );

  const renderReportView = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-300">
          Generate Attendance Report
        </h2>
        <button
          onClick={() => setView("attendance")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full transition-colors duration-300 flex items-center shadow-lg"
        >
          <MdRefresh className="mr-2" /> Real Time Attendance
        </button>
      </div>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="month"
            className="block text-lg font-medium text-gray-300 mb-2"
          >
            Select Month
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
          >
            <option value="0">ALL Dates</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Second Column: Student List */}
          <div>
            <label
              htmlFor="studentList"
              className="block text-lg font-medium text-gray-300 mb-2"
            >
              Student List
            </label>
            <select
              id="studentList"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
            >
              <option value="">All student</option>
              {students.map((student, index) => (
                <option key={index} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
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
            {/* Form inputs */}
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={classDetails.classCode}
              onChange={(e) =>
                setClassDetails({ ...classDetails, classCode: e.target.value })
              }
              placeholder="Class Code"
            />
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={classDetails.className}
              onChange={(e) =>
                setClassDetails({ ...classDetails, className: e.target.value })
              }
              placeholder="Class Name"
            />
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={classDetails.batch}
              onChange={(e) =>
                setClassDetails({ ...classDetails, batch: e.target.value })
              }
              placeholder="Batch"
            />
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={classDetails.department}
              onChange={(e) =>
                setClassDetails({ ...classDetails, department: e.target.value })
              }
              placeholder="Short Discription"
            />
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              type="date"
              value={classDetails.date}
              onChange={(e) =>
                setClassDetails({ ...classDetails, date: e.target.value })
              }
            />
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              type="time"
              value={classDetails.time}
              onChange={(e) =>
                setClassDetails({ ...classDetails, time: e.target.value })
              }
            />
            <select
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={classDetails.classType}
              onChange={(e) =>
                setClassDetails({ ...classDetails, classType: e.target.value })
              }
            >
              <option value="physical">Physical</option>
              <option value="online">Online</option>
            </select>
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              type="number"
              value={classDetails.totalStudents}
              onChange={(e) =>
                setClassDetails({
                  ...classDetails,
                  totalStudents: parseInt(e.target.value),
                })
              }
              placeholder="Total Students"
            />
            <input
              className="bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={classDetails.link}
              type="text"
              onChange={(e) =>
                setClassDetails({ ...classDetails, link: e.target.value })
              }
              placeholder="Online meeting link or map link"
            />
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            {/* Delete button */}
            <button
              onClick={handleDeleteDetails}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg transition-colors duration-300"
            >
              <MdDeleteOutline className="mr-1 inline" /> Delete
            </button>
            {/* Cancel and Save buttons */}
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow-lg transition-colors duration-300"
            >
              <MdClose className="mr-1 inline" /> Cancel
            </button>
            <button
              onClick={handleSaveDetails}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-colors duration-300"
            >
              <MdSave className="mr-1 inline" /> Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 text-gray-300">
            <p>
              <strong className="text-white">Class Code:</strong>{" "}
              {classDetails.classCode}
            </p>
            <p>
              <strong className="text-white">Class Name:</strong>{" "}
              {classDetails.className}
            </p>
            <p>
              <strong className="text-white">Batch:</strong>{" "}
              {classDetails.batch}
            </p>
            <p>
              <strong className="text-white">Short Discription:</strong>{" "}
              {classDetails.department}
            </p>
            <p>
              <strong className="text-white">Date:</strong> {classDetails.date}
            </p>
            <p>
              <strong className="text-white">Time:</strong> {classDetails.time}
            </p>
            <p>
              <strong className="text-white">Class Type:</strong>{" "}
              {classDetails.classType}
            </p>
            <p>
              <strong className="text-white">Total Students:</strong>{" "}
              {classDetails.totalStudents}
            </p>
            <p>
              <strong className="text-white">Class Link:</strong>{" "}
              {classDetails.link}
            </p>
          </div>
          <button
            onClick={handleUpdateDetails}
            className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-colors duration-300"
          > <FaRegEdit />
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen text-white p-6 sm:p-8">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-indigo-300">
              QR Attendance
            </h2>
            <div className="flex justify-center items-center h-64  rounded-xl p-4 shadow-inner">
              <Image src={"/img/qr.png"} width={250} height={250} alt="QR" />
            </div>
            <p className="text-center mt-6 text-lg text-gray-300">
              <button
                onClick={() => handleStartMark()}
                className="btn btn-outline btn-success"
              >
                <PiStudentBold />
                Start Attandace Marks
              </button>
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl rounded-2xl p-6">
            {view === "attendance"
              ? renderAttendanceView()
              : renderReportView()}
          </div>
        </div>
        {renderClassDetailsCard()}

        <div className="bg-gradient-to-br from-indigo-900 via-gray-800 to-purple-900 opacity-80 shadow-xl rounded-2xl p-6 mt-8">
          <StudentList />
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
