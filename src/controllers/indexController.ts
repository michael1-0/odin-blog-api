import type { Request, Response } from "express";
import { prisma } from "../db/prisma.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { matchedData, validationResult } from "express-validator";

function helloWorld(req: Request, res: Response) {
  res.json({ hello: "world" });
}

async function postSignup(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const body = matchedData(req);
  try {
    const hash = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
      data: { email: body.email, password: hash },
    });
    const jwtPayload = {
      sub: newUser.id,
      iat: Math.floor(Date.now() / 1000),
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });
    return res.json({ token: token });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function postLogin(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const body = matchedData(req);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }
    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const jwtPayload = {
      sub: user.id,
      iat: Math.floor(Date.now() / 1000),
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });
    return res.json({ token: token });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export { helloWorld, postSignup, postLogin };
