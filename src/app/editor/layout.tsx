import { SiteHeader } from "@/components/site-header";
import AuthWrapper from "../auth-wrapper";
import { Toaster } from "@/components/ui/toaster";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <AuthWrapper>{children}</AuthWrapper>
      <Toaster />
    </>
  );
}
