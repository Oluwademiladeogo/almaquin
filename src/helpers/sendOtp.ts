import nodemailer from "nodemailer";
import { User } from "../models/users";

export const sendOtp = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user)
      return { success: false, status: 404, message: "User not found" };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save({ validateBeforeSave: false });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code from AlmaQuin",
      text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, status: 200, message: "OTP sent to email" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, status: 500, message: "Internal Server Error" };
  }
};
