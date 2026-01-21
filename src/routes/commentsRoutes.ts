import { Router } from "express";
import {
  getComments,
  getComment,
  postComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.ts";

const commentRouter = Router();

commentRouter.get("/", getComments);
commentRouter.get("/:id", getComment);
commentRouter.post("/", postComment);
commentRouter.put("/:id", updateComment);
commentRouter.delete("/:id", deleteComment);

export default commentRouter;
