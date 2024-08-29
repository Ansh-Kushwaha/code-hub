import { cLanguage } from "./c";

export interface Language {
  name: string;
  type: "compiled" | "interpreted";

  compile?: (sourceFile: string) => Promise<string>;
  run: (file: string) => Promise<string>;
}

export const languages: Record<string, Language> = {
  c: cLanguage,
};
