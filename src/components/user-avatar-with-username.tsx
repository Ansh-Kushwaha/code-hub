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
        <div className="flex flex-row items-center space-x-2 pl-1 pr-2 w-fit max-w-[200px] text-nowrap overflow-hidden h-10 bg-secondary/80 rounded-[19px]">
          <Avatar>
            <AvatarImage src={session.user.image!} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{session.user.name}</span>
          <LogOutButton />
        </div>
      ) : (
        <Link href="/login">
          <Button variant="ghost">Login</Button>
        </Link>
      )}
    </>
  );
};
