import fs from "node:fs"

export async function deleteData(path: string): Promise<void> {
  await fs.promises.rm(path, { recursive: true, force: true })
}
