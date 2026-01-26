import passport from "../middlewares/passport.ts";
import type { NextFunction, Request, Response } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      req.user = user;
      next();
    },
  )(req, res, next);
};

export default requireAuth;
