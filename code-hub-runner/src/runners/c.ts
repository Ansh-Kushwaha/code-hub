import { exec, spawn } from "node:child_process";
import fs from "node:fs";
import { CompileError, RuntimeError } from "..";
import path from "node:path";

export const cRunner = async (code: string) => {
  const dirPath = path.join(__dirname, "tmp");
  const filePath = path.join(dirPath, "main.c");
  const outputFilePath = path.join(dirPath, "main");

  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, code, { flag: "w" });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create file");
  }

  const compile = spawn("gcc", [filePath, "-o", outputFilePath]);

  return new Promise<string>((resolve, reject) => {
    let compileError = "";
    compile.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      compileError += data;
    });

    let output = "";
    let error = "";

    compile.on("close", (code) => {
      if (code !== 0) {
        fs.unlinkSync(filePath);
        console.error(`Compilation failed with code ${code}: ${compileError}`);
        reject(new CompileError(compileError));
        return;
      }

      const run = spawn(outputFilePath);

      run.stdout.on("data", (data) => {
        output += data;
      });

      run.stderr.on("data", (data) => {
        error += data;
      });

      run.on("close", (code) => {
        fs.unlinkSync(filePath);
        fs.unlinkSync(outputFilePath);
        // TODO: Handle runtime errors
        // if (code !== 0) {
        //   console.error(`Execution failed with code ${code}: ${error}, output: ${output}`);
        //   reject(new RuntimeError(error));
        // }
        console.log(`Execution successful with code ${code}: ${output}`);
        
        resolve(output);
      });
    });
  });
};
