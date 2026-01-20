import express from "express";
import indexRouter from "./routes/indexRoutes.ts";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", indexRouter);

export default app;
