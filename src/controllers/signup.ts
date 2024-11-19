import { Request, Response } from "express";
import { User } from "../models/users";
import { validate } from "../validators/signup";
import { getHashedPassword } from "../helpers/hashPassword";
import { sendOtp } from "../helpers/sendOtp";

export const signupController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { error, value } = validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    req.body.email = req.body.email.toLowerCase();
    const {
      surname,
      firstName,
      birthday,
      phoneNo,
      email,
      presentSchool,
      classLevel,
      reasonForJoining,
      schoolLocation,
      password,
    } = value;

    // Check if user already exists (for extra safety beyond MongoDB constraints)
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNo }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ message: "Email is already registered" });
      }
      if (existingUser.phoneNo === phoneNo) {
        return res
          .status(409)
          .json({ message: "Phone number is already registered" });
      }
    }

    const { hashedPassword } = await getHashedPassword(password);

    const user = new User({
      email,
      phoneNo,
      password: hashedPassword,
      surname,
      firstName,
      birthday,
      presentSchool,
      schoolLocation,
      classLevel,
      reasonForJoining,
    });

    await user.save();

    const otpSent = await sendOtp(email);
    if (!otpSent.success) {
      return res.status(otpSent.status).json({ message: otpSent.message });
    }

    return res
      .status(201)
      .json({ message: "User created successfully, OTP sent to your email" });
  } catch (err: any) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      const duplicateKey = Object.keys(err.keyPattern || {})[0];
      let message = "Duplicate key error occurred";
      if (duplicateKey === "email") {
        message = "Email is already registered. Please use a different email.";
      } else if (duplicateKey === "phoneNo") {
        message =
          "Phone number is already registered. Please use a different phone number.";
      }

      return res.status(409).json({ message });
    }

    // Handle other unexpected errors
    console.error("Unexpected error occurred:", err);
    return res
      .status(500)
      .json({ message: "An unexpected error occurred. Please try again later." });
  }
};
