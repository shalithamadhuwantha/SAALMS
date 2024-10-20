
import { connectMongoDB } from "@/lib/mongodb";
import Class from "@/models/class";
import Attendance from "@/models/attendance";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { code } = await request.json();

     await connectMongoDB();

    
    const existingClass = await Class.findOne({ code });

    if (!existingClass) {
      return NextResponse.json(
        { message: "Class not found." },
        { status: 404 }
      );
    }

    // Delete the class by code
    await Class.deleteOne({ code });

    await Attendance.deleteOne({ lectureId: code });

    return NextResponse.json(
      { message: "Class and corresponding attendance deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting class and attendance", error: error.message },
      { status: 500 }
    );
  }
}
