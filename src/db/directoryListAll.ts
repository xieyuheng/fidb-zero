import fs from "node:fs"
import { join } from "node:path"
import type { Database } from "../database"
import type { PathEntry } from "../path-entry"
import { isErrnoException } from "../utils/node/isErrnoException"
import { fileMetadataGetOrFail } from "./fileMetadataGetOrFail"
import { resolvePath } from "./utils/resolvePath"

export async function* directoryListAll(
  db: Database,
  directory: string,
): AsyncIterable<PathEntry> {
  try {
    const dir = await fs.promises.opendir(resolvePath(db, directory), {
      bufferSize: 1024,
    })

    for await (const dirEntry of dir) {
      if (dirEntry.isDirectory()) {
        const path = join(directory, dirEntry.name)
        yield { kind: "Directory", path }
      } else if (dirEntry.isFile()) {
        const path = join(directory, dirEntry.name)
        const fileMetadata = await fileMetadataGetOrFail(db, path)
        yield { kind: "File", path, ...fileMetadata }
      }
    }
  } catch (error) {
    if (!(isErrnoException(error) && error.code === "ENOENT")) {
      throw error
    }
  }
}
