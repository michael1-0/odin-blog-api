import { Router } from "express";
import postRouter from "./postsRoutes.ts";
import type { Request, Response } from "express";

const indexRouter = Router();
indexRouter.use("/posts", postRouter);
indexRouter.get("/", (req: Request, res: Response) => {
  res.json({ hello: "world" });
});

export default indexRouter;
