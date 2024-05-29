import Joi, { ValidationResult } from "joi";
import { loginUserDto } from "../dto/users";

const Schema = Joi.object({
  email: Joi.string().email().min(5).max(255).required(),
  password: Joi.string().min(8).max(255).required(),
});

export const validate = (data: loginUserDto): ValidationResult => {
  return Schema.validate(data);
};

export default validate;
