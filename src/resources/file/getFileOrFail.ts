import { Buffer } from "node:buffer"
import { Database } from "../../database"
import { readBuffer } from "../../database/readBuffer"
import { NotFound } from "../../errors"
import { isErrnoException } from "../../utils/node/isErrnoException"

export async function getFileOrFail(
  db: Database,
  path: string,
): Promise<Buffer> {
  try {
    return await readBuffer(db, path)
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") {
      throw new NotFound(`[getOrFail] path: ${path}`)
    }

    throw error
  }
}
