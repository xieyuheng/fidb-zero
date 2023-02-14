import type { Data } from "../../data"
import { jsonWrite } from "../../utils/jsonWrite"

export async function dataWrite(input: Data, path: string): Promise<void> {
  await jsonWrite(input, path + "/index.json")
}
