// app/api/createClass/route.js

import { connectMongoDB } from "@/lib/mongodb";
import Class from "@/models/class";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    lecturerID,
    code,
    name,
    batch,
    lessonName,
    date,
    time,
    type,
    link,
    additionalLink,
    students,
  } = await request.json();

  await connectMongoDB();

  try {
    // Check if the class code already exists
    const existingClass = await Class.findOne({ code });

    if (existingClass) {
      return NextResponse.json(
        { message: "Class code already exists. Please use a different code." },
        { status: 201 }
      );
    }

    // Create the new class
    const newClass = await Class.create({
      lecturerID,
      code,
      name,
      batch,
      lessonName,
      date,
      time,
      type,
      link,
      additionalLink,
      students,
    });

    return NextResponse.json(
      { message: "Class created successfully", class: newClass },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating class", error: error.message },
      { status: 500 }
    );
  }
}
