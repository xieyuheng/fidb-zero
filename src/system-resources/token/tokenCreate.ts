import { Database } from "../../database"
import { dataCreate } from "../../resources"
import { randomTokenName } from "../token/randomTokenName"

export async function tokenCreate(
  db: Database,
  properties: {
    issuer: string
  },
): Promise<string> {
  const tokenName = randomTokenName()
  await dataCreate(db, `.tokens/${tokenName}`, properties)
  return tokenName
}
