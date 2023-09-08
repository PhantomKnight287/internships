import Joi from "joi";

export const taskCreateSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
