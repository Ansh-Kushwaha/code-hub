import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { DeleteIcon } from "lucide-react";

interface File {
  id: string;
  name: string;
  language: string;
  text: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
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
    <div className="app-container flex flex-col flex-grow bg-primary/5 w-full min-h-[calc(100vh-3.5rem)]">
      <h1 className="inline-block text-start scroll-m-20 py-2 sm:text-4xl text-2xl font-extrabold tracking-tight dark:bg-gradient-to-b dark:from-[#ffffff] dark:to-[#adadad] bg-gradient-to-b from-[#555555] to-[#000000] bg-clip-text text-transparent">
        All Files
      </h1>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="sm:w-[75vw] text-white font-semibold">
              Name
            </TableHead>
            <TableHead className="text-white font-semibold">Language</TableHead>
            <TableHead className="text-white font-semibold">
              Last Updated
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files?.map((file: File, index) => (
            <TableRow key={index}>
              <TableCell className="sm:w-[75vw]">
                <Link href={"/editor/" + file.id} target="_blank">
                  {file.name}
                </Link>
              </TableCell>
              <TableCell className="capitalize">{file.language}</TableCell>
              <TableCell>
                {file.updatedAt.toISOString().split("T")[0]}
              </TableCell>
              <TableCell>
                <DeleteIcon className="fill-red-800" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
