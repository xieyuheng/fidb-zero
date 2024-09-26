import { type Database } from "./Database.js"
import { resolvePath } from "./resolvePath.js"

export function resolveDataPath(db: Database, path: string): string {
  const postfix = "/index.json"
  return resolvePath(db, path + postfix)
}
