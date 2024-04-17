import { signupUserDto } from "../dto/users";
import Joi, { ValidationResult } from "joi";

const Schema = Joi.object({
  username: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().min(5).max(255).required(),
  phone_no: Joi.string().min(7).max(15).required(),
  password: Joi.string().min(8).max(255).required(),
});

export const validate = (data: signupUserDto): ValidationResult => {
  return Schema.validate(data);
};
