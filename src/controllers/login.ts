import { sendOtp } from "../helpers/sendOtp";
import { Request, Response } from "express";
import { validate } from "../validators/login";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { error } = validate({ email, password });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.headers?.authorization) {
      const otpSent = await sendOtp(email);
      if (!otpSent.success) {
        return res.status(otpSent.status).json({ message: otpSent.message });
      }
      res.status(200).json({ message: "OTP sent to your email" });
    } else {
      res.status(400).json({ message: "User already logged in" });
    }
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
