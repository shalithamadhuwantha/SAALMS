

import { connectMongoDB } from "@/lib/mongodb";
import Class from "@/models/class";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { lecturerID } = await request.json(); // Expect lecturerID in the request body

  await connectMongoDB();
  
  try {
    // Search for all courses that belong to the given lecturer
    const lecturerCourses = await Class.find({ lecturerID });

    if (!lecturerCourses || lecturerCourses.length === 0) {
      return NextResponse.json(
        { message: "No courses found for this lecturer." },
        { status: 404 }
      );
    }

    // Return the list of courses for the lecturer
    return NextResponse.json(
      { message: "Courses found", courses: lecturerCourses },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving courses", error: error.message },
      { status: 500 }
    );
  }
}
