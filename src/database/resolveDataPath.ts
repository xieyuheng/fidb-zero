import { Database } from "./Database"
import { resolvePath } from "./resolvePath"

export function resolveDataPath(db: Database, path: string): string {
  const postfix = "/index.json"
  return resolvePath(db, path + postfix)
}
