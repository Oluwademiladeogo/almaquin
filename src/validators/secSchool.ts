import Joi from "joi";

export const createSchoolSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string(),
});
