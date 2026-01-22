import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../db/generated/prisma/client.ts";
import { prisma } from "../db/prisma.ts";
import { validationResult, matchedData } from "express-validator";

async function postPost(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const body = matchedData(req);
  try {
    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });
    res.json({ data: newPost });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getPosts(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
      },
    });
    res.json({ data: posts });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getPost(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid parameter" });
  }
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.json({ data: post });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deletePost(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid parameter" });
  }
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.json({ data: deletedPost });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Not Found" });
    }
    return res.status(500).json({ error });
  }
}

async function updatePost(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const body = matchedData(req);
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid parameter" });
  }
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });
    res.json({ data: updatedPost });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Not Found" });
    }
    return res.status(500).json({ error });
  }
}

export { postPost, getPosts, getPost, deletePost, updatePost };
