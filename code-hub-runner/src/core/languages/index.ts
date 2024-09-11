import { cLanguage } from "./c";
import { goLanguage } from "./go";

export interface Language {
  name: string;
  type: "compiled" | "interpreted";

  compile?: (sourceFile: string) => Promise<string>;
  run: (file: string) => Promise<string>;
}

export const languages: Record<string, Language> = {
  c: cLanguage,
  go: goLanguage
};
