import { readCsv } from "../utils/readCsv"
import type { Data } from "./Data"
import { randomRevision } from "./randomRevision"

export async function importDataArrayFromCsv(
  file: string,
  options: {
    directory: string
    pathKey: string
  },
): Promise<Array<Data>> {
  const inputs = await readCsv(file)

  const results = inputs.map<Data>((input) => {
    const path = `${options.directory}/${input[options.pathKey]}`

    if (typeof path !== "string") {
      throw new Error(
        [
          `[importDataArrayFromCsv] export path string undefined pathKey`,
          `  pathKey: ${options.pathKey}`,
          `  path: ${path}`,
          `  input: ${JSON.stringify(input)}`,
        ].join("\n"),
      )
    }

    return {
      ...input,
      "@path": path,
      "@revision": randomRevision(),
      "@createdAt": Date.now(),
      "@updatedAt": Date.now(),
    }
  })

  return results
}
