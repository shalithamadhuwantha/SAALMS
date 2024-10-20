import { connectMongoDB } from "@/lib/mongodb";
import Attendance from "@/models/attendance";
import Class from "@/models/class";
import Lecturer from "@/models/lecturer"; // Import Lecturer model
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const { classHash, courseCode, email } = await request.json(); // Extract necessary details from the request body

  // Connect to the MongoDB database
  await connectMongoDB();

  try {
    // Validate inputs
    if (!classHash) {
      return NextResponse.json(
        { message: "Class hash (_id) is required." },
        { status: 400 }
      );
    }

    if (!courseCode) {
      return NextResponse.json(
        { message: "Course code is required." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: "Student email is required." },
        { status: 400 }
      );
    }

    // Ensure classHash is a valid ObjectId for Attendance
    if (!ObjectId.isValid(classHash)) {
      return NextResponse.json(
        { message: "Invalid class hash format." },
        { status: 400 }
      );
    }

    // Search for the class in the Class schema using the courseCode
    const classRecord = await Class.findOne({
      code: courseCode, // Match the course code
    });

    if (!classRecord) {
      return NextResponse.json(
        { message: "Course not found." },
        { status: 200 }
      );
    }

    // Fetch lecturer details
    const lecturer = await Lecturer.findById(classRecord.lecturerID);

    if (!lecturer) {
      return NextResponse.json(
        { message: "Lecturer not found." },
        { status: 200 }
      );
    }

    // Search for the attendance record using classHash (Attendance _id) and courseCode (lectureId)
    const attendanceRecord = await Attendance.findOne({
      _id: new ObjectId(classHash),
      lectureId: courseCode,
    });

    // It's okay if attendance record is not found, don't return an error
    let isAttended = false;
    if (attendanceRecord) {
      // Check if the student is present in the attendance record
      const studentInAttendance = attendanceRecord.students.find(
        (student) => student.email === email
      );

      // Mark attendance as true if the student is found in attendance record
      if (studentInAttendance) {
        isAttended = studentInAttendance.attendance === "🟢";
      }
    }

    // Check if the student is present in the students array of the Class schema
    const studentInClass = classRecord.students.find(
      (student) => student.email === email
    );

    if (!studentInClass) {
      // Return lecturer details since the student was not found in the Class
      return NextResponse.json(
        {
          message: "Student not found in the class record.",
          classDetails: {
            lecturer: {
              name: lecturer.name, // Lecturer name
              image: lecturer.image, // Lecturer profile image URL
            },
          },
          student: null, // Student not found
        },
        { status: 200 }
      );
    }

    // If the student is found, return class and student details with lecturer details
    return NextResponse.json(
      {
        message: "Course and student found.",
        classDetails: {
          lecturer: {
            name: lecturer.name, // Lecturer name
            image: lecturer.image, // Lecturer profile image URL
          },
          code: classRecord.code,
          name: classRecord.name,
          batch: classRecord.batch,
          lessonName: classRecord.lessonName,
          date: classRecord.date,
          time: classRecord.time,
          type: classRecord.type,
          link: classRecord.link,
          additionalLink: classRecord.additionalLink,
        },
        student: {
          name: studentInClass.name,
          email: studentInClass.email,
          registrationNumber: studentInClass.registrationNumber,
          attendance: isAttended ? "🟢" : "🔴", // Show attendance status
        },
        isAttended,
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
