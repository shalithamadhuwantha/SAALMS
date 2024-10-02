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

    // Get current date and time in Sri Jayewardenepura (UTC+5:30)
    const currentDate = new Date();
    const sriLankaTimeOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds (5 hours 30 minutes)
    const sriLankaTime = new Date(currentDate.getTime() + sriLankaTimeOffset);

    // Get today's date for comparison
    const startOfToday = new Date(sriLankaTime.getFullYear(), sriLankaTime.getMonth(), sriLankaTime.getDate());

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

    // Create new attendance record with createdAt timestamp
    const attendanceRecord = new Attendance({
      lectureId,
      students,
      createdAt: sriLankaTime, // Set createdAt to the calculated Sri Lanka time
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
