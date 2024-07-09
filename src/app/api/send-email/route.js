// pages/api/send-email.js

import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
async function handler(req) {
  if (req.method === "POST") {
    const body = await req.json();
    const { name, company, phone, email, subject, message } = body;
    // Create a transporter object
    // const transporter = nodemailer.createTransport({
    //   service: "gmail", // or use another email service
    //   auth: {
    //     user: process.env.EMAIL_USER, // use environment variable
    //     pass: process.env.EMAIL_PASS, // use environment variable
    //   },
    // });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "figma.dev2024@gmail.com",
      subject: `New message from ${name}: ${subject}`,
      text: `
                Full Name: ${name}
                Company: ${company}
                Phone: ${phone}
                Company Email: ${email}
                Subject: ${subject}
                Message: ${message}
            `,
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);

      return NextResponse.json({ message: "Email sent successfully" });
      // res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
}

export { handler as POST };
