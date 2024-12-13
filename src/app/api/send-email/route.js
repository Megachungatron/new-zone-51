import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // Use Node.js runtime

export async function POST(req) {
    try {
        const body = await req.json();
        const { to, subject, html } = body;

        // Create a test SMTP transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER, // Your Ethereal email username
                pass: process.env.ETHEREAL_PASS, // Your Ethereal email password
            },
        });

        // Send email
        const info = await transporter.sendMail({
            from: '"Your App" <no-reply@yourapp.com>', // Sender address
            to, // Recipient address
            subject, // Subject line
            html, // HTML body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        return NextResponse.json({
            success: true,
            messageId: info.messageId,
            previewUrl: nodemailer.getTestMessageUrl(info),
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
