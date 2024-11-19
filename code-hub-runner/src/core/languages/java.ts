import { execSync } from "child_process";
import { Language } from ".";

export const javaLanguage: Language = {
  name: "java",
  type: "compiled",

  compile: async (sourceFile: string) => {
    try {
      const output = sourceFile.replace(".java", "");
      execSync(`javac ${sourceFile}`, {
        encoding: "utf-8",
        stdio: "pipe",
      });

      return output;
    } catch (error: any) {
      if (error.code) {
        console.error("Error code: ", error.code);
        throw new Error("Compilation failed");
      } else {
        const stderr = error.stderr as string;
        console.error("stderr: ", stderr);
        throw new Error("Error while compiling: " + stderr);
      }
    }
  },

  run: async (file: string) => {
    try {
      const stdout = execSync(`java Main`, {
        encoding: "utf-8",
        stdio: "pipe",
        cwd: "/code-hub/temp/"
      });

      return stdout;
    } catch (error: any) {
      if (error.code) {
        console.error("Error code: ", error.code);
        throw new Error("Execution failed");
      } else {
        const stderr = error.stderr as string;
        console.error("stderr: ", stderr);
        throw new Error("Runtime error: " + stderr);
      }
    }
  },
};
