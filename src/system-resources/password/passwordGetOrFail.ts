import { join } from "node:path"
import { type Database } from "../../database/index.js"
import { dataGetOrFail } from "../../resources/index.js"
import { type Password, PasswordSchema } from "./Password.js"

export async function passwordGetOrFail(
  db: Database,
  directory: string,
): Promise<Password> {
  return PasswordSchema.validate(
    await dataGetOrFail(db, join(directory, ".password")),
  )
}
