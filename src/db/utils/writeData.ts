import type { Data } from "../../data"
import type { Database } from "../../database"
import { writeJson } from "../../utils/writeJson"
import { resolvePath } from "./resolvePath"

export async function writeData(
  db: Database,
  path: string,
  input: Data,
): Promise<void> {
  await writeJson(resolvePath(db, path + "/index.json"), input)
}
