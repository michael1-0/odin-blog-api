import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../db/generated/prisma/client.ts";
import { prisma } from "../db/prisma.ts";

async function getComments(req: Request, res: Response, next: NextFunction) {
  try {
    const postId = Number(req.query.postId);
    if (!postId) {
      return res.status(400).json({ error: "Query param postId missing" });
    }
    const comments = await prisma.comment.findMany({
      select: { id: true, username: true, content: true },
      where: { postId: postId },
    });
    res.json({ data: comments });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function getComment(req: Request, res: Response, next: NextFunction) {
  try {
    const postId = Number(req.query.postId);
    if (!postId) {
      return res.status(400).json({ error: "Query param postId missing" });
    }
    const id = Number(req.params.id);
    const comment = await prisma.comment.findUnique({
      where: { id: id, postId: postId },
    });
    res.json({ data: comment });
  } catch (error) {
    return res.json(500).json(error);
  }
}

async function postComment(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: "Body missing" });
    }
    const postId = Number(req.query.postId);
    if (!body.content) {
      return res.status(400).json({ error: "Content missing" });
    }
    if (!postId) {
      return res.status(400).json({ error: "Query param postId missing" });
    }
    const comment = await prisma.comment.create({
      data: {
        postId,
        username: body.username || "Anonymous",
        content: body.content,
      },
    });
    res.json({ data: comment });
  } catch (error) {
    return res.json(500).json(error);
  }
}

async function updateComment(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const id = Number(req.params.id);
    if (!body) {
      return res.status(400).json({ error: "Body missing" });
    }
    if (!body.content) {
      return res.status(400).json({ error: "Content missing" });
    }
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content: body.content, username: body.username },
    });
    res.json({ data: updatedComment });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Not Found" });
    }
    return res.json(500).json(error);
  }
}

async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const deletedComment = await prisma.comment.delete({
      where: { id },
    });
    res.json({ data: deletedComment });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Not Found" });
    }
    return res.json(500).json(error);
  }
}

export { getComments, getComment, postComment, updateComment, deleteComment };
