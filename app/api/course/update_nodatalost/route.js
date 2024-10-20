import { connectMongoDB } from "@/lib/mongodb";
import Class from "@/models/class"; // Import class model
import Lecturer from "@/models/lecturer"; // Import Lecturer model
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const { courseCode, newStudentData } = await request.json(); // Extract necessary details from the request body

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

    if (!newStudentData || !newStudentData.email) {
      return NextResponse.json(
        { message: "Student data is required." },
        { status: 400 }
      );
    }

    // Search for the class in the Class schema using the courseCode
    const classRecord = await Class.findOne({ code: courseCode });

    if (!classRecord) {
      return NextResponse.json(
        { message: "Course not found." },
        { status: 404 }
      );
    }

    // Check if the student already exists to avoid duplicates
    const studentExists = classRecord.students.some(
      (student) => student.email === newStudentData.email
    );

    if (studentExists) {
      return NextResponse.json(
        { message: "Student already exists in the class." },
        { status: 400 }
      );
    }

    // Add new student to the students array
    classRecord.students.push(newStudentData);

    // Save the updated class record
    await classRecord.save();

    // Fetch lecturer details using lecturerID from the classRecord
    const lecturer = await Lecturer.findById(classRecord.lecturerID);

    if (!lecturer) {
      return NextResponse.json(
        { message: "Lecturer not found." },
        { status: 404 }
      );
    }

    // Return class details and new student details
    return NextResponse.json(
      {
        message: "New student added successfully.",
        classDetails: {
          lecturerID: classRecord.lecturerID,
          code: classRecord.code,
          name: classRecord.name,
          batch: classRecord.batch,
          lessonName: classRecord.lessonName,
          date: classRecord.date,
          time: classRecord.time,
          type: classRecord.type,
          link: classRecord.link,
          additionalLink: classRecord.additionalLink,
          lecturer: {
            name: lecturer.name, // Lecturer name
            image: lecturer.image, // Lecturer profile image URL
          },
        },
        newStudent: newStudentData,
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
