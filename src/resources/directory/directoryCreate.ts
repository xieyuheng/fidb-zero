import fs from "node:fs"
import { Database } from "../../database"
import { resolvePath } from "../../database/resolvePath"

export async function directoryCreate(
  db: Database,
  directory: string,
): Promise<void> {
  await fs.promises.mkdir(resolvePath(db, directory), {
    recursive: true,
  })
}
