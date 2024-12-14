import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";
import { LogOutButton } from "./log-out";

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
          <div className="flex flex-row items-center space-x-2 pl-1 pr-2 w-fit max-w-[200px] text-nowrap font-semibold overflow-hidden h-10 bg-accent rounded-[19px]">
            <Avatar>
              <AvatarImage src={session.user.image!} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block">{session.user.name}</span>
            <LogOutButton />
          </div>
          <Link
            href="/files"
            target="blank"
            className="flex items-center font-semibold bg-accent hover:ring-2 hover:ring-neutral-700 hover:dark:ring-neutral-900 hover:ring-inset rounded-md justify-center px-2"
          >
            View Files
          </Link>
        </div>
      ) : (
        <Link href="/login">
          <Button
            variant="ghost"
            className="flex items-baseline font-semibold bg-accent hover:bg-secondary/80 hover:ring-2 hover:ring-neutral-700 hover:dark:ring-neutral-900 hover:ring-inset"
          >
            Login
          </Button>
        </Link>
      )}
    </>
  );
};
