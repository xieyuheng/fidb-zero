import { type Database } from "../../database/index.js"
import { randomTokenName } from "./randomTokenName.js"
import { tokenCreate } from "./tokenCreate.js"

export async function tokenCreateRandom(
  db: Database,
  properties: {
    issuer: string
    issuerRevision: string
  },
): Promise<string> {
  return tokenCreate(db, randomTokenName(), properties)
}
