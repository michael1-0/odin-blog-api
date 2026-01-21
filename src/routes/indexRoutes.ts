import { Router } from "express";
import type { Request, Response } from "express";

import postRouter from "./postsRoutes.ts";
import commentRouter from "./commentsRoutes.ts";

const indexRouter = Router();

indexRouter.use("/posts", postRouter);
indexRouter.use("/comments", commentRouter);

indexRouter.get("/", (req: Request, res: Response) => {
  res.json({ hello: "world" });
});

export default indexRouter;
