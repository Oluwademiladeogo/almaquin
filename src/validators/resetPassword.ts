import Joi, { ValidationResult } from "joi";
import { resetPasswordDto } from "../dto/users";

const Schema = Joi.object({
  token: Joi.string().email().min(5).max(255).required(),
  password: Joi.string().min(8).max(255).required(),
});

export const validate = (data: resetPasswordDto): ValidationResult => {
  return Schema.validate(data);
};

export default validate;
