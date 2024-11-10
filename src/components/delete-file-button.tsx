"use client";

import { deleteFile } from "@/app/actions/file-actions";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface props {
  id: string;
}

export default function DeleteFileButton({ id }: props) {
  async function handleDelete() {
    await deleteFile(id);
  }

  return (
    <Button
      variant="invisible"
      className="h-fit w-fit p-0"
      onClick={handleDelete}
    >
      <Trash2 height={16} width={16} />
    </Button>
  );
}
