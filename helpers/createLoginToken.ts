import { User } from "../models/users";
import bcrypt from "bcrypt";
import { JwtPayload } from "../types/types";
import * as jwt from "jsonwebtoken";
import { loginUserDto } from "../dto/users";
import validate from "../validators/login";

export const createLoginToken = async (data: loginUserDto): Promise<any> => {
  const { error } = validate(data);
  if (error) return { status: 400, message: error.details[0].message };

  let { email, password } = data;

  let user = await User.findOne({ email: email });

  if (!user) return { status: 401, message: "Incorrect email or password" };

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return { status: 400, message: "Incorrect email or password" };

  let payload: JwtPayload = {
    id: user?._id,
    name: user?.username,
    phone: user?.phone_no,
  };

  let secret: string = process.env.JWTKEY || "";
  let token = jwt.sign(payload, secret);

  return {
    status: 200,
    message: "Login successful",
    token: token,
  };
};
