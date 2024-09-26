import { join } from "node:path"
import { type Database } from "../../database/index.js"
import { dataCreate } from "../../resources/index.js"
import { passwordHash } from "../../utils/node/password.js"

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
