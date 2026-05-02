import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, budget, message } = body;

    // Basic validation
    if (!name || !email || !projectType || !budget || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Configure transporter using environment variables
    // These should be set in .env.local
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // From user (via authenticated SMTP user)
      to: "cc@creativechauk.com",
      replyTo: email,
      subject: `New Project Inquiry from ${name} - ${projectType}`,
      text: `
        Name: ${name}
        Email: ${email}
        Project Type: ${projectType}
        Budget Range: ${budget}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #F67963; border-bottom: 2px solid #F67963; padding-bottom: 10px;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Budget Range:</strong> ${budget}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <footer style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
            Sent from Creative Chauk Website
          </footer>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Query sent successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send query. Please try again later." },
      { status: 500 }
    );
  }
}
