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
  function clickHandler() {
    signIn("github", { callbackUrl: "/" });
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login using your preferred method</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={clickHandler} className="flex gap-2">
            <Icons.gitHub className="h-4 w-4" />
            Login using GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
