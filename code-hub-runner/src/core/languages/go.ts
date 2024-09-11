import { execSync } from "child_process";
import { Language } from ".";

export const goLanguage: Language = {
  name: "go",
  type: "interpreted", // Go can be run with a single command

  run: async (file: string) => {
    try {
      const stdout = execSync(`go run ${file}`, {
        encoding: "utf-8",
        stdio: "pipe",
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
