import { Buffer } from "node:buffer"
import { Database } from "../../database"
import { NotFound } from "../../errors"
import { isErrnoException } from "../../utils/node/isErrnoException"
import { readBuffer } from "../utils/readBuffer"

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
