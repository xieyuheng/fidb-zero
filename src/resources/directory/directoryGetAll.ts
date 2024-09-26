import fs from "node:fs"
import { join, resolve } from "node:path"
import { type Database } from "../../database/index.js"
import { resolvePath } from "../../database/resolvePath.js"
import { isErrnoException } from "../../utils/node/isErrnoException.js"
import { fileMetadataGetOrFail } from "../file-metadata/fileMetadataGetOrFail.js"
import { type PathEntry } from "./PathEntry.js"

export async function* directoryGetAll(
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
      const absolutePath = resolve(join(dirEntry.path, dirEntry.name))
      const path = relativePath(db, absolutePath)

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

  if (!absolutePath.startsWith(db.directory)) {
    throw new Error(
      `[${who}] absolutePath: ${absolutePath}, does not startsWith db.directory: ${db.directory}`,
    )
  }

  return absolutePath.slice((db.directory + "/").length)
}
