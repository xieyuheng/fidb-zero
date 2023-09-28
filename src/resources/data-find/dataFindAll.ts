import fs from "node:fs"
import { Data, Database } from "../../database"
import { resolvePath } from "../../database/resolvePath"
import { JsonAtom } from "../../utils/Json"
import { isErrnoException } from "../../utils/node/isErrnoException"
import { dataGet } from "../data/dataGet"

export type DataFindAllOptions = {
  properties: Record<string, JsonAtom>
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
      if (dirEntry.isDirectory()) {
        const data = await dataGet(db, `${directory}/${dirEntry.name}`)
        if (data !== undefined) {
          if (
            Object.entries(options.properties).every(
              ([key, property]) => data[key] === property,
            )
          ) {
            yield data
          }
        }
      }
    }
  } catch (error) {
    if (!(isErrnoException(error) && error.code === "ENOENT")) {
      throw error
    }
  }
}
