import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";
import { LogOutButton } from "./log-out";
import { File } from "lucide-react";

export const UserAvatarWithUsername = async () => {
  const session = await auth();
  const username = session?.user?.name || "";
  const avatarFallback = username
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      {session?.user ? (
        <div className="flex flex-row gap-4">
          <Link
            href="/files"
            target="blank"
            className="flex items-center gap-1 font-semibold hover:ring-offset-1 hover:ring-offset-background rounded-md justify-center px-2"
          >
            VIEW FILES
            <File className="h-4" />
          </Link>
          <div className="flex flex-row items-center space-x-2 pl-1 pr-2 w-fit max-w-[200px] text-nowrap font-semibold overflow-hidden h-10 bg-accent rounded-[19px] hover:ring-2 hover:ring-offset-1 hover:ring-offset-background">
            <Avatar>
              <AvatarImage src={session.user.image!} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block">
              {session.user.name}
            </span>
            <LogOutButton />
          </div>
        </div>
      ) : (
        <Link href="/login">
          <Button
            variant="ghost"
            className="flex items-center font-semibold bg-accent hover:ring-2 hover:ring-offset-1"
          >
            Login
          </Button>
        </Link>
      )}
    </>
  );
};
