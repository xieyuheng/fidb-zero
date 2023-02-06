import fs from "node:fs"
import { resolve } from "path"
import type { Database } from "../database"
import { isErrnoException } from "../utils/isErrnoException"

export async function* listDirectories(
  db: Database,
  directory: string = "",
): AsyncIterable<string> {
  try {
    const dir = await fs.promises.opendir(resolve(db.path, directory), {
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
