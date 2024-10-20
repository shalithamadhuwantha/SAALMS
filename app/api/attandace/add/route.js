import { connectMongoDB } from "@/lib/mongodb";
import Attendance from "@/models/attendance";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(request) {
  const { classId, studentEmail } = await request.json();

  // Connect to the MongoDB database
  await connectMongoDB();

  try {
    // Validate inputs
    if (!classId) {
      return NextResponse.json(
        { message: "Class ID (_id) is required." },
        { status: 400 }
      );
    }

    if (!studentEmail) {
      return NextResponse.json(
        { message: "Student email is required." },
        { status: 400 }
      );
    }

    // Ensure classId is a valid ObjectId
    if (!ObjectId.isValid(classId)) {
      return NextResponse.json(
        { message: "Invalid class ID format." },
        { status: 400 }
      );
    }

    // Find the attendance record by MongoDB _id (classId)
    const attendanceRecord = await Attendance.findOne({ _id: new ObjectId(classId) });

    if (!attendanceRecord) {
      return NextResponse.json(
        { message: "Attendance record not found." },
        { status: 404 }
      );
    }

    // Find the specific student by email in the attendance record
    const studentToUpdate = attendanceRecord.students.find(
      (student) => student.email === studentEmail
    );

    if (!studentToUpdate) {
      return NextResponse.json(
        { message: "Student not found in the attendance record." },
        { status: 404 }
      );
    }

    // Update the student's attendance to 🟢
    studentToUpdate.attendance = "🟢";

    // Save the updated attendance record
    await attendanceRecord.save();

    // Return success message with the lectureId
    return NextResponse.json(
      {
        message: "Student attendance updated successfully",
        attendance: studentToUpdate,
        lectureId: attendanceRecord.lectureId, // Output lectureId here
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
