import { Data, dataSchema } from "../../data"
import { readJson } from "../../utils/readJson"

export async function readData(path: string): Promise<Data> {
  const json = await readJson(path + "/index.json")
  return dataSchema.validate(json)
}
