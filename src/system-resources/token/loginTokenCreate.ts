import { Database } from "../../database"
import { tokenCreateRandom } from "../token"

export async function loginTokenCreate(
  db: Database,
  path: string,
): Promise<string> {
  return await tokenCreateRandom(db, {
    issuer: `${path}/.login-token-issuer`,
  })
}
