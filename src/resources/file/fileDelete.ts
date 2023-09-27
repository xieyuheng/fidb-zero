import { Database } from "../../database"
import { deletePath } from "../utils/deletePath"
import { fileGet } from "./fileGet"

export async function fileDelete(db: Database, path: string): Promise<void> {
  const gotten = await fileGet(db, path)
  if (gotten === undefined) {
    return
  }

  await deletePath(db, path)
}
