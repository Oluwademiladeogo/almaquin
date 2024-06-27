import { Request, Response } from "express";
import { User } from "../models/users";
import { validate } from "../validators/signup";
import { getHashedPassword } from "../helpers/hashPassword";
import { sendOtp } from "../helpers/sendOtp";

export const signupController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  req.body.email = req.body.email.toLowerCase();

  let {
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

  let user = await User.findOne({ email: email });

  if (user) return res.status(409).json({ message: "User already registered" });

  const { hashedPassword } = await getHashedPassword(password);

  user = new User({
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

  res
    .status(201)
    .json({ message: "User created successfully, OTP sent to your email" });
};
