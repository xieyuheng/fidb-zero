import { Database } from "../../database"
import { NotFound } from "../../errors"
import { Json } from "../../utils/Json"
import { getFileOrFail } from "./getFileOrFail"

export async function getJsonFile(
  db: Database,
  path: string,
): Promise<Json | undefined> {
  try {
    const who = "getJsonFile"

    const buffer = await getFileOrFail(db, path)
    const text = buffer.toString()

    try {
      return JSON.parse(text)
    } catch (error) {
      if (error instanceof SyntaxError) {
        const message = `[${who}] db name: ${db.config.name}, path: ${path}, text: ${text}`
        error.message += "\n"
        error.message += message
      }

      throw error
    }
  } catch (error) {
    if (error instanceof NotFound) {
      return undefined
    }

    throw error
  }
}