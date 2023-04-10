import { Database } from "../database"
import { Unauthorized } from "../errors/Unauthorized"
import { Operation } from "../operation"
import type { Token } from "./Token"
import { tokenCheck } from "./tokenCheck"

export async function tokenAssert(
  db: Database,
  token: Token,
  path: string,
  name: Operation,
): Promise<void> {
  if (!(await tokenCheck(db, token, path, name))) {
    throw new Unauthorized(
      `[tokenAssert] not permitted to ${name} path: ${path}`,
    )
  }
}
