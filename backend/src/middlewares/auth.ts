import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../constants/index.js";

const ROUTES_TO_IGNORE = ["/", "/auth/login", "/auth/register"];

export default function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "OPTIONS") return next();
  if (ROUTES_TO_IGNORE.includes(req.originalUrl)) {
    return next();
  }
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    verify(token, JWT_SECRET);
  } catch (e) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}
