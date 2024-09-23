import { connectMongoDB } from "@/lib/mongodb";
import Class from "@/models/class";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    code,
    lecturerID,
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
    // Check if the class code exists
    const existingClass = await Class.findOne({ code });

    if (!existingClass) {
      return NextResponse.json(
        { message: "Class code does not exist." },
        { status: 404 }
      );
    }

    // Update the fields if they are provided
    if (lecturerID) existingClass.lecturerID = lecturerID;
    if (name) existingClass.name = name;
    if (batch) existingClass.batch = batch;
    if (lessonName) existingClass.lessonName = lessonName;
    if (date) existingClass.date = date;
    if (time) existingClass.time = time;
    if (type) existingClass.type = type;
    if (link) existingClass.link = link;
    if (additionalLink) existingClass.additionalLink = additionalLink;

    // Ensure students is an array
    if (students && Array.isArray(students)) {
      existingClass.students = students;
    } else if (students) {
      return NextResponse.json(
        { message: "Invalid students data format. It should be an array of objects." },
        { status: 400 }
      );
    }

    await existingClass.save();

    return NextResponse.json(
      { message: "Class updated successfully", class: existingClass },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
