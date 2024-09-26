import { deletePath } from "../../database/deletePath.js"
import { type Database } from "../../database/index.js"
import { fileGet } from "./fileGet.js"

export async function fileDelete(db: Database, path: string): Promise<void> {
  const gotten = await fileGet(db, path)
  if (gotten === undefined) {
    return
  }

  await deletePath(db, path)
}
