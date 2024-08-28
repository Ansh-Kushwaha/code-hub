"use client";

import Image from "next/image";
import Link from "next/link";

export function Nav() {
  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <span className="md:font-bold font-semibold inline-block">
          CODE HUB
        </span>
      </Link>
    </div>
  );
}
