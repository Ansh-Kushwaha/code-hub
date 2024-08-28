import Link from "next/link";
import { Nav } from "./Nav";
import { Icons } from "./icons";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { UserAvatarWithUsername } from "./user-avatar-with-username";

export async function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 md:px-[2rem] px-[1rem] flex border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-screen items-center">
        {/* for desktop site */}
        <Nav />
        {/* for mobile */}
        {/* todo */}
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <UserAvatarWithUsername />
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
