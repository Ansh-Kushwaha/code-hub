import { Router } from "express";
import { compileAndRun } from "../controllers/compilerController";

export const compilerRouter = Router();

compilerRouter.get("/", (req, res) => {
  res.send("Compilers say hello!");
});

compilerRouter.post("/", (req, res) => {
  try {
    compileAndRun(req, res);
  } catch (error) {
    res.status(500).send(JSON.stringify({ error }));
  }
});
