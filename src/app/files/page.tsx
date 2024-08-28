import { auth } from "@/auth";
import { FileCard } from "@/components/file-card";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

interface File {
  id: string;
  name: string;
  type: string;
  text: string | null;
  userId: string;
  createdAt: Date;
}

export default async function FilesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const email = session?.user?.email!;

  const userInfo = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      files: true,
    },
  });

  const files: File[] | undefined = userInfo?.files;

  return (
    <div className="flex flex-row flex-wrap justify-between bg-primary/5 h-full space-x-4 p-4">
      {files?.map((file: File) => (
        <FileCard file={file} />
      ))}
    </div>
  );
}
