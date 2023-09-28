import { Database } from "../../database"
import { readBytes } from "../../database/readBytes"
import { NotFound } from "../../errors"
import { isErrnoException } from "../../utils/node/isErrnoException"

export async function fileGetOrFail(
  db: Database,
  path: string,
): Promise<Uint8Array> {
  try {
    return await readBytes(db, path)
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      throw new NotFound(`[getOrFail] path: ${path}`)
    }

    throw error
  }
}
