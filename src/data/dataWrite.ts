import fs from "node:fs"
import { dirname } from "node:path"
import type { Data } from "./Data"

export async function dataWrite(data: Data, path: string): Promise<void> {
  const text = JSON.stringify(data)
  await fs.promises.mkdir(dirname(path), { recursive: true })
  await fs.promises.writeFile(path, text)
}
