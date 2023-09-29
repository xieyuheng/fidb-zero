import { join } from "node:path"
import { Database } from "../../database"
import { PasswordSchema, dataGetOrFail } from "../../resources"

export async function passwordGetOrFail(
  db: Database,
  directory: string,
): Promise<{ hash: string; memo?: string }> {
  return PasswordSchema.validate(
    await dataGetOrFail(db, join(directory, ".password")),
  )
}
