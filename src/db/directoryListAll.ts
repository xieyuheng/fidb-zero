import fs from "node:fs"
import type { Database } from "../database"
import type { PathEntry } from "../path-entry"
import { isErrnoException } from "../utils/node/isErrnoException"
import { fileMetadataGetOrFail } from "./fileMetadataGetOrFail"
import { resolvePath } from "./utils/resolvePath"

export async function* directoryListAll(
  db: Database,
  directory: string,
  options?: {
    recursive?: boolean
  },
): AsyncIterable<PathEntry> {
  try {
    const dir = await fs.promises.opendir(resolvePath(db, directory), {
      bufferSize: 1024,
      recursive: options?.recursive,
    })

    for await (const dirEntry of dir) {
      const path = relativePath(db, (dirEntry as any).path)

      if (dirEntry.isDirectory()) {
        yield { kind: "Directory", path }
      } else if (dirEntry.isFile()) {
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

function relativePath(db: Database, absolutePath: string): string {
  const who = "relativePath"

  if (!absolutePath.startsWith(db.path)) {
    throw new Error(
      `[${who}] absolutePath: ${absolutePath}, does not startsWith db.path: ${db.path}`,
    )
  }

  return absolutePath.slice((db.path + "/").length)
}
