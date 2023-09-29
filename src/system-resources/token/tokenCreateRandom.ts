import { Database } from "../../database"
import { randomTokenName } from "./randomTokenName"
import { tokenCreate } from "./tokenCreate"

export async function tokenCreateRandom(
  db: Database,
  properties: {
    issuer: string
  },
): Promise<string> {
  return tokenCreate(db, randomTokenName(), properties)
}
