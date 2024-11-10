import Image from "next/image";

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
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/mode-toggle";

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
    <div className="flex flex-row flex-grow w-full h-screen bg-primary/5">
      <div className="sidebar flex flex-col justify-between w-[20%] h-screen p-3 gap-y-4">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src="/icon-light.svg"
            height={48}
            width={48}
            alt="code-hub-logo"
            className="dark:invert-0"
          />
          <span className="md:font-bold font-semibold inline-block text-2xl ml-2">
            CODE HUB
          </span>
        </div>
        <Link
          href="/editor"
          className="flex items-center p-2 rounded-md w-fit gap-2 font-semibold uppercase bg-primary text-white dark:text-black"
          target="_blank"
        >
          Open Editor
          <ArrowRightIcon width={16} height={16} />
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="header flex flex-row justify-between h-16 mx-4 items-center">
          <span className=" font-bold text-xl">All Files</span>
          <ModeToggle />
        </div>
        <div className="rounded-lg p-4 bg-primary/5 h-full">
          <Table className="rounded-lg dark:bg-zinc-900 bg-zinc-100 text-black dark:text-white">
            <TableHeader>
              <TableRow className="hover:bg-transparent font-extrabold uppercase">
                <TableHead className="sm:w-[58vw]">Name</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files?.map((file: File, index) => (
                <TableRow key={index} className="hover:border-white">
                  <TableCell className="sm:w-[58vw]">
                    <Link href={"/editor/" + file.id} target="_blank">
                      {file.name}
                    </Link>
                  </TableCell>
                  <TableCell className="capitalize">{file.language}</TableCell>
                  <TableCell>
                    {file.updatedAt.toISOString().split("T")[0]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
