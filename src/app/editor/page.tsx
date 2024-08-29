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

  function handleRun() {
    console.log(code);
  }

  async function handleSave() {
    try {
      await saveFile({
        name: fileName,
        type: language,
        text: code,
        email: data?.user?.email!,
      });
      toast({
        title: "Success",
        description: "File saved successfully!",
        duration: 3000,
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
    <div className="flex bg-primary/5">
      <div className="editor-container flex flex-row h-[calc(100vh-3.5rem)] w-screen">
        <div className="code-area flex flex-col flex-grow">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={60} minSize={50}>
              <div className="p-2 mx-4 flex items-center justify-between">
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
                  </SelectContent>
                </Select>
                <div className="space-x-2 flex flex-row">
                  <Button variant="default" size="thin" onClick={handleRun}>
                    Run
                  </Button>
                  {data?.user ? (
                    <Input
                      type="text"
                      className="h-8"
                      placeholder="File name to save"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                    />
                  ) : (
                    <></>
                  )}
                  <Button
                    variant="secondary"
                    size="thin"
                    onClick={handleSave}
                    disabled={
                      (data?.user ? false : true) || !(fileName.length > 0)
                    }
                  >
                    Save
                  </Button>
                </div>
              </div>
              <Editor
                theme={editorTheme}
                value={code}
                onChange={(code) => setCode(code || "")}
                language={language}
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
