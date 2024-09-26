import { normalize } from "node:path"
import { type Database } from "./Database.js"
import { resolvePath } from "./resolvePath.js"

export function normalizePath(db: Database, path: string): string {
  const resolvedPath = resolvePath(db, path)
  const prefix = normalize(db.directory + "/")
  return resolvedPath.slice(prefix.length)
}
