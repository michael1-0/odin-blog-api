import { Router } from "express";
import {
  getComments,
  getComment,
  postComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.ts";
import { validateComment } from "../middlewares/validation.ts";

const commentRouter = Router();

commentRouter.get("/", getComments);
commentRouter.get("/:id", getComment);
commentRouter.post("/", validateComment, postComment);
commentRouter.put("/:id", validateComment, updateComment);
commentRouter.delete("/:id", deleteComment);

export default commentRouter;
