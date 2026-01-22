import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../db/generated/prisma/client.ts";
import { prisma } from "../db/prisma.ts";
import { matchedData, validationResult } from "express-validator";

async function getComments(req: Request, res: Response, next: NextFunction) {
  const postId = Number(req.query.postId);
  if (!postId) {
    return res.status(400).json({ error: "Query param postId invalid" });
  }
  try {
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
  const postId = Number(req.query.postId);
  if (!postId) {
    return res.status(400).json({ error: "Query param postId invalid" });
  }
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid parameter" });
  }
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: id, postId: postId },
    });
    res.json({ data: comment });
  } catch (error) {
    return res.json(500).json(error);
  }
}

async function postComment(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const body = matchedData(req);
  const postId = Number(req.query.postId);
  if (!postId) {
    return res.status(400).json({ error: "Query param postId invalid" });
  }
  try {
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
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid parameter" });
  }
  try {
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
