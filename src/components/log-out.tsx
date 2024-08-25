"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export const LogOutButton = () => {
  function signOutHandler() {
    signOut();
  }

  return (
    <Button
      size="icon"
      className="rounded-full"
      variant="link"
      onClick={signOutHandler}
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
};
