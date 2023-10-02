import { Database } from "../../database"
import { passwordRegister } from "../../resources"
import { JsonObject } from "../../utils/Json"
import { log } from "../../utils/log"

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
