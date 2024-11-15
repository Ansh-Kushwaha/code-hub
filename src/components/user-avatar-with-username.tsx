import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";
import { LogOutButton } from "./log-out";

export const UserAvatarWithUsername = async () => {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <div className="flex flex-row gap-4">
          <div className="flex flex-row items-center space-x-2 pl-1 pr-2 w-fit max-w-[200px] text-nowrap overflow-hidden h-10 bg-secondary/80 rounded-[19px]">
            <Avatar>
              <AvatarImage src={session.user.image!} />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block">{session.user.name}</span>
            <LogOutButton />
          </div>
          <Link
            href="/files"
            target="blank"
            className="flex bg-secondary/80 rounded-md items-center justify-center px-2"
          >
            View Files
          </Link>
        </div>
      ) : (
        <Link href="/login">
          <Button variant="secondary" className="font-semibold">
            Login
          </Button>
        </Link>
      )}
    </>
  );
};
