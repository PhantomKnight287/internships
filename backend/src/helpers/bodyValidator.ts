import Joi from "joi";

export default async function validateBody(
  schema: Joi.ObjectSchema<any>,
  body: any
) {
  try {
    await schema.validateAsync(body);
  } catch (error) {
    throw new Error(error.message);
  }
}
