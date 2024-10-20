import { connectMongoDB } from "@/lib/mongodb";
import Attendance from "@/models/attendance";
import Class from "@/models/class"; // Import the Class model
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

    // Get the current date and time
    const currentTime = new Date();

    // Step 1: Find the most recent attendance record for the student using email
    const latestAttendance = await Attendance.findOne(
      {
        'students.email': email,
        createdAt: { $lte: currentTime } // Only get classes created before or at the current time
      },
      { lectureId: 1, createdAt: 1 } // Only select lectureId and createdAt
    )
    .sort({ createdAt: -1 }) // Sort by newest class
    .limit(1); // Get only the most recent class

    if (!latestAttendance) {
      return NextResponse.json(
        { message: "No class found for this student at this time." },
        { status: 404 }
      );
    }

    const { lectureId, createdAt } = latestAttendance;

    // Step 2: Using the lectureId, find the corresponding class details
    const classDetails = await Class.findOne({ code: lectureId });

    if (!classDetails) {
      return NextResponse.json(
        { message: `Class with lectureId ${lectureId} not found.` },
        { status: 404 }
      );
    }

<<<<<<< Updated upstream
    // Step 3: Combine the data and return the final response
=======
    // Step 3: Check if the student is in the class schema
    const isStudentInClass = classData.students.some(student => student.email === email);

    if (!isStudentInClass) {
      return NextResponse.json(
        { message: "Student has dropped from the class." },
        { status: 403 } // Forbidden
      );
    }

    // Step 4: Return the latest class and class details
>>>>>>> Stashed changes
    const result = {
      message: "Class found",
      attendance: {
        lectureId,
        createdAt
      },
      classDetails: {
        name: classDetails.name,
        lecturerID: classDetails.lecturerID,
        batch: classDetails.batch,
        lessonName: classDetails.lessonName,
        date: classDetails.date,
        time: classDetails.time,
        type: classDetails.type,
        link: classDetails.link,
        additionalLink: classDetails.additionalLink,
        students: classDetails.students // Add student details if needed
      }
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
