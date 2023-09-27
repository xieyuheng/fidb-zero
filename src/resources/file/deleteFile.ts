import { Database } from "../../database"
import { deletePath } from "../utils/deletePath"
import { getFile } from "./getFile"

export async function deleteFile(db: Database, path: string): Promise<void> {
  const gotten = await getFile(db, path)
  if (gotten === undefined) {
    return
  }

  await deletePath(db, path)
}
