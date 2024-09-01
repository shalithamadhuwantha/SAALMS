import { connectMongoDB } from "@/lib/mongodb";
import Student from "@/models/student";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, name, image, university, faculty } = await request.json();
  await connectMongoDB();
  await Student.create({ email, name, image, university, faculty });
  return NextResponse.json({ message: "user registed" }, { status: 201 });
}
