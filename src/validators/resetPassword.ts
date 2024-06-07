import Joi, { ValidationResult } from "joi";

export interface ResetPasswordDto {
  email: string;
  otp: string;
  newPassword: string;
}

export const validateResetPassword = (
  data: ResetPasswordDto
): ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};
