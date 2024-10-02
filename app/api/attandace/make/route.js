import { connectMongoDB } from "@/lib/mongodb";
import Attendance from "@/models/attendance"; // Ensure this model is created
import { NextResponse } from "next/server";

export async function POST(request) {
  const { lectureId, students } = await request.json();

  await connectMongoDB();

  try {
    // Validate input
    if (!lectureId) {
      return NextResponse.json(
        { message: "Lecture ID is required." },
        { status: 400 }
      );
    }

    // Ensure students is an array
    if (!students || !Array.isArray(students)) {
      return NextResponse.json(
        { message: "Invalid students data format. It should be an array of objects." },
        { status: 400 }
      );
    }

    // Get today's date for comparison
    const currentDate = new Date();
    const startOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // Check if attendance record already exists for today
    const existingRecord = await Attendance.findOne({
      lectureId,
      createdAt: { $gte: startOfToday }, // Check from the start of today
    });

    // If an existing record is found, return the _id of the record
    if (existingRecord) {
      return NextResponse.json(
        { message: "Attendance record for today already exists.", classId: existingRecord._id },
        { status: 200 }
      );
    }

    // Create new attendance record
    const attendanceRecord = new Attendance({
      lectureId,
      students,
    });

    await attendanceRecord.save();

    return NextResponse.json(
      { message: "Attendance recorded successfully", attendance: attendanceRecord },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
