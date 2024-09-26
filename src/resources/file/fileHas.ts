import { type Database } from "../../database/index.js"
import { fileGet } from "./fileGet.js"

export async function fileHas(db: Database, path: string): Promise<boolean> {
  const bytes = await fileGet(db, path)
  if (bytes === undefined) {
    return false
  } else {
    return true
  }
}
