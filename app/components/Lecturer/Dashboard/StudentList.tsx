import React, { useState, useEffect } from 'react';

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
  const [filterDate, setFilterDate] = useState<string>(''); // State for filter date
  const [classHeldDates, setClassHeldDates] = useState<string[]>([]);
  const [students, setStudents] = useState<Student[]>([]); // State for storing fetched students

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const courseCodeURL = window.location.pathname.split('/').pop();
      try {
        const response = await fetch('/api/attandace/search/lecid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lectureId: courseCodeURL }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.attendance) {
          const fetchedDates: string[] = data.attendance.map((record: { createdAt: string }) =>
            new Date(record.createdAt).toISOString().split('T')[0]
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
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  // Fetch students when filterDate changes
  useEffect(() => {
    if (filterDate) {
      const fetchStudents = async () => {
        const courseCodeURL = window.location.pathname.split('/').pop();
        try {
          const response = await fetch('/api/attandace/search/bydate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: filterDate, lectureId: courseCodeURL }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setStudents(data.students || []); // Update state with the fetched students
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };

      fetchStudents();
    } else {
      setStudents([]); // Clear students if no date is selected
    }
  }, [filterDate]);

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  

  return (
    <div className="container mx-auto p-4 bg-navy-900">
      <h2 className="text-2xl font-bold mb-4 text-blue-200">Student List</h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="filterDate" className="text-blue-200 mr-2">Filter by Date:</label>
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
              <th className="px-4 py-2 text-left text-gray-300">Registration Number</th>
              <th className="px-4 py-2 text-left text-gray-300">State</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-700">
                <td className="px-4 py-2 text-blue-200">{student.id}</td>
                <td className="px-4 py-2 text-blue-200">{student.name}</td>
                <td className="px-4 py-2 text-blue-200">{student.email}</td>
                <td className="px-4 py-2 text-blue-200">{student.registrationNumber}</td>
                <td className="px-4 py-2 text-blue-200">{student.attendance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default StudentList;
