import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { UserAvatarWithUsername } from "@/components/user-avatar-with-username";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}