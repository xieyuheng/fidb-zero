import { normalize } from "node:path"
import { Data, randomRevision } from "../../data"
import type { Database } from "../../database"
import { readJsonObject } from "../../utils/node/readJsonObject"
import { resolveDataPath } from "./resolveDataPath"

export async function readData(db: Database, path: string): Promise<Data> {
  path = normalize(path)

  const json = await readJsonObject(resolveDataPath(db, path))
  if (typeof json["@revision"] !== "string") {
    json["@revision"] = randomRevision()
  }

  const data = {
    ...json,
    "@path": path,
  }

  return data as any
}
