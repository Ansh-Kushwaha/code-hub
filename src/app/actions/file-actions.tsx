"use server";

import { prisma } from "@/lib/db";

interface FileProps {
  name: string;
  type: string;
  text: string;
  email: string;
}

export async function saveFile({ name, type, text, email }: FileProps) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existingFile = await prisma.file.findFirst({
    where: {
      name,
      type,
      userId: user.id,
    },
  });

  if (existingFile) {
    throw new Error("File with the same name already exists");
  }

  await prisma.file.create({
    data: {
      name: name,
      type: type,
      text: text,
      userId: user?.id!,
    },
  });
}

export async function loadFile(id: string) {
  if (id.length != 24) {
    throw new Error("File not found!");
  }

  const file = await prisma.file.findUnique({
    where: {
      id: id,
    },
  });

  if (!file) {
    throw new Error("File not found!");
  }

  return file;
}
