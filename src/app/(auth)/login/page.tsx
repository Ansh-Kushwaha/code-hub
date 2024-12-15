"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  function clickHandler(provider: string) {
    signIn(provider, { callbackUrl: "/" });
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login using your preferred method</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <Button onClick={() => clickHandler("github")} className="flex gap-2">
            <Icons.gitHub className="h-4 w-4" />
            Login using GitHub
          </Button>
          <Button onClick={() => clickHandler("google")} className="flex gap-2">
            <Icons.google className="h-4 w-4" />
            Login using Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
