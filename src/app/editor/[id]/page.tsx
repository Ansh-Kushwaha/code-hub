"use client";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Editor } from "@monaco-editor/react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { loadFile } from "@/app/actions/file-actions";
import { File } from "@prisma/client";
import { useRouter } from "next/navigation";

const editorThemes: { [key: string]: string } = {
  light: "light",
  dark: "vs-dark",
};

export default function EditorPage() {
  const { theme } = useTheme();
  const [editorTheme, setEditorTheme] = useState(editorThemes[theme!]);

  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [file, setFile] = useState<File>();

  const [output, setOutput] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const { data } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const id = useParams().id;

  useEffect(() => {
    loadFile(id as string)
      .then((file) => setFile(file))
      .catch((error) => {
        toast({
          title: "Error loading File",
          description: "File not found.",
          variant: "destructive",
        });
        router.push("/editor");
      });
  }, []);

  useEffect(() => {
    setCode(file?.text == null || undefined ? "" : file?.text);
    setLanguage(file?.type!);
  }, [file]);

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

  return (
    <div className="editor-container flex flex-row w-full h-[calc(100vh-3.5rem)] bg-primary/5">
      <div className="code-area flex flex-col w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={60} minSize={50}>
            <div className="p-2 flex items-center justify-between">
              {data?.user ? (
                <span className="px-2 h-8 rounded-sm flex items-center">
                  {file?.name}
                </span>
              ) : (
                <></>
              )}
              <div className="space-x-2 flex flex-row">
                <Button variant="default" size="thin" onClick={handleRun}>
                  Run
                </Button>
                {/* Todo: Figure out how to allow only original user to save the file */}
                {data?.user && (
                  <Button variant="secondary" size="thin" disabled={true}>
                    Save
                  </Button>
                )}
              </div>
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
