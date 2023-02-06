import fs from "node:fs"
import { resolve } from "node:path"
import type { Database } from "./Database"

export async function createDatabase(options: Database): Promise<Database> {
  const { path } = options

  await fs.promises.mkdir(resolve(path), { recursive: true })

  return { path }
}
