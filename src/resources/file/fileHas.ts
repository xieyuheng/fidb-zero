import { Database } from "../../database"
import { fileGet } from "./fileGet"

export async function fileHas(db: Database, path: string): Promise<boolean> {
  const bytes = await fileGet(db, path)
  if (bytes === undefined) {
    return false
  } else {
    return true
  }
}
