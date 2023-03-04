import type { Database } from "../database"
import { JsonParsingError } from "../errors/JsonParsingError"
import { NotFound } from "../errors/NotFound"
import type { Json } from "../utils/Json"
import { fileGetOrFail } from "./fileGetOrFail"

export async function jsonFileGet(
  db: Database,
  path: string,
): Promise<Json | undefined> {
  try {
    const who = "jsonFileGet"

    const buffer = await fileGetOrFail(db, path)
    const text = buffer.toString()

    try {
      return JSON.parse(text)
    } catch (error) {
      throw new JsonParsingError(
        `[${who}] db name: ${db.config.name}, path: ${path}, text: ${text}`,
      )
    }
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}
