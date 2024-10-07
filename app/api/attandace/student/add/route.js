import { connectMongoDB } from "@/lib/mongodb";
import Attendance from "@/models/attendance";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { _id, email } = await request.json(); // Extract _id and email from request body

  // Connect to MongoDB
  await connectMongoDB();

  try {
    if (!_id) {
      return NextResponse.json(
        { message: "Attendance ID is required." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: "Student email is required." },
        { status: 400 }
      );
    }

    // Step 1: Find the attendance record using the _id
    const attendanceRecord = await Attendance.findById(_id); // Find attendance based on _id

    if (!attendanceRecord) {
      return NextResponse.json(
        { message: "No attendance record found with this ID." },
        { status: 404 }
      );
    }

    // Step 2: Check if the student email exists in the students list
    const student = attendanceRecord.students.find(
      (student) => student.email === email
    );

    if (!student) {
      return NextResponse.json(
        { message: "Student not found in this attendance record." },
        { status: 404 }
      );
    }

    // Step 3: Return the attendance record and student data
    const result = {
      message: "Attendance record and student found",
      attendance: attendanceRecord, // Include the attendance data
      student: student, // Include the student data
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
