import { Database } from "../database"
import { Unauthorized } from "../errors/Unauthorized"
import { Operation } from "../operation"
import { tokenCheck } from "./tokenCheck"

export async function tokenAssert(
  db: Database,
  tokenName: string,
  path: string,
  operation: Operation,
): Promise<void> {
  if (!(await tokenCheck(db, tokenName, path, operation))) {
    throw new Unauthorized(
      `[tokenAssert] not permitted to ${operation} path: ${path}`,
    )
  }
}
