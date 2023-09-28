import fs from "node:fs"
import { Database } from "../../database"
import { resolvePath } from "../../database/resolvePath"
import { isErrnoException } from "../../utils/node/isErrnoException"
import { fileGetMetadataOrFail } from "../file-metadata/fileGetMetadataOrFail"
import { PathEntry } from "./PathEntry"

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
      const path = relativePath(db, (dirEntry as any).path)

      if (dirEntry.isDirectory()) {
        yield { kind: "Directory", path }
      } else if (dirEntry.isFile()) {
        const fileMetadata = await fileGetMetadataOrFail(db, path)
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
