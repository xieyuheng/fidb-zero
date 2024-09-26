import fs from "node:fs"
import { join, resolve } from "node:path"
import { type Data, type Database } from "../../database/index.js"
import { resolvePath } from "../../database/resolvePath.js"
import { type Json } from "../../utils/Json.js"
import { isErrnoException } from "../../utils/node/isErrnoException.js"
import { objectMatchProperties } from "../../utils/objectMatchProperties.js"
import { dataGet } from "../data/dataGet.js"

export type DataFindAllOptions = {
  properties: Record<string, Json>
}

export async function* dataFindAll(
  db: Database,
  directory: string,
  options: DataFindAllOptions,
): AsyncIterable<Data> {
  try {
    const dir = await fs.promises.opendir(resolvePath(db, directory), {
      bufferSize: 1024,
    })

    for await (const dirEntry of dir) {
      const path = resolve(join(dirEntry.path, dirEntry.name))
      const parts = path.split("/")
      if (parts.some((part) => part.startsWith("."))) {
        continue
      }

      if (dirEntry.isDirectory()) {
        const data = await dataGet(db, `${directory}/${dirEntry.name}`)
        if (
          data !== undefined &&
          objectMatchProperties(data, options.properties)
        ) {
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
