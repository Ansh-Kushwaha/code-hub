"use client";

import Image from "next/image";
import Link from "next/link";

export function Nav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Image
          src="/icon.svg"
          alt="CodeForge Logo"
          className="dark:invert"
          width={32}
          height={32}
        />
        <span className="hidden font-bold lg:inline-block">CodeForge</span>
      </Link>
    </div>
  );
}
