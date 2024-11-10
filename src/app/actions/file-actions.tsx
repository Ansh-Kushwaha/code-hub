"use server";

import { prisma } from "@/lib/db";

interface SaveFileProps {
  name: string;
  language: string;
  text: string;
  email: string;
}

interface UpdateFileProps {
  id: string;
  new_name: string;
  text: string;
}

export async function saveFile({ name, language, text, email }: SaveFileProps) {
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
      language,
      author: user.id,
    },
  });

  if (existingFile) {
    throw new Error("File with the same name already exists");
  }

  await prisma.file.create({
    data: {
      name: name,
      language: language,
      text: text,
      author: user?.id!,
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

export async function updateFile({ id, new_name, text }: UpdateFileProps) {
  if (id.length != 24) {
    throw new Error("Invalid id!");
  }

  const file = await prisma.file.findUnique({
    where: {
      id: id,
    },
  });

  if (!file) {
    throw new Error("File not found!");
  }

  const existingFile = await prisma.file.findFirst({
    where: {
      name: new_name,
    },
  });

  if (existingFile && existingFile.id != id) {
    throw new Error("File with the same name already exists");
  }

  const updatedFile = await prisma.file.update({
    where: {
      id: id,
    },
    data: {
      name: new_name,
      text: text,
    },
  });

  if (!updatedFile) {
    throw new Error("Unknown error occured!");
  }
}
