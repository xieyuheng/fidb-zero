import fs from "node:fs"
import { resolve } from "node:path"
import { createDatabase, Database } from "../database"

const TEST_DB_PATH = resolve(__filename, "../../../tmp/test")

export async function prepareTestDb(): Promise<Database> {
  const db = await createDatabase({ path: TEST_DB_PATH })
  await fs.promises.rm(resolve(db.path), { force: true, recursive: true })
  return db
}
