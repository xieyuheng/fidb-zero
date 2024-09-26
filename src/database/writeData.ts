import { writeJson } from "../utils/node/writeJson.js"
import { type Data } from "./Data.js"
import { type Database } from "./Database.js"
import { resolveDataPath } from "./resolveDataPath.js"

export async function writeData(
  db: Database,
  path: string,
  input: Data,
): Promise<void> {
  await writeJson(resolveDataPath(db, path), input)
}
