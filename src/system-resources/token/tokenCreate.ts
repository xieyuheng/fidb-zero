import { type Database } from "../../database/index.js"
import { dataCreate } from "../../resources/index.js"

export async function tokenCreate(
  db: Database,
  name: string,
  properties: {
    issuer: string
    issuerRevision: string
  },
): Promise<string> {
  await dataCreate(db, `.tokens/${name}`, properties)
  return name
}
