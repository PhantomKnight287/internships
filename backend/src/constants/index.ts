import "dotenv/config"; // Loading .env file
import joi from "joi";

const envVarsSchema = joi.object({
  NODE_ENV: joi.string().valid("production", "development", "test").required(),
  PORT: joi.number().optional(),
  MONGO_URI: joi.string().required().description("Mongo DB url"),
  JWT_SECRET: joi.string().required().description("JWT secret key"),
});

export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT || 4000;
export const MONGO_URI = process.env.MONGO_URI;

envVarsSchema
  .validateAsync(process.env, { abortEarly: false, allowUnknown: true })
  .catch((err) => {
    console.error(err.details[0].message);
    process.exit(1);
  });
