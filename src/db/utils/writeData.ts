import type { Data } from "../../data"
import type { Database } from "../../database"
import { writeJson } from "../../utils/writeJson"
import { resolveDataPath } from "./resolveDataPath"

export async function writeData(
  db: Database,
  path: string,
  input: Data,
): Promise<void> {
  await writeJson(resolveDataPath(db, path + "/index.json"), input)
}
