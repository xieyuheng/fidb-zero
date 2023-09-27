import { Database } from "../database"
import { createData, passwordRegister } from "../resources"
import { JsonObject } from "../utils/Json"
import { log } from "../utils/log"

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

  const { data, password } = options

  await createData(db, path, data)

  await passwordRegister(db, path, {
    memo: who,
    password,
  })

  log({ who, path, password })
}
