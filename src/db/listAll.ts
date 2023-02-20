import fs from "node:fs"
import { join } from "node:path"
import type { Database } from "../database"
import { isErrnoException } from "../utils/isErrnoException"
import type { PathEntry } from "./PathEntry"
import { resolvePath } from "./utils/resolvePath"

export async function* listAll(
  db: Database,
  directory: string,
): AsyncIterable<PathEntry> {
  try {
    const dir = await fs.promises.opendir(resolvePath(db, directory), {
      bufferSize: 1024,
    })

    for await (const dirEntry of dir) {
      if (dirEntry.isDirectory()) {
        yield {
          kind: "Directory",
          path: join(directory, dirEntry.name),
        }
      } else if (dirEntry.isFile()) {
        yield {
          kind: "File",
          path: join(directory, dirEntry.name),
        }
      }
    }
  } catch (error) {
    if (!(isErrnoException(error) && error.code === "ENOENT")) {
      throw error
    }
  }
}
