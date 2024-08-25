"use client";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const editorThemes: { [key: string]: string } = {
  light: "light",
  dark: "vs-dark",
};

export default function EditorPage() {
  const { theme } = useTheme();
  const [editorTheme, setEditorTheme] = useState(editorThemes[theme!]);

  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    let themeStr = theme;
    if (!themeStr || themeStr === "system") {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        themeStr = "dark";
      } else {
        themeStr = "light";
      }
    }

    setEditorTheme(editorThemes[themeStr]);
  }, [theme]);

  function handleRun() {
    console.log(code);
  }

  return (
    <div className="flex bg-primary/5">
      <div className="editor-container flex flex-row h-[calc(100vh-3.5rem)] w-screen">
        <div className="code-area flex flex-col flex-grow">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={60} minSize={50}>
              <div className="p-2 ml-4 flex items-center justify-between">
                <Select>
                  <SelectTrigger className="h-8 w-[180px] focus:ring-0 focus:ring-transparent focus:ring-offset-0">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="default" size="thin" onClick={handleRun}>
                  Run
                </Button>
              </div>
              <Editor
                theme={editorTheme}
                value={code}
                onChange={(code) => setCode(code || "")}
                language="javascript"
                className="flex flex-grow m-2 max-h-[calc(100vh-6.5rem)]" // fix this
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={30} className="flex flex-col">
              <div className="m-2 h-8 flex items-center justify-between">
                Output
              </div>
              <Separator />
              {/* TODO: Find better approach to solve overflow issue */}
              <div className="flex-grow p-2">Code Hub!</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
