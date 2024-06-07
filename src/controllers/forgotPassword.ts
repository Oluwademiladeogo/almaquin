import { Request, Response } from "express";
import { sendOtp } from "../helpers/sendOtp";
import { User } from "../models/users";

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpSent = await sendOtp(email);
    if (!otpSent.success) {
      return res.status(otpSent.status).json({ message: otpSent.message });
    }

    res.status(200).json({ message: "OTP sent to your email for password reset" });
  } catch (error) {
    console.error("Error in forgot password controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
