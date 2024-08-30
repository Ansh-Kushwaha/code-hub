import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="app-container flex flex-col bg-primary/5">
      <h1 className="inline-block text-start scroll-m-20 py-2 sm:text-4xl text-2xl font-extrabold tracking-tight dark:bg-gradient-to-b dark:from-[#ffffff] dark:to-[#adadad] bg-gradient-to-b from-[#555555] to-[#000000] bg-clip-text text-transparent">
        Your online platform to write, compile, and save code seamlessly.
      </h1>
      <div className="flex flex-col p-2">
        <div className="flex flex-row h-fit items-center">
          <Image
            src="/editor2.png"
            width={800}
            height={200}
            alt="Picture of Editor"
            sizes="(max-width: 640px) 90vw, (max-width: 1000px) 60vw, (max-width: 1200px) 80vw"
            className=" border dark:border-black rounded-sm sm:ml-4 sm:mt-4 shadow-md hover:translate-x-2 hover:translate-y-[-4px] transition-all ease-linear z-1"
          />
          <span className="hidden sm:inline-block font-medium text-2xl p-8 text-start">
            Write and execute code in various languages.
          </span>
        </div>
        <Link href="/editor" className="flex w-fit text-xl">
          <span className="flex flex-row items-center scroll-m-20 py-4 sm:text-2xl text-xl sm:ml-4 font-semibold tracking-tight first:mt-0 group">
            Open Editor
            <ArrowRightIcon
              width={28}
              height={28}
              fontWeight={0}
              className="ml-2 group-hover:translate-x-1 transition ease-linear"
            />
          </span>
        </Link>
      </div>
      <h1 className="inline-block sm:text-end py-2 sm:text-4xl text-2xl font-extrabold tracking-tight dark:bg-gradient-to-b dark:from-[#ffffff] dark:to-[#adadad] bg-gradient-to-b from-[#555555] to-[#000000] bg-clip-text text-transparent">
        Login now to save and access your files!
      </h1>
    </div>
  );
}
