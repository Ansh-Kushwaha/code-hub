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
    <main className="flex p-2 bg-primary/5">
      <div className="app-container flex flex-row">
        <div className="flex flex-col p-2 min-w-[calc(100vw*0.55)]">
          <span className="font-bold text-3xl inline-block">
            Your online platform to write, compile, and save code seamlessly.
          </span>
          <Image
            src="/editor-light.png"
            width={500}
            height={100}
            alt="Picture of Editor"
            className="border dark:border-black rounded-sm mt-10 ml-16 shadow-md z-1"
          />
          <Link href="/editor" className="flex w-fit text-xl ml-16 mt-4">
            <span className="font-semibold text-xl">Open Editor</span>
            <span className="transition ease-linear hover:translate-x-2">
              <ArrowRightIcon height={32} width={32} className="ml-2" />
            </span>
          </Link>
        </div>
        <div className="flex flex-col p-2">
          <Card className="max-w-">
            <CardHeader>
              <CardTitle>Register Now!</CardTitle>
              <CardDescription>
                Save and open your files anytime with a quick registration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                You can start coding right away without registering, but keep in
                mind that your work won't be saved.
              </p>
            </CardContent>
            <CardContent>
              Registering allows you to save your progress and access your files
              later.
            </CardContent>
            <CardFooter>
              <Button variant="default">Register</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
