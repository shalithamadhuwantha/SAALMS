import { connectMongoDB } from "@/lib/mongodb";
import Attendance from "@/models/attendance";
import { NextResponse } from "next/server";

// Utility to get the start and end dates of a given month
function getMonthRange(month) {
  const year = new Date().getFullYear(); // Get the current year
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);
  return { startDate, endDate };
}

// Function to format the date (optional: you can format this to your needs)
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

export async function POST(request) {
  const { courseCode, date, student } = await request.json(); // Get params from request body

  await connectMongoDB();

  try {
    // Build the query object
    const query = { lectureId: courseCode };

    // Handle month filtering (date = 0 means all months)
    if (date && date !== 0) {
      const { startDate, endDate } = getMonthRange(date);
      query.createdAt = { $gte: startDate, $lt: endDate }; // Filter by the month range
    }

    // Fetch attendance records that match the query
    const attendanceData = await Attendance.find(query);

    if (!attendanceData || attendanceData.length === 0) {
      return NextResponse.json({ message: "No data found." }, { status: 404 });
    }

    // If student is non-zero, filter student-specific data
    let filteredData = attendanceData;

    if (student && student !== 0) {
      filteredData = attendanceData.map((record) => {
        const studentData = record.students.find((s) => s.id === student);
        if (studentData) {
          return {
            ...record._doc,
            students: [studentData],
            date: formatDate(record.createdAt) // Format the createdAt field and add it as date
          };
        }
        return null;
      }).filter((record) => record !== null); // Remove any records with no matching students
    } else {
      // If no specific student is requested, add date to all records
      filteredData = attendanceData.map((record) => ({
        ...record._doc,
        date: formatDate(record.createdAt)
      }));
    }

    return NextResponse.json(
      { message: "Data retrieved successfully", data: filteredData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
