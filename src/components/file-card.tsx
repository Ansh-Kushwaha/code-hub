"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface File {
  id: string;
  name: string;
  type: string;
  text: string | null;
  userId: string;
  createdAt: Date;
}

interface FileCardProps {
  file: File;
}

export const FileCard = ({ file }: FileCardProps) => {
  return (
    <Card>
      <CardHeader className="py-2">
        <CardTitle className="text-lg">{file.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-xs flex flex-row items-center">
        <p>Open in Editor</p>
        <ArrowRightIcon width={15} height={15} className="ml-2" />
      </CardContent>
      <CardFooter className="text-xs flex flex-col items-start">
        <p>Created on:</p>
        <p className="text-[10px] text-primary/80">
          {file.createdAt.toISOString().split("T")[0]}
        </p>
      </CardFooter>
    </Card>
  );
};
