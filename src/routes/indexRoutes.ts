import { Router } from "express";

import postRouter from "./postsRoutes.ts";
import commentRouter from "./commentsRoutes.ts";

import { validateLogin, validateSignup } from "../middlewares/validation.ts";

import {
  helloWorld,
  postLogin,
  postSignup,
} from "../controllers/indexController.ts";

const indexRouter = Router();

indexRouter.use("/posts", postRouter);
indexRouter.use("/comments", commentRouter);

indexRouter.get("/", helloWorld);
indexRouter.post("/sign-up", validateSignup, postSignup);
indexRouter.post("/log-in", validateLogin, postLogin);

export default indexRouter;
