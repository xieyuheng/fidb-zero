import fs from "node:fs"
import type { Database } from "../database"
import { isErrnoException } from "../utils/isErrnoException"
import { resolvePath } from "./utils/resolvePath"

export async function* listDirectories(
  db: Database,
  directory: string = "",
): AsyncIterable<string> {
  try {
    const dir = await fs.promises.opendir(resolvePath(db, directory), {
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
