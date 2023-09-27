import { pathIsFile } from "../utils/node/pathIsFile"
import { Database } from "./Database"
import { resolvePath } from "./resolvePath"

export async function isFile(db: Database, path: string): Promise<boolean> {
  const resolvedPath = resolvePath(db, path)
  return pathIsFile(resolvedPath)
}
