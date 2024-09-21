

import { connectMongoDB } from "@/lib/mongodb";
import Student from "@/models/student";
import Lecturer from "@/models/lecturer";
import { NextResponse } from "next/server";

// Handle PUT requests - Update student profile
export async function PUT(request) {
  await connectMongoDB(); // Ensure MongoDB connection

  const { _id, email, name, image, university, faculty } = await request.json();

  if (!_id || !email || !name || !image || !university || !faculty) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    // Fetch the current student profile from the database
    const existingStudent = await Lecturer.findById(_id);
    
    if (!existingStudent) {
      return NextResponse.json({ message: "Lecturer not found" }, { status: 404 });
    }

    // If the email has changed, check if it's already used by another student or lecturer
    if (existingStudent.email !== email) {
      // Check if the new email is already used by another student
      const studentWithSameEmail = await Lecturer.findOne({ email });
      if (studentWithSameEmail && studentWithSameEmail._id.toString() !== _id) {
        return NextResponse.json({ message: "Email is already in use  " }, { status: 400 });
      }

      // Check if the new email is already used by a lecturer
      const lecturerWithSameEmail = await Student.findOne({ email });
      if (lecturerWithSameEmail) {
        return NextResponse.json({ message: "Email is already in use " }, { status: 400 });
      }
    }

    // Update the student profile with the new data
    const updatedProfile = await Lecturer.findByIdAndUpdate(
      _id,
      { email, name, image, university, faculty },
      { new: true }  // Return the updated document
    );

    if (!updatedProfile) {
      return NextResponse.json({ message: "Student not found after update" }, { status: 404 });
    }

    // Return the updated profile data
    return NextResponse.json(updatedProfile, { status: 200 });

  } catch (error) {
    console.error("Error updating student profile:", error);
    return NextResponse.json({ message: "Server error", errors: error }, { status: 500 });
  }
}
