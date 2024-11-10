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
import { loadFile, updateFile } from "@/app/actions/file-actions";
import { File, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import findUser from "@/app/actions/user-actions";

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
  const [user, setUser] = useState<User>();
  const [newFileName, setNewFileName] = useState<string>("");

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
    setLanguage(file?.language!);
  }, [file]);

  useEffect(() => {
    findUser(data?.user?.email!).then((user) => setUser(user));
  }, [data]);

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

  async function handleUpdate() {
    try {
      if (user?.id != file?.author) return; // extra check
      if (!file) return;

      await updateFile({
        id: file.id,
        new_name: newFileName == "" ? file.name : newFileName, // ToDo: Find a better way
        text: code,
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
              {data?.user ? (
                <Input
                  type="text"
                  className="h-8 w-fit max-w-[240px] focus:ring-0 focus:ring-transparent focus:ring-offset-0"
                  placeholder={file?.name}
                  onChange={(e) => setNewFileName(e.target.value)}
                />
              ) : (
                <span className="px-2 h-8 rounded-sm flex items-center">
                  {file?.name}
                </span>
              )}
              <div className="space-x-2 flex flex-row">
                <Button variant="default" size="thin" onClick={handleRun}>
                  Run
                </Button>
                {/* Todo: Figure out how to allow only original user to save the file */}
                {data?.user && file?.author == user?.id ? (
                  <Button variant="secondary" size="thin" onClick={handleUpdate}>
                    Update
                  </Button>
                ) : (
                  <></>
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
            <div className="flex-grow p-2 font-mono text-wrap whitespace-break-spaces">
              <span className={isError ? "text-rose-500" : ""}>{output}</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
