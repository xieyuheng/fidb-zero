import { Database } from "../../database"
import { tokenCreate } from "../token"

export async function loginTokenCreate(
  db: Database,
  path: string,
): Promise<string> {
  return await tokenCreate(db, {
    issuer: `${path}/.login-token-issuer`,
  })
}
