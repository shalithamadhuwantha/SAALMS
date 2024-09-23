import { connectMongoDB } from "@/lib/mongodb";
import Attendance from "@/models/attendance"; // Ensure the model is correct
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id } = await request.json(); // Changed to 'id' for clarity

  await connectMongoDB();

  try {
    // Validate input
    if (!id) {
      return NextResponse.json(
        { message: "ID is required." },
        { status: 400 }
      );
    }

    // Search for the attendance record using the _id
    const attendanceRecord = await Attendance.findById(id); // Using findById to search by _id

    if (attendanceRecord) {
      return NextResponse.json(
        {
          message: "Attendance record found.",
          classId: attendanceRecord._id,
          attendance: attendanceRecord, // Include the full record if needed
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Attendance record not found." },
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
