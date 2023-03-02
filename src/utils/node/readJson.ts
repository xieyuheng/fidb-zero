import fs from "node:fs"
import type { Json } from "../Json"

export async function readJson(path: string): Promise<Json> {
  const text = await fs.promises.readFile(path, "utf-8")
  return JSON.parse(text)
}
