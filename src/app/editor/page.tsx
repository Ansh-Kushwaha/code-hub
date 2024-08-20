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
    <div className="flex flex-col flex-grow max-h-screen">
      <div className="min-h-8 flex items-center px-4 justify-between">
        <div>Options</div>
      </div>
      <Separator />
      <div className="flex-grow max-h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={60} minSize={5}>
            <Editor
              theme={editorTheme}
              value={code}
              onChange={(code) => setCode(code || "")}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={5} className="flex flex-col">
            <div className="p-2 max-h-16">
              <Button onClick={handleRun}>Run</Button>
            </div>
            <Separator />
            {/* TODO: Find better approach to solve overflow issue */}
            <div className="flex-grow overflow-y-auto max-h-[calc(100vh-10rem)]"></div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
