import { Unauthorized } from "../errors/Unauthorized"
import type { Operation, Token } from "./Token"
import { tokenCheck } from "./tokenCheck"

export function tokenAssert(token: Token, path: string, name: Operation): void {
  if (!tokenCheck(token, path, name)) {
    throw new Unauthorized(
      `[tokenAssert] not permitted to ${name} path: ${path}`,
    )
  }
}
