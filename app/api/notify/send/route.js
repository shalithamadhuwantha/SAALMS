import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(request) {
  const { emailList, lectureDetails, subject } = await request.json();

  // Validate required fields
  if (!emailList || emailList.length === 0 || !lectureDetails  || !subject) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const senderEmail = "saalms@shalithamadhuwantha.me";
  const senderName= "SA&LMS Lecture Notifications"

  // Read the HTML template from the file system
  const filePath = path.join(process.cwd(), 'app/api/notify/send/template.html'); // Adjust the path accordingly
  let htmlContent;
  try {
    htmlContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to read HTML template", error: error.message },
      { status: 500 }
    );
  }

  // Create a transporter using Brevo SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_usr,
      pass: process.env.SMTP_pass,
    },
  });

  // Loop through the email list and send emails
  const failedEmails = [];
  for (const student of emailList) {
    const { name: studentName, email: to } = student;
    const { lectureName, lectureDate, lectureTime, lecturerName, lectureurl } = lectureDetails;

    // Replace placeholders with actual values for the current student
    let personalizedHtml = htmlContent
      .replace(/\[Student Name\]/g, studentName)
      .replace(/\[Lecture Name\]/g, lectureName)
      .replace(/\[Lecture Date\]/g, lectureDate)
      .replace(/\[Lecture Time\]/g, lectureTime)
      .replace(/\[Lecturer Name\]/g, lecturerName)
      .replace(/\[SA&LMS_URL\]/g, lectureurl)
      .replace(/\[Create_Account_URL\]/g, 'https://saalms.shalithamdhuwantha.me/')
      .replace(/\[Support Email\]/g, 'support@example.com');

    // Create the email options for this student
    const mailOptions = {
      from: `"${senderName}" <${senderEmail}>`,
      to: to,
      subject: subject,
      html: personalizedHtml,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
    } catch (error) {
      // Collect failed emails for logging
      failedEmails.push({ studentName, email: to, error: error.message });
    }
  }

  // Return the result
  if (failedEmails.length > 0) {
    return NextResponse.json(
      { message: "Some emails failed to send", failedEmails },
      { status: 500 }
    );
  } else {
    return NextResponse.json(
      { message: "All emails sent successfully" },
      { status: 200 }
    );
  }
}
