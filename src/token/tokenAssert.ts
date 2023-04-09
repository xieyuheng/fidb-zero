import { Unauthorized } from "../errors/Unauthorized"
import { Operation } from "./Operation"
import type { Token } from "./Token"
import { tokenCheck } from "./tokenCheck"

export function tokenAssert(token: Token, path: string, name: Operation): void {
  if (!tokenCheck(token, path, name)) {
    throw new Unauthorized(
      `[tokenAssert] not permitted to ${name} path: ${path}`,
    )
  }
}
