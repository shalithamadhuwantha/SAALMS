import { connectMongoDB } from "@/lib/mongodb";
import Attendance from "@/models/attendance";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { date, lectureId } = await request.json(); // Extracting data from the request body

  await connectMongoDB();

  try {
    // Validate input
    if (!date || !lectureId) {
      return NextResponse.json(
        { message: "Date and lecture ID are required." },
        { status: 400 }
      );
    }

    // Parse the date to compare with createdAt
    const parsedDate = new Date(date);
    const nextDay = new Date(parsedDate);
    nextDay.setDate(parsedDate.getDate() + 1);

    // Find attendance records by lectureId and createdAt date
    const attendanceRecords = await Attendance.find({
      lectureId,
      createdAt: {
        $gte: parsedDate,
        $lt: nextDay,
      },
    });

    if (attendanceRecords.length > 0) {
      // Extract student details
      const students = attendanceRecords.flatMap(record => record.students);
      return NextResponse.json(
        {
          message: "Student details found.",
          students,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No attendance records found for the specified date and lecture ID." },
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
