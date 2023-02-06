import fs from "node:fs"
import type { Database } from "../database"
import { isErrnoException } from "../utils/isErrnoException"

export async function* listDirectories(db: Database): AsyncIterable<string> {
  try {
    const dir = await fs.promises.opendir(db.path, {
      bufferSize: 1024,
    })

    for await (const dirEntry of dir) {
      if (dirEntry.isDirectory()) {
        yield dirEntry.name
      }
    }
  } catch (error) {
    if (!(isErrnoException(error) && error.code === "ENOENT")) {
      throw error
    }
  }
}
