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
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { saveFile } from "../actions/file-actions";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const editorThemes: { [key: string]: string } = {
  light: "light",
  dark: "vs-dark",
};

export default function EditorPage() {
  const { theme } = useTheme();
  const [editorTheme, setEditorTheme] = useState(editorThemes[theme!]);

  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("c");
  const [fileName, setFileName] = useState<string>("");

  const [output, setOutput] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const { data } = useSession();
  const { toast } = useToast();

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

  async function handleRun() {
    const res = await fetch("/api/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        language: language,
      }),
    });
    const data = await res.json();
    setOutput(data.message);
    setIsError(res.status !== 200);
  }

  async function handleSave() {
    try {
      await saveFile({
        name: fileName,
        language: language,
        text: code,
        email: data?.user?.email!,
      });
      toast({
        title: "Success",
        description: "File saved successfully!",
        duration: 1000,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("File with the same name already exists")
      ) {
        toast({
          title: "Error saving file",
          description:
            "A file with the same name already exists. Please choose a different name.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error saving file",
          description: "Unknown error occured.",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <div className="editor-container flex flex-row w-full h-[calc(100vh-3.5rem)] bg-primary/5">
      <div className="code-area flex flex-col w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={60} minSize={50}>
            <div className="p-2 flex items-center justify-between">
              <div className="flex flex-row space-x-2">
                <Select
                  value={language}
                  onValueChange={(value) => setLanguage(value)}
                >
                  <SelectTrigger className="h-8 w-[180px] focus:ring-0 focus:ring-transparent focus:ring-offset-0">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="default" size="thin" onClick={handleRun}>
                  Run
                </Button>
              </div>
              {data?.user ? (
                <div className="flex flex-row space-x-2">
                  <Input
                    type="text"
                    className="h-8 ring-0 ring-transparent ring-offset-0"
                    placeholder="File name to save"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                  <Button
                    variant="secondary"
                    size="thin"
                    onClick={handleSave}
                    disabled={
                      (data?.user ? false : true) || !(fileName.length > 0) || (code.length == 0)
                    }
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <Editor
              theme={editorTheme}
              value={code}
              onChange={(code) => setCode(code || "")}
              language={language}
              className="w-full h-[calc(100vh-6.5rem)] px-2 pb-2"
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={30} className="flex flex-col">
            <div className="m-2 h-8 flex items-center justify-between">
              Output
            </div>
            <Separator />
            {/* Trying text wrap */}
            <div className="flex-grow p-2 font-mono text-wrap break-words">
              <span className={isError ? "text-rose-500" : ""}>{output}</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
