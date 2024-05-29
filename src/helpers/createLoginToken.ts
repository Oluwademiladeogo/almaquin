import { User } from "../models/users";
import bcrypt from "bcrypt";
import { JwtPayload } from "../types/types";
import * as jwt from "jsonwebtoken";
import { loginUserDto } from "../dto/users";
import validate from "../validators/login";

export const createLoginToken = async (data: loginUserDto): Promise<any> => {
  const { error } = validate(data);
  if (error) return { status: 400, message: error.details[0].message };

  const { email, password } = data;

  try {
    const user = await User.findOne({ email: email });

    if (!user) return { status: 401, message: "Incorrect email or password" };

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid)
      return { status: 401, message: "Incorrect email or password" };

    const payload: JwtPayload = {
      id: user._id,
      name: user.firstName,
      phone: user.phone_no,
    };

    const secret: string = process.env.JWTKEY || "";

    const token = jwt.sign(payload, secret, { expiresIn: "3d" });

    return {
      status: 200,
      message: "Login successful",
      token: token,
    };
  } catch (error) {
    console.error("Error creating login token:", error);
    return { status: 500, message: "Internal Server Error" };
  }
};
