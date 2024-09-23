// app/api/findCourse/route.js

import { connectMongoDB } from "@/lib/mongodb";
import Class from "@/models/class";
import { NextResponse } from "next/server";

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

    // If the course exists, return the course data
    return NextResponse.json(
      { message: "Course found", course: existingClass },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error searching for course", error: error.message },
      { status: 500 }
    );
  }
}
