import { Request, Response } from "express";
import { run } from "../core/runner";

export const compileAndRun = async (req: Request, res: Response) => {
  const { code, language, input } = req.body;

  if (!code || !language) {
    return res.status(400).send("Code and language are required");
  }

  try {
    const output = await run(code, language, input);
    res.send(JSON.stringify({ output }));
  } catch (error: any) {
    console.error("Error: ", error.message);
    res.status(500).send(JSON.stringify({ error: error.message }));
  }

  return;
};
