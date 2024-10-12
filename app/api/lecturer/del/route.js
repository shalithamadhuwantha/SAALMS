// app/api/deleteLecturer/route.js
import { connectMongoDB } from "@/lib/mongodb";
import Lecturer from "@/models/lecturer";
import Class from "@/models/class";
import Attendance from "@/models/attendance";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email } = await request.json();

  await connectMongoDB();

  try {
    // Step 1: Find and delete the lecturer by email
    const lecturer = await Lecturer.findOne({ email });

    if (!lecturer) {
      return NextResponse.json(
        { message: "Lecturer not found." },
        { status: 404 }
      );
    }

    const lecturerID = lecturer._id; 

    // Delete lecturer profile
    await Lecturer.deleteOne({ email });

    // Step 2: Find all classes created by the lecturer
    const classes = await Class.find({ lecturerID });

    if (classes.length > 0) {
      // Get class codes from found classes
      const classCodes = classes.map((cls) => cls.code);

      // Delete all classes created by the lecturer
      await Class.deleteMany({ lecturerID });

      // Step 3: Delete all attendance records related to the deleted classes
      await Attendance.deleteMany({ lectureId: { $in: classCodes } });
    }

    // Respond with success message
    return NextResponse.json(
      { message: "Lecturer profile and all related data have been deleted." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting lecturer data", error: error.message },
      { status: 500 }
    );
  }
}
