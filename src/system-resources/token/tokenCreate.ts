import { Database } from "../../database"
import { dataCreate } from "../../resources"

export async function tokenCreate(
  db: Database,
  name: string,
  properties: {
    issuer: string
    issuerUpdatedAt: number
  },
): Promise<string> {
  await dataCreate(db, `.tokens/${name}`, properties)
  return name
}
