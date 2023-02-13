import { readJson } from "../utils/readJson"
import { Data, dataSchema } from "./Data"

export async function readData(path: string): Promise<Data> {
  const json = await readJson(path + "/index.json")
  return dataSchema.validate(json)
}
