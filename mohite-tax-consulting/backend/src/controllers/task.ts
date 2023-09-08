import { Router } from "express";
import validateBody from "../helpers/bodyValidator.js";
import { taskCreateSchema } from "../dto/task.js";
import { nanoid } from "nanoid";
import prisma from "../db/prisma.js";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../constants/index.js";

const router = Router();

router.post("/task", async (req, res) => {
  try {
    await validateBody(taskCreateSchema, req.body);
  } catch (e) {
    return res.status(400).json(e.message);
  }
  const header = req.headers.authorization.split(" ")[1];
  const { id } = verify(header, JWT_SECRET) as { id: string };
  const { title, description } = req.body;
  const slug = nanoid();
  const task = await prisma.task.create({
    data: {
      user: {
        connect: {
          id,
        },
      },
      completed: false,
      description,
      slug,
      title,
    },
    select: {
      slug: true,
    },
  });
  return res.status(201).json(task);
});

router.get("/task/:task", async (req, res) => {
  const { task } = req.params;
  const { id } = verify(
    req.headers.authorization.split(" ")[1],
    JWT_SECRET
  ) as { id: string };
  const t = await prisma.task.findFirst({
    where: {
      slug: task,
      user: {
        id,
      },
    },
    select: {
      completed: true,
      createdAt: true,
      id: true,
      slug: true,
      title: true,
      description: true,
    },
  });
  if (!t) return res.status(404).json({ message: "Task not found" });
  return res.status(200).json(t);
});

router.get("/tasks", async (req, res) => {
  const { take } = req.query;
  const toTake = Number.isNaN(Number(take)) ? 10 : Number(take);
  const { id } = verify(
    req.headers.authorization.split(" ")[1],
    JWT_SECRET
  ) as { id: string };
  const tasks = await prisma.task.findMany({
    where: {
      user: {
        id,
      },
    },
    take: toTake,
    skip: toTake > 10 ? toTake - 10 : undefined,
  });
  const response = { tasks };
  if (tasks.length === 10) {
    response["next"] = toTake + 10;
  }
  return res.status(200).json(response);
});

router.patch("/task/:task", async (req, res) => {
  const { task } = req.params;
  const { id } = verify(
    req.headers.authorization.split(" ")[1],
    JWT_SECRET
  ) as { id: string };
  const t = await prisma.task.findFirst({
    where: {
      slug: task,
      user: {
        id,
      },
    },
  });
  if (!t) return res.status(404).json({ message: "Task not found" });
  const { title, description, completed } = req.body;
  const updatedTask = await prisma.task.update({
    where: {
      slug: task,
    },
    data: {
      title,
      description,
      completed,
    },
  });
  return res.status(200).json(updatedTask);
});

router.delete("/task/:task", async (req, res) => {
  const { task } = req.params;
  const { id } = verify(
    req.headers.authorization.split(" ")[1],
    JWT_SECRET
  ) as { id: string };
  const t = await prisma.task.findFirst({
    where: {
      slug: task,
      user: {
        id,
      },
    },
  });
  if (!t) return res.status(404).json({ message: "Task not found" });
  const deletedTask = await prisma.task.delete({
    where: {
      slug: task,
    },
  });
  return res.status(200).json(deletedTask);
});

export default router as Router;
