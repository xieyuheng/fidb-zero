import { type Database } from "../../database/index.js"
import { passwordRegister } from "../../resources/index.js"
import { type JsonObject } from "../../utils/Json.js"
import { log } from "../../utils/log.js"

export async function initExampleUsers(db: Database): Promise<void> {
  await initExampleUser(db, "alice", {
    data: { name: "Alice" },
    password: "alice123",
  })

  await initExampleUser(db, "bob", {
    data: { name: "Bob" },
    password: "bob456",
  })
}

export async function initExampleUser(
  db: Database,
  username: string,
  options: { data: JsonObject; password: string },
): Promise<void> {
  const who = "initExampleUser"
  const path = `users/${username}`

  await passwordRegister(db, path, options)

  log({ who, path })
}
