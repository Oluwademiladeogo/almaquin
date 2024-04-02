import { User } from "../models/users";
import { validate } from "../validators/signup";
import { signupUserDto } from "../dto/users";
import { getHashedPassword } from "../helpers/hashPassword";

export const signupController = async (data: signupUserDto) => {
  const { error } = validate(data);

  if (error) return { status: 400, message: error.details[0].message };

  let { username, phone_no, email, password } = data;

  let user = await User.findOne({ email: email });

  if (user) return { status: 409, message: "User already registered" };

  const { hashedPassword } = await getHashedPassword(password);
  console.log(hashedPassword)
  user = new User({
    username: username,
    phone_no: phone_no,
    email: email,
    password: hashedPassword,
  });

  await user.save();

  return { status: 201, message: "User created successfully" };
};
