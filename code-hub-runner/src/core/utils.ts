import fs from "node:fs";

export function writeToFile(filePath: string, contents: string) {
  // ensure filepath exists
  const dirPath = filePath.substring(0, filePath.lastIndexOf("/"));
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, contents, { flag: "w" });

  return {
    path: filePath,
    removeFile: () => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    },
  };
}

export function deleteFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}
