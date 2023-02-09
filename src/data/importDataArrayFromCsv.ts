import { readCsv } from "../utils/readCsv"
import type { Data } from "./Data"
import { randomRevision } from "./randomRevision"

export async function importDataArrayFromCsv(
  file: string,
  options: {
    idKey: string
  },
): Promise<Array<Data>> {
  const inputs = await readCsv(file)

  const results = inputs.map<Data>((input) => {
    const id = input[options.idKey]
    if (typeof id !== "string") {
      throw new Error(
        [
          `[importDataArrayFromCsv] export id string undefined idKey`,
          `  idKey: ${options.idKey}`,
          `  id: ${id}`,
          `  input: ${JSON.stringify(input)}`,
        ].join("\n"),
      )
    }

    return {
      ...input,
      "@id": id,
      "@revision": randomRevision(),
      "@createdAt": Date.now(),
      "@updatedAt": Date.now(),
    }
  })

  return results
}
