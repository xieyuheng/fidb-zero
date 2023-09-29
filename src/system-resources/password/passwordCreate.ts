import { join } from "node:path"
import { Database } from "../../database"
import { dataCreate } from "../../resources"
import { passwordHash } from "../../utils/node/password"

export async function passwordCreate(
  db: Database,
  path: string,
  options: {
    password: string
    memo?: string
  },
): Promise<void> {
  const { password, memo } = options
  await dataCreate(db, join(path, ".password"), {
    hash: await passwordHash(password),
    memo,
  })
}
