import fs from "node:fs"
import { dirname } from "node:path"
import type { Data } from ".."

export async function writeData(path: string, data: Data): Promise<void> {
  const text = JSON.stringify(data)
  await fs.promises.mkdir(dirname(path), { recursive: true })
  await fs.promises.writeFile(path, text)
}
