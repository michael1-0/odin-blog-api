import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../db/generated/prisma/client.ts";
import { prisma } from "../db/prisma.ts";

async function postPost(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!body.title) {
      return res.status(400).json({ error: "No title found" });
    }
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
  try {
    const id = Number(req.params.id);
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
  try {
    const id = Number(req.params.id);
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
  try {
    const body = req.body;
    const id = Number(req.params.id);
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
