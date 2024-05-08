import { Request, Response } from "express";
import { User } from "../models/users";
import { validate } from "../validators/signup";
import { getHashedPassword } from "../helpers/hashPassword";

export const signupController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let {
    surname,
    firstName,
    birthday,
    phoneNo,
    email,
    presentSchool,
    classLevel,
    reasonForJoining,
    password,
  } = value;

  let user = await User.findOne({ email: email });

  if (user) return res.status(409).json({ message: "User already registered" });

  const { hashedPassword } = await getHashedPassword(password);

  user = new User({
    email,
    phone_no: phoneNo,
    password: hashedPassword,
    surname,
    firstName,
    birthday,
    presentSchool,
    classLevel,
    reasonForJoining,
  });

  await user.save();

  res.status(201).json({ message: "User created successfully" });
};
