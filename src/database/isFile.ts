import { pathIsFile } from "../utils/node/pathIsFile.js"
import { type Database } from "./Database.js"
import { resolvePath } from "./resolvePath.js"

export async function isFile(db: Database, path: string): Promise<boolean> {
  const resolvedPath = resolvePath(db, path)
  return pathIsFile(resolvedPath)
}
