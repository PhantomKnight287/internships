import { Router } from "express";
import prisma from "../db/prisma.js";
import { registerSchema } from "../dto/auth.js";
import validateBody from "../helpers/bodyValidator.js";
import { compare, hash } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;
import { JWT_SECRET } from "../constants/index.js";

const router = Router();

router.post("/auth/register", async (req, res) => {
  try {
    await validateBody(registerSchema, req.body);
  } catch (e) {
    return res.status(400).json({
      message: e.details[0].message,
    });
  }
  const { username, password } = req.body;
  const olderUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (olderUser)
    return res.status(409).json({
      message: "Username is already taken",
    });
  const user = await prisma.user.create({
    data: {
      username,
      password: await hash(password, 10),
    },
    select: {
      username: true,
      id: true,
    },
  });
  const token = sign(
    {
      id: user.id,
    },
    JWT_SECRET
  );
  return res.status(201).json({
    user: {
      username: user.username,
    },
    token,
  });
});

router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    await validateBody(registerSchema, req.body);
  } catch (e) {
    return res.status(400).json({
      message: e.details[0].message,
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user)
    return res.status(404).json({
      message: "Invalid username or password",
    });
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({
      message: "Invalid username or password",
    });
  const token = sign(
    {
      id: user.id,
    },
    JWT_SECRET
  );
  return res.status(200).json({
    user: {
      username: user.username,
    },
    token,
  });
});

export default router as Router;
