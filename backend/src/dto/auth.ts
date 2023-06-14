import joi from "joi";

export const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});
