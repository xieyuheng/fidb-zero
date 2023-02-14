import { resolve } from "path"
import type { Data } from "../../data"
import type { Database } from "../../database"
import { writeJson } from "../../utils/writeJson"

export async function writeData(
  db: Database,
  path: string,
  input: Data,
): Promise<void> {
  await writeJson(resolve(db.path, path + "/index.json"), input)
}
