import { type Database } from "../../database/index.js"
import { Unauthorized } from "../../errors/index.js"
import { type Operation } from "../../models/permission/index.js"
import { tokenCheck } from "./tokenCheck.js"

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
