import { writeJson } from "../utils/node/writeJson"
import { Data } from "./Data"
import { Database } from "./Database"
import { resolveDataPath } from "./resolveDataPath"

export async function writeData(
  db: Database,
  path: string,
  input: Data,
): Promise<void> {
  await writeJson(resolveDataPath(db, path), input)
}
