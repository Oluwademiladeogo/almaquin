import { Request, Response } from "express";
import { User } from "../models/users";
import { getHashedPassword } from "../helpers/hashPassword";
import { validateResetPassword } from "../validators/resetPassword";

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;

    const { error } = validateResetPassword({ email, otp, newPassword });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const { hashedPassword } = await getHashedPassword(newPassword);
    user.password = hashedPassword;

    user.otp = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in password reset controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
