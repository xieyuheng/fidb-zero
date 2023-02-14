import fs from "node:fs"
import { normalize, resolve } from "node:path"
import type { Database } from "./Database"

export async function createDatabase(options: Database): Promise<Database> {
  const path = normalize(resolve(options.path))

  await fs.promises.mkdir(path, { recursive: true })

  return { path }
}
