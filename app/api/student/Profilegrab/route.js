// /app/api/student/Profilegrab/route.js

import { connectMongoDB } from "@/lib/mongodb";
import Student from "@/models/student";
import { NextResponse } from "next/server";
import { getSession } from 'next-auth/react'; // Assuming you use next-auth

// Handle POST requests - Fetch student profile by email
export async function POST(request) {
  await connectMongoDB(); // Ensure MongoDB connection

  const session = await getSession({ req: request }); // Get the current session



  // Extract email from the request body
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    // Find the student profile by email
    const studentProfile = await Student.findOne({ email });

    if (!studentProfile) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    // Return the profile data
    return NextResponse.json(studentProfile, { status: 200 });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return NextResponse.json({ message: "Server error", errors: error }, { status: 500 });
  }
}
