// app/api/findCourse/route.js

import { connectMongoDB } from "@/lib/mongodb";
import Class from "@/models/class";
import Lecturer from "@/models/lecturer"; // Import the Lecturer model
import { NextResponse } from "next/server";
import mongoose from "mongoose"; // Import mongoose to handle ObjectId

export async function POST(request) {
  const { code } = await request.json();

  await connectMongoDB();
    
  try {
    // Check if the class code exists
    const existingClass = await Class.findOne({ code });

    if (!existingClass) {
      return NextResponse.json(
        { message: "Course not found." },
        { status: 404 }
      );
    }

    // Ensure that lecturerID is available in the class and is a valid ObjectId
    if (!existingClass.lecturerID || !mongoose.Types.ObjectId.isValid(existingClass.lecturerID)) {
      return NextResponse.json(
        { message: "Invalid or missing lecturerID." },
        { status: 400 }
      );
    }

    // Find the lecturer by lecturerID (_id)
    const lecturer = await Lecturer.findById(existingClass.lecturerID);

    // If lecturer not found, use a default or empty name
    const lecturerName = lecturer ? lecturer.name : "Unknown Lecturer";

    // If the course exists, return the course data along with the lecturer's name
    return NextResponse.json(
      { 
        message: "Course found", 
        course: existingClass, 
        lecturename: lecturerName 
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error searching for course", error: error.message },
      { status: 500 }
    );
  }
}
