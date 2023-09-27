import { Database } from "../database"
import { createData } from "../resources"
import { randomTokenName } from "../token/randomTokenName"

export async function tokenCreate(
  db: Database,
  properties: {
    issuer: string
  },
): Promise<string> {
  const tokenName = randomTokenName()
  await createData(db, `.tokens/${tokenName}`, properties)
  return tokenName
}
