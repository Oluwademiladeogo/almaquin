import { Request, Response } from "express";
import { User } from "../models/users";
import { getHashedPassword } from "../helpers/hashPassword";
import validate from "../validators/resetPassword";

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    const { error } = validate({ token, password });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const { hashedPassword } = await getHashedPassword(password);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.otp = undefined;
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in reset password controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
