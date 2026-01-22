import { Router } from "express";
import {
  postPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.ts";
import { validatePost } from "../middlewares/validation.ts";

const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);
postRouter.post("/", validatePost, postPost);
postRouter.put("/:id", validatePost, updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
