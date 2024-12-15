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
import { use, useEffect, useState } from "react";
import { saveFile } from "../actions/file-actions";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const editorThemes: { [key: string]: string } = {
  light: "light",
  dark: "vs-dark",
};

const languages: { [key: string]: string } = {
  c: "C",
  cpp: "C++",
  java: "Java",
  python: "Python",
  go: "Go",
};

interface Templates {
  [key: string]: string;
}

export default function EditorPage() {
  const { theme } = useTheme();
  const [editorTheme, setEditorTheme] = useState(editorThemes[theme!]);

  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("c");
  const [fileName, setFileName] = useState<string>("");

  const [output, setOutput] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [templates, setTemplates] = useState<Templates>();

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

  useEffect(() => {
    fetch("/templates.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load templates");
        }
        return response.json();
      })
      .then((data) => {
        setTemplates(data.templates);
      })
      .catch((error) => console.error(error));
  }, []);

  function updateLanguage(value: string) {
    setLanguage(value);
    const lang: string = languages[value];
    setCode(templates?.[lang] || "");
  }

  async function handleRun() {
    setOutput("");
    const res = await fetch("/api/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        language: language,
        input: input,
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
    <div className="editor-container flex flex-row w-full h-[calc(100vh-3.5rem)] bg-background">
      <div className="flex flex-col w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={60}
            minSize={50}
            className="code-area bg-neutral-100 dark:bg-neutral-900 m-1 ml-2 mb-2 rounded-md"
          >
            <div className="p-2 flex items-center justify-between">
              <div className="flex flex-row space-x-2">
                <Select
                  value={language}
                  onValueChange={(value) => updateLanguage(value)}
                >
                  <SelectTrigger className="h-8 w-[180px] focus:ring-0 focus:ring-transparent focus:ring-offset-0">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languages).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
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
                    variant="default"
                    size="thin"
                    onClick={handleSave}
                    disabled={
                      (data?.user ? false : true) ||
                      !(fileName.length > 0) ||
                      code.length == 0
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
              defaultValue={templates?.["C"] || ""}
              value={code}
              onChange={(newCode) => setCode(newCode || "")}
              language={language}
              className="w-full h-[calc(100vh-6.5rem)] px-2 pb-2"
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={30} defaultSize={40}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel
                defaultSize={70}
                minSize={40}
                className="output-panel bg-neutral-100 dark:bg-neutral-900 m-1 mr-2 rounded-md"
              >
                <div className="flex items-center justify-between">
                  <span className="m-1 p-1 rounded-md font-semibold flex-grow items-start">
                    Output
                  </span>
                </div>
                <Separator />
                <div className="flex-grow p-2 font-mono text-wrap whitespace-break-spaces">
                  <span className={isError ? "text-rose-500" : ""}>
                    {output}
                  </span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel
                defaultSize={30}
                minSize={10}
                className="input-panel flex flex-col bg-neutral-100 dark:bg-neutral-900 m-1 mr-2 mb-2 rounded-md hover:ring-1"
              >
                <div className="flex items-center justify-between">
                  <span className="m-1 p-1 rounded-md font-semibold flex-grow items-start">
                    Input
                  </span>
                </div>
                <Separator />
                <div className="flex-grow font-mono text-wrap whitespace-break-spaces">
                  <textarea
                    className="p-2 bg-transparent resize-none flex-grow w-full h-full focus:outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
