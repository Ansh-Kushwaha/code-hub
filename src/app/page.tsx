import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex bg-primary/5">
      <div className="app-container flex flex-col">
        <h1 className="inline-block scroll-m-20 py-2 sm:text-4xl text-2xl font-extrabold tracking-tight dark:bg-gradient-to-b dark:from-[#ffffff] dark:to-[#adadad] bg-gradient-to-b from-[#555555] to-[#000000] bg-clip-text text-transparent">
          Your online platform to write, compile, and save code seamlessly.
        </h1>
        <div className="flex flex-col sm:items-baseline p-2">
          <Image
            src="/editor2.png"
            width={800}
            height={200}
            alt="Picture of Editor"
            className="border dark:border-black rounded-sm m-4 shadow-md hover:translate-x-2 hover:translate-y-[-4px] transition-all ease-linear z-1"
          />
          <Link href="/editor" className="flex w-fit text-xl">
            <span className="scroll-m-20 pb-2 sm:text-2xl text-xl font-semibold tracking-tight first:mt-0">
              Open Editor
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
