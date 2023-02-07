import fs from "node:fs"
import { resolve } from "node:path"
import { createDatabase, Database } from "../database"

const TEST_DB_PATH = resolve(__filename, "../../../tmp/databases/test")

export async function prepareTestDb(): Promise<Database> {
  await fs.promises.rm(TEST_DB_PATH, { force: true, recursive: true })
  return await createDatabase({ path: TEST_DB_PATH })
}
