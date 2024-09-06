"use client";

import Image from "next/image";
import Link from "next/link";

export function Nav() {
  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-4 flex items-center space-x-1 lg:mr-6">
        <Image
          src="/icon-light.svg"
          height={32}
          width={32}
          alt="code-hub-logo"
          className="dark:invert-0"
        />
        <span className="md:font-bold font-semibold inline-block">
          CODE HUB
        </span>
      </Link>
    </div>
  );
}
