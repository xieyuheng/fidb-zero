import { resolve } from "path"
import type { Data } from "../../data"
import type { Database } from "../../database"
import { jsonWrite } from "../../utils/jsonWrite"

export async function dataWrite(
  db: Database,
  input: Data,
  path: string,
): Promise<void> {
  await jsonWrite(input, resolve(db.path, path + "/index.json"))
}
