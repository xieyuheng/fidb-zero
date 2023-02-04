import fs from "node:fs"
import type { Data } from "../../db"

export async function readData(path: string): Promise<Data> {
  const text = await fs.promises.readFile(path, "utf-8")
  return JSON.parse(text)
}
