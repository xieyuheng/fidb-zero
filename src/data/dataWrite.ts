import { jsonWrite } from "../utils/jsonWrite"
import type { Data } from "./Data"

export async function dataWrite(input: Data, path: string): Promise<void> {
  await jsonWrite(input, path)
}
