import fs from "node:fs"
import { dirname } from "node:path"
import { Database } from "../../database"
import { resolvePath } from "../../database/resolvePath"
import { AlreadyExists } from "../../errors"
import { isErrnoException } from "../../utils/node/isErrnoException"
import { getFile } from "../file/getFile"

export async function renameFile(
  db: Database,
  from: string,
  to: string,
  options?: { override?: boolean },
): Promise<void> {
  const who = "renameFile"

  if (!options?.override) {
    const gotten = await getFile(db, to)
    if (gotten !== undefined) {
      throw new AlreadyExists(
        `[${who}] target of rename already exists, path: ${to}`,
      )
    }
  }

  try {
    await fs.promises.mkdir(dirname(resolvePath(db, to)), { recursive: true })
    await fs.promises.rename(resolvePath(db, from), resolvePath(db, to))
  } catch (error) {
    console.log(error)

    if (isErrnoException(error)) {
      throw new Error(
        `[${who}] from: ${from}, to: ${to}, error.code: ${error.code}`,
      )
    }

    throw error
  }
}
