import { Router } from "express";
import {
  postPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.ts";
import { validatePost } from "../middlewares/validation.ts";
import requireAuth from "../middlewares/auth.ts";

const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);
postRouter.post("/", requireAuth, validatePost, postPost);
postRouter.put("/:id", requireAuth, validatePost, updatePost);
postRouter.delete("/:id", requireAuth, deletePost);

export default postRouter;
