import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Editor",
  description: "Code hub editor",
};

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen flex flex-col max-h-screen">
            <EditorHeader />
            <Separator />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

function EditorHeader() {
  return (
    <header className="min-h-16 flex items-center px-4 justify-between">
      <h1 className="text-2xl font-semibold">Code Hub</h1>
      <div className="flex items-center gap-4">
        <span>Login</span>
        <ModeToggle />
      </div>
    </header>
  );
}
