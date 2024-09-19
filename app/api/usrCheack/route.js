import { connectMongoDB } from "@/lib/mongodb";
import Student from "@/models/student";
import Lecturer from "@/models/lecturer";
import { NextResponse } from "next/server";

export async function POST(request) {

    // catch get data
  const { email } = await request.json();

  // Connect to MongoDB
  await connectMongoDB();

  try {
    const studentExists = await Student.findOne({ email });

    const lecturerExists = await Lecturer.findOne({ email });

    // student exit validation
    if (studentExists) {
      return NextResponse.json(
        { status: "202", Type: "Student" },
        { status: 202 }
      );

    // lecturer exit validation 
    } else if (lecturerExists) {
      return NextResponse.json(
        { status: "202", Type: "Lecturer" },
        { status: 202 }
      );

    //   email not found
    } else {
      return NextResponse.json({ message: "200" }, { status: 200 });
    }

    // error prnting
  } catch (error) {
    return NextResponse.json(
      { message: "Error checking email", error },
      { status: 500 }
    );
  }
}
