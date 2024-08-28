import express from "express";
import { compilerRouter } from "./routes/compile";

const app = express();

app.use(express.json());

app.use("/compile", compilerRouter);

app.get("/", (req, res) => {
  res.send("Compilers are working!");
});

app.listen(5678, () => {
  console.log("Server is running on port 5678");
});

export class CompileError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class RuntimeError extends Error {
  constructor(message: string) {
    super(message);
  }
}