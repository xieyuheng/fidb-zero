import fs from "fs"
import { resolve } from "node:path"
import { createDatabase, Database } from "../database"

const TEST_DB_PATH = resolve(__filename, "../../../tmp/databases/test")

export async function prepareTest(): Promise<{ db: Database }> {
  const db = createDatabase({ path: TEST_DB_PATH })
  await fs.promises.rm(resolve(db.path), { force: true, recursive: true })
  return { db }
}
