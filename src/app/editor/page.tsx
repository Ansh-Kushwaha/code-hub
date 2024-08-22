"use client";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
    <div className="flex flex-col flex-grow bg-primary/5 overflow-y-hidden">
      <div className="min-h-8 flex items-center px-4 mt-2 space-x-10">
        <div>Options</div>
        <Button variant="outline" size="sm" onClick={handleRun}>
          Run
        </Button>
      </div>
      <div className="flex-grow max-h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={60}
            minSize={50}
            className="m-2 rounded-sm"
          >
            <Editor
              theme={editorTheme}
              value={code}
              onChange={(code) => setCode(code || "")}
              className="rounded-xl"
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={5} className="flex flex-col">
            <div className="p-2 max-h-16 font-semibold">Output</div>
            <Separator />
            {/* TODO: Find better approach to solve overflow issue */}
            <div className="flex-grow overflow-y-auto max-h-[calc(100vh-10rem)]"></div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
