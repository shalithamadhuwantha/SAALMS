import { connectMongoDB } from "@/lib/mongodb";
import Attendance from "@/models/attendance";
import Class from "@/models/class"; // Import Class model
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email } = await request.json(); // Extract email from request body

  // Connect to MongoDB
  await connectMongoDB();

  try {
    if (!email) {
      return NextResponse.json(
        { message: "Student email is required." },
        { status: 400 }
      );
    }

    // Step 1: Find the most recent attendance record for the student using email
    const latestAttendance = await Attendance.findOne(
      { "students.email": email }, // Find attendance based on student email
      { lectureId: 1, createdAt: 1 } // Only select lectureId and createdAt
    )
      .sort({ createdAt: -1 }) // Sort by newest first based on createdAt field
      .limit(1); // Get only the most recent record

    if (!latestAttendance) {
      return NextResponse.json(
        { message: "No class found for this student." },
        { status: 404 }
      );
    }

    const { lectureId, createdAt } = latestAttendance; // Extract lectureId and createdAt

    // Step 2: Find the class using the lectureId
    const classData = await Class.findOne({ code: lectureId }); // Adjust the query to match your schema

    if (!classData) {
      return NextResponse.json(
        { message: "No class data found for the lecture ID." },
        { status: 404 }
      );
    }

    // Step 3: Check if the student is in the class schema
    const isStudentInClass = classData.students.some(student => student.email === email);

    if (!isStudentInClass) {
      return NextResponse.json(
        { message: "Student has dropped from the class." },
        { status: 403 } // Forbidden
      );
    }

    // Step 4: Return the latest class and class details
    const result = {
      message: "Latest class and details found",
      lectureId, // Include the lectureId
      createdAt, // Include the raw createdAt date
      classData, // Include the class data
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
