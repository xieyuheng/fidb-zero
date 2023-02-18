import type { Database } from "../database"
import { getFile } from "./getFile"
import { deletePath } from "./utils/deletePath"

export async function deleteFile(db: Database, path: string): Promise<void> {
  const gotted = await getFile(db, path)
  if (gotted === undefined) {
    return
  }

  await deletePath(db, path)
}
