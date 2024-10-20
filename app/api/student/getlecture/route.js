// pages/api/getCourseInfo.js

import { connectMongoDB } from "@/lib/mongodb";
import Class from "@/models/class"; // Ensure this path is correct for your project structure
import Attendance from "@/models/attendance"; // Import the Attendance model
import { NextResponse } from "next/server";

export async function POST(request) {
  const { courseCode, studentEmail } = await request.json();

  // Connect to the MongoDB database
  await connectMongoDB();

  try {
    // Validate inputs
    if (!courseCode) {
      return NextResponse.json(
        { message: "Course code is required." },
        { status: 400 }
      );
    }

    if (!studentEmail) {
      return NextResponse.json(
        { message: "Student email is required." },
        { status: 400 }
      );
    }

    // Find the course by the course code
    const course = await Class.findOne({ code: courseCode });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found." },
        { status: 404 }
      );
    }

    // Find the specific student by email in the course's student list
    const studentInfo = course.students.find(student => student.email === studentEmail);

    if (!studentInfo) {
      return NextResponse.json(
        { message: "Student not found in the course." },
        { status: 404 }
      );
    }

    // Find the latest attendance record for the student using their email
    const latestAttendance = await Attendance.findOne({
      lectureId: courseCode,
      "students.email": studentEmail // Filter by student email
    })
      .sort({ createdAt: -1 }) // Get the newest attendance
      .select("createdAt students.$"); // Select only the matching student

    // Prepare the attendance data to return
    const attendanceData = latestAttendance ? {
      createdAt: latestAttendance.createdAt,
      studentAttendance: latestAttendance.students[0], // Get the first (and should be only) matching student attendance
    } : null; // If no attendance found, set to null

    // Respond with course information, selected student details, and latest attendance
    return NextResponse.json(
      { 
        course: {
          code: course.code,
          name: course.name,
          batch: course.batch,
          lessonName: course.lessonName,
          date: course.date,
          time: course.time,
          type: course.type,
          link: course.link,
          additionalLink: course.additionalLink,
        },
        student: studentInfo,
        latestAttendance: attendanceData,
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
