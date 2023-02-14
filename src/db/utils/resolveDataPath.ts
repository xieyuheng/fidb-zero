import { normalize, resolve } from "node:path"
import type { Database } from "../../database"
import { Unauthorized } from "../../errors/Unauthorized"

export function resolveDataPath(db: Database, path: string): string {
  const resolvedPath = normalize(resolve(db.path, path))

  if (!resolvedPath.startsWith(db.path)) {
    throw new Unauthorized(
      `[resolveDataPath] can not access path: ${path}, which is outside of database path`,
    )
  }

  return resolvedPath
}
