import { connectMongoDB } from "@/lib/mongodb";
import Student from "@/models/student";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email } = await request.json(); // Get the email from the request body

  await connectMongoDB(); // Connect to the database
  
  try {
    // Find and delete the student by email
    const deletedStudent = await Student.findOneAndDelete({ email });
    
    // If the student was not found
    if (!deletedStudent) {
      return NextResponse.json({ message: "Student not found." }, { status: 404 });
    }

    // Return success response if the student was deleted
    return NextResponse.json({ message: "Student profile deleted successfully." }, { status: 200 });

  } catch (error) {
    // Handle any errors during deletion
    return NextResponse.json({ message: "Error deleting student profile", error: error.message }, { status: 500 });
  }
}
