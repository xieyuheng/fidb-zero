import { Database } from "../database"
import { Unauthorized } from "../errors/Unauthorized"
import { Operation } from "../operation"
import { tokenCheck } from "./tokenCheck"
import { tokenGetOrFail } from "./tokenGetOrFail"

export async function tokenAssert(
  db: Database,
  tokenName: string,
  path: string,
  operation: Operation,
): Promise<void> {
  const token = await tokenGetOrFail(db, tokenName)

  if (!(await tokenCheck(db, token, path, operation))) {
    throw new Unauthorized(
      `[tokenAssert] not permitted to ${operation} path: ${path}`,
    )
  }
}
