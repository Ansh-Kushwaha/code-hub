import { Request, Response } from "express";
import { cRunner } from "../runners";
import { CompileError, RuntimeError } from "..";

// TODO: Inplement the correct type
const languageRunners: { [key: string]: typeof cRunner } = {
  c: cRunner,
};

export const compileAndRun = async (req: Request, res: Response) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).send("Code and language are required");
  }

  if (!languageRunners[language]) {
    return res.status(400).send("Language not supported");
  }

  try {
    languageRunners[language](code as string)
      .then((output) => {
        res.send({output});
      })
      .catch((error) => {
        if (error instanceof CompileError || error instanceof RuntimeError) {
          res.status(400).send(JSON.stringify({ error: error.message }));
          return;
        }

        res.status(500).send(JSON.stringify({ error: error.toString() }));
      });
  } catch (error) {
    res.status(500).send(JSON.stringify({ error }));
  }

  return;
};
