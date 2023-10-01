import { join } from "node:path"
import { Database } from "../../database"
import { dataCreate } from "../../resources"
import { passwordHash } from "../../utils/node/password"

export async function passwordCreate(
  db: Database,
  path: string,
  options: {
    password: string
  },
): Promise<void> {
  const { password } = options
  await dataCreate(db, join(path, ".password"), {
    hash: await passwordHash(password),
  })
}
