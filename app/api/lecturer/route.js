import { connectMongoDB } from "@/lib/mongodb";
import Lecturer from "../../../models/lecturer";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, name, image, university, faculty } = await request.json();
  await connectMongoDB();
  await Lecturer.create({ email, name, image, university, faculty });
  return NextResponse.json({ message: "user registed" }, { status: 201 });
}
