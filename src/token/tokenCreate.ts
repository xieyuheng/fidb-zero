import type { Database } from "../database"
import { dataCreate } from "../db/dataCreate"
import { Operation } from "../operation"
import { randomTokenName } from "../token/randomTokenName"

export async function tokenCreate(
  db: Database,
  options: {
    permissions: Record<string, Array<Operation>>
  },
): Promise<string> {
  const tokenName = randomTokenName()

  await dataCreate(db, `tokens/${tokenName}`, {
    permissions: options.permissions,
  })

  return tokenName
}
