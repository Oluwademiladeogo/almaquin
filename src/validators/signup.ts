import Joi, { ValidationResult } from "joi";
import { SignupUserDto } from "../dto/users";
const Schema = Joi.object({
  surname: Joi.string().min(2).max(255).required(),
  firstName: Joi.string().min(2).max(255).required(),
  birthday: Joi.date().required(),
  phone_no: Joi.string().min(7).max(15).required(),
  email: Joi.string().email().min(5).max(255).required(),
  presentSchool: Joi.string().min(2).max(255).required(),
  schoolLocation: Joi.string().min(2).max(255).required(),
  classLevel: Joi.string().min(1).max(50).required(),
  reasonForJoining: Joi.string().min(2).max(255).required(),
  password: Joi.string().min(8).max(255).required(),
});

export const validate = (data: SignupUserDto): ValidationResult => {
  return Schema.validate(data);
};
