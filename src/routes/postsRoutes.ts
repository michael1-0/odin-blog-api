import { Router } from "express";
import {
  postPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.ts";

const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);
postRouter.post("/", postPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
