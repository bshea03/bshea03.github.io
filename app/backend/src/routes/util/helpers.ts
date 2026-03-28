import { dirname, join } from "path";
import { readFileSync } from "fs";

export function readData<T>(filename: string): T {
  const filePath = join(__dirname, "../data", `${filename}.json`);
  const data = readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}
