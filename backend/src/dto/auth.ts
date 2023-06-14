import joi from "joi";

export const registerSchema = joi.object({
  username: joi.string().alphanum().required(),
  password: joi.string().min(6).required(),
});
