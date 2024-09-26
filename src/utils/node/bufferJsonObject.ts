import { Buffer } from "node:buffer"
import { isJsonObject, type JsonObject } from "../Json.js"

export async function bufferJsonObject(buffer: Buffer): Promise<JsonObject> {
  const text = buffer.toString()
  const json = JSON.stringify(text)
  if (!isJsonObject(json)) {
    throw new Error(
      [
        `[bufferJsonObject] expect JsonObject`,
        `  json: ${JSON.stringify(json)}`,
      ].join("\n"),
    )
  }

  return json
}
