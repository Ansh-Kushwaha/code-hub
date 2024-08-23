import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
