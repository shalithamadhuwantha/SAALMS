import { connectMongoDB } from "@/lib/mongodb";
import Class from "@/models/class"; // Import Class model
import Lecturer from "@/models/lecturer"; // Import Lecturer model
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json(); // Extract email from request body

    // Connect to MongoDB
    await connectMongoDB();

    if (!email) {
      return NextResponse.json(
        { message: "Student email is required." },
        { status: 400 }
      );
    }

    // Step 1: Find all classes where the student's email exists in the `students` array
    const classes = await Class.find({ 'students.email': email });

    if (!classes || classes.length === 0) {
      return NextResponse.json(
        { message: "No classes found for this student." },
        { status: 404 }
      );
    }

    // Step 2: Extract relevant class data and get lecturer profile pictures and names
    const classDataWithLecturerDetails = await Promise.all(
      classes.map(async (classItem) => {
        const lecturer = await Lecturer.findById(
          classItem.lecturerID, 
          'name image' // Select both name and image fields
        );

        return {
          _id: classItem._id,
          lecturerID: classItem.lecturerID,
          code: classItem.code,
          name: classItem.name,
          batch: classItem.batch,
          lessonName: classItem.lessonName,
          date: classItem.date,
          time: classItem.time,
          type: classItem.type,
          link: classItem.link,
          additionalLink: classItem.additionalLink,
          lecturerName: lecturer ? lecturer.name : "Unknown", // Add lecturer's name
          lecturerImage: lecturer ? lecturer.image : null,    // Add lecturer's image
        };
      })
    );

    // Step 3: Return the filtered class data and lecturer details
    const result = {
      message: "Classes found for the student",
      email,  // Include the email in the response
      classes: classDataWithLecturerDetails // Include the filtered class data with lecturer details
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
