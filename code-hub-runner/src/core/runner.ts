import fs from "node:fs";
import { languages } from "./languages";
import { writeToFile } from "./utils";
import { execSync } from "node:child_process";

const directory = "/code-hub/temp";

export async function run(code: string, languageName: string, input:string) {
  const language = languages[languageName];
  if (!language) {
    throw new Error(`Language ${languageName} is not supported`);
  }

  let filename = `${directory}/main.${languageName}`;
  if (languageName === "java") {
    filename = `${directory}/Main.${languageName}`
  }

  const { path: sourceFile } = writeToFile(
    filename,
    code
  );

  let outputFile = sourceFile;
  if (language.type === "compiled") {
    if (!language.compile) {
      console.error(`Compilation is not supported for ${languageName}`);
      process.exit(1);
    }
    outputFile = await language.compile(sourceFile);
  }

  const output = await language.run(outputFile, input);

  // cleanup(sourceFile, outputFile);

  return output;
}

function cleanup(sourceFile: string, outputFile: string) {
  fs.unlinkSync(sourceFile);
  if (sourceFile !== outputFile) {
    fs.unlinkSync(outputFile);
  }
}
