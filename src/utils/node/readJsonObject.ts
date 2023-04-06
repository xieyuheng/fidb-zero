import fs from "node:fs"
import { JsonParsingError } from "../../errors/JsonParsingError"
import { isJsonObject, JsonObject } from "../Json"

export async function readJsonObject(path: string): Promise<JsonObject> {
  const who = "readJsonObject"

  const text = await fs.promises.readFile(path, "utf-8")

  try {
    const json = JSON.parse(text)
    if (!isJsonObject(json)) {
      throw new Error(`expect JsonObject`)
    }

    return json
  } catch (error) {
    throw new JsonParsingError(`[${who}] path: ${path}, text: ${text}`)
  }
}
