"use client";

import React , {useState}from 'react';
import LoadingSpinner from "@/app/components/root/LoadingSpinner";

interface Student {
  id: number;
  name: string;
  email: string;
  registrationNumber: string;
  attendance: string;
}

interface CourseResponse {
  message: string;
  course: {
    students: Student[];
  };
}

interface AttendanceResponse {
  message: string;
  classId?: string; // Include classId for existing attendance
  attendance?: {
    _id: string; // Capture _id from the attendance record
  };
  error?: string;
}
const AttendanceComponent = {
  
  fetchStudents: async (courseCode: string): Promise<Student[] | { message: string; error: string }> => {
     
    
    try {
      const response = await fetch("/api/course/find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: courseCode }),
      });

      const data: CourseResponse = await response.json();
      console.log(data);

      if (data.message === "Course found") {
        return data.course.students.map((student) => ({
          ...student,
          attendance: "🔴", // Set attendance to "NO"
        }));
      } else {
        throw new Error("Course not found");
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Error fetching students",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },

  sendAttendance: async (lectureId: string, students: Student[]): Promise<{ message: string; classId?: string; attendanceId?: string; error?: string }> => {
    console.log(students);
    console.log(lectureId);
    try {
      const response = await fetch("/api/attandace/make", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "lectureId":lectureId,
          "students":students,
        }),
      });

      const data: AttendanceResponse = await response.json();

      if (response.ok) {
        // Capture both classId and attendance _id if available
        return { 
          message: "Attendance recorded successfully", 
          classId: data.classId,
          attendanceId: data.attendance?._id // Optional chaining to safely access _id
        };
      } else {
        throw new Error(data.message || "Error recording attendance");
      }
    } catch (error) {
      console.error(error);
      return {
        message: "Error sending attendance",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },

  handleAttendance: async (courseCode: string) => {
    const students = await AttendanceComponent.fetchStudents(courseCode);
    if (Array.isArray(students)) {
      const attendanceResponse = await AttendanceComponent.sendAttendance(courseCode, students);
      console.log(attendanceResponse);
      // Returning classId and attendanceId if successful
      if (attendanceResponse.classId || attendanceResponse.attendanceId) {
        return {
          classId: attendanceResponse.classId,
          attendanceId: attendanceResponse.attendanceId,
        };
      }
    } else {
      console.error(students); // Log any error message from fetching students
    }
  },
};

export default AttendanceComponent;
