import { Request, Response } from "express";
import { User } from "../models/users";
import { validate } from "../validators/signup";
import { getHashedPassword } from "../helpers/hashPassword";

export const signupController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { error } = validate(req.body);

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
  } = req.body;

  let user = await User.findOne({ email: email });

  if (user) return res.status(409).json({ message: "User already registered" });

  const { hashedPassword } = await getHashedPassword(password);

  user = new User({
    username: `${surname} ${firstName}`,
    email: email,
    phone_no: phoneNo,
    password: hashedPassword,
    role: "User",
    // Add other details to the user object
    // Ensure that the field names match your model
    surname: surname,
    firstName: firstName,
    birthday: birthday,
    presentSchool: presentSchool,
    classLevel: classLevel,
    reasonForJoining: reasonForJoining,
  });

  await user.save();

  res.status(201).json({ message: "User created successfully" });
};
