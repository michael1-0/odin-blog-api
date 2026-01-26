import { Router } from "express";
import {
  getComments,
  getComment,
  postComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.ts";
import { validateComment } from "../middlewares/validation.ts";
import requireAuth from "../middlewares/auth.ts";

const commentRouter = Router();

commentRouter.get("/", getComments);
commentRouter.get("/:id", getComment);
commentRouter.post("/", validateComment, postComment);
commentRouter.put("/:id", requireAuth, validateComment, updateComment);
commentRouter.delete("/:id", requireAuth, deleteComment);

export default commentRouter;
