import { join } from "node:path"
import { Database } from "../../database"
import { dataGetOrFail } from "../../resources"
import { Password, PasswordSchema } from "./Password"

export async function passwordGetOrFail(
  db: Database,
  directory: string,
): Promise<Password> {
  return PasswordSchema.validate(
    await dataGetOrFail(db, join(directory, ".password")),
  )
}
