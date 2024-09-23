import { connectMongoDB } from "@/lib/mongodb";
import Attendance from "@/models/attendance"; // Ensure the model is correct
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongoDB();

  try {
    const { lectureId } = await request.json(); // Get the lectureId from the request body

    // Validate input
    if (!lectureId) {
      return NextResponse.json(
        { message: "Lecture ID is required." },
        { status: 400 }
      );
    }

    // Find attendance records by lectureId
    const attendanceRecords = await Attendance.find({ lectureId }).populate('students.id'); // Populate student data if referenced

    if (attendanceRecords.length > 0) {
      return NextResponse.json(
        {
          message: "Attendance records found.",
          attendance: attendanceRecords,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No attendance records found for this lecture ID." },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
