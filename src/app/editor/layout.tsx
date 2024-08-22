import { Separator } from "@/components/ui/separator";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <Separator />
      {children}
    </div>
  );
}
