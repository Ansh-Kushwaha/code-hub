"use client";

import Link from "next/link";
import { Nav } from "./Nav";
import { Icons } from "./icons";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 px-[2rem] w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 max-w-screen items-center">
        {/* for desktop site */}
        <Nav />
        {/* for mobile */}
        {/* todo */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex flex-row items-center space-x-2 pl-1 pr-2 w-fit max-w-[200px] text-nowrap overflow-hidden h-10 bg-secondary/80 rounded-[19px]">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>Username</span>
          </div>
          <Link
            href={
              "https://www.github.com/ansh-kushwaha/online-text-editor-placeholder"
            }
            target="_blank"
          >
            <Button variant="ghost" size="icon">
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          {/* temporary */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
