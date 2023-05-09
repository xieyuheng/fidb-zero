import fs from "node:fs"
import type { Database } from "../database"
import { AlreadyExists } from "../errors"
import { isErrnoException } from "../utils/node/isErrnoException"
import { fileGet } from "./fileGet"
import { resolvePath } from "./utils/resolvePath"

export async function fileRename(
  db: Database,
  from: string,
  to: string,
  options?: { override?: boolean },
): Promise<void> {
  const who = "fileRename"

  if (!options?.override) {
    const gotten = await fileGet(db, to)
    if (gotten !== undefined) {
      throw new AlreadyExists(
        `[${who}] target of rename already exists, path: ${to}`,
      )
    }
  }

  try {
    await fs.promises.rename(resolvePath(db, from), resolvePath(db, to))
  } catch (error) {
    if (isErrnoException(error)) {
      throw new Error(
        `[${who}] from: ${from}, to: ${to}, error.code: ${error.code}`,
      )
    }

    throw error
  }
}
