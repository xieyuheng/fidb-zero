import { join } from "node:path"
import type { Database } from "../database"
import { passwordSchema } from "../password"
import type { Token } from "../token"
import { passwordCheck } from "../utils/password"
import { findDataAll } from "./findDataAll"

export type SignInPasswordOptions = {
  password: string
}

export async function signInPassword(
  db: Database,
  directory: string,
  options: SignInPasswordOptions,
): Promise<Token> {
  for await (const data of findDataAll(db, join(directory, "passwords"), {
    properties: {},
  })) {
    const password = passwordSchema.validate(data)
    if (await passwordCheck(options.password, password.hash)) {
      throw new Error("return token")
    }
  }

  throw new Error()
}
