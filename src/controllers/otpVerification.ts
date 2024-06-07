import { Request, Response } from "express";
import { User } from "../models/users";

export const otpVerificationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error in OTP verification controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
