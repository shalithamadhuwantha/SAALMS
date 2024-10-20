// pages/api/getAttendanceInfo.js

import { connectMongoDB } from "@/lib/mongodb";
import Attendance from "@/models/attendance"; // Ensure this path is correct for your project structure
import { NextResponse } from "next/server";

export async function POST(request) {
    const { lectureId, studentEmail } = await request.json();

    // Connect to the MongoDB database
    await connectMongoDB();

    try {
        // Validate inputs
        if (!lectureId) {
            return NextResponse.json(
                { message: "Lecture ID is required." },
                { status: 400 }
            );
        }

        if (!studentEmail) {
            return NextResponse.json(
                { message: "Student email is required." },
                { status: 400 }
            );
        }

        // Find all attendance records for the specified lecture
        const attendanceRecords = await Attendance.find({ lectureId });

        if (attendanceRecords.length === 0) {
            return NextResponse.json(
                { message: "No attendance records found for this lecture." },
                { status: 404 }
            );
        }

        // Prepare the response data in the desired format and sort by date descending
        const attendanceData = attendanceRecords
            .map((record) => {
                const studentAttendance = record.students.find(student => student.email === studentEmail);
                return {
                    date: record.createdAt.toISOString().split('T')[0], // Convert date to "YYYY-MM-DD"
                    status: studentAttendance ? studentAttendance.attendance === '🟢' : false, // Convert attendance emoji to boolean
                };
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
            .map((record, index) => ({
                id: index + 1, // Generate an ID based on the index
                ...record // Spread the date and status into the new object
            }));

        // Respond with the attendance data
        return NextResponse.json(attendanceData, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error processing request", error: error.message },
            { status: 500 }
        );
    }
}
