import { cLanguage } from "./c";
import { cppLanguage } from "./cpp";
import { goLanguage } from "./go";
import { javaLanguage } from "./java";
import { pythonLanguage } from "./python";

export interface Language {
  name: string;
  type: "compiled" | "interpreted";

  compile?: (sourceFile: string) => Promise<string>;
  run: (file: string) => Promise<string>;
}

export const languages: Record<string, Language> = {
  c: cLanguage,
  cpp: cppLanguage,
  go: goLanguage,
  java: javaLanguage,
  python: pythonLanguage,
};
