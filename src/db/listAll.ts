import fs from "node:fs"
import { resolve } from "node:path"
import type { Data } from "../data"
import type { Database } from "../database"
import { isErrnoException } from "../utils/isErrnoException"
import { get } from "./get"

export async function* listAll(
  db: Database,
  prefix: string,
): AsyncIterable<Data> {
  try {
    const dir = await fs.promises.opendir(resolve(db.path, prefix), {
      bufferSize: 1024,
    })

    for await (const dirEntry of dir) {
      if (dirEntry.isFile()) {
        const data = await get(db, `${prefix}/${dirEntry.name}`)
        if (data !== undefined) {
          yield data
        }
      }
    }
  } catch (error) {
    if (!(isErrnoException(error) && error.code === "ENOENT")) {
      throw error
    }
  }
}
