import Joi from "joi";

export const NewsSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  publishedDate: Joi.date(),
  pictures: Joi.array().items(Joi.string().uri()),
});
