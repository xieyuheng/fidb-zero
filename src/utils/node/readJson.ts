import fs from "node:fs"
import { JsonParsingError } from "../../errors/JsonParsingError"
import type { Json } from "../Json"

export async function readJson(path: string): Promise<Json> {
  const who = "readJson"

  const text = await fs.promises.readFile(path, "utf-8")

  try {
    return JSON.parse(text)
  } catch (error) {
    throw new JsonParsingError(`[${who}] path: ${path}, text: ${text}`)
  }
}
