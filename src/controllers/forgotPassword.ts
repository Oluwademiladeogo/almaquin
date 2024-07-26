import { Request, Response } from "express";
import { sendMagicLink } from "../helpers/sendMagicLink";
import { User } from "../models/users";
import crypto from "crypto";

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase()
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(expires);
    await user.save();

    const magicLinkSent = await sendMagicLink(email, token);
    if (!magicLinkSent.success) {
      return res
        .status(magicLinkSent.status || 500)
        .json({ message: magicLinkSent.message });
    }

    res
      .status(200)
      .json({ message: "Magic link sent to your email for password reset" });
  } catch (error) {
    console.error("Error in forgot password controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
