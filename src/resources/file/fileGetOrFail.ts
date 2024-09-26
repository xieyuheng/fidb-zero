import { type Database } from "../../database/index.js"
import { readBytes } from "../../database/readBytes.js"
import { NotFound } from "../../errors/index.js"
import { isErrnoException } from "../../utils/node/isErrnoException.js"

export async function fileGetOrFail(
  db: Database,
  path: string,
): Promise<Uint8Array> {
  try {
    return await readBytes(db, path)
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      throw new NotFound(`[fileGetOrFail] path: ${path}`)
    }

    throw error
  }
}
