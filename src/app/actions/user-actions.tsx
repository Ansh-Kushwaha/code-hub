"use server";

import { prisma } from "@/lib/db";

export default async function findUser(email: string) {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    throw new Error("User not found!");
  }

  return user;
}
