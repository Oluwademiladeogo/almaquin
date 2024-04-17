import { Request, Response, Router } from "express";
import { User } from "../models/users";
import { validate } from "../validators/signup";
import { signupUserDto } from "../dto/users";
import { getHashedPassword } from "../helpers/hashPassword";

export const signupController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { error } = validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  let { username, phone_no, email, password } = req.body;

  let user = await User.findOne({ email: email });

  if (user) return res.status(409).json({ message: "User already registered" });

  const { hashedPassword } = await getHashedPassword(password);

  user = new User({
    username: username,
    phone_no: phone_no,
    email: email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({ message: "User created successfully" });
};
