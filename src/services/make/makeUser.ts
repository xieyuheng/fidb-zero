import { Database } from "../../database"
import { passwordRegister } from "../../resources"
import { tokenIssuerPutGroups } from "../../system-resources/token-issuer"
import { JsonObject } from "../../utils/Json"
import { log } from "../../utils/log"

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
