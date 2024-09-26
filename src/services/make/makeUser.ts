import { type Database } from "../../database/index.js"
import { passwordRegister } from "../../resources/index.js"
import { tokenIssuerPutGroups } from "../../system-resources/token-issuer/index.js"
import { type JsonObject } from "../../utils/Json.js"
import { log } from "../../utils/log.js"

export async function makeUser(
  db: Database,
  username: string,
  group: string,
  options: {
    password: string
    data: JsonObject
  },
): Promise<void> {
  const who = "makeUser"

  const { password, data } = options

  const user = await passwordRegister(db, `users/${username}`, {
    password,
    data,
  })

  const issuer = await tokenIssuerPutGroups(
    db,
    `users/${username}/.token-issuer`,
    [group],
  )

  log({ who, user, issuer })
}
