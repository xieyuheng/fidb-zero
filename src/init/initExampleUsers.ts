import { Database } from "../database"
import { dataCreate } from "../db"
import { passwordRegister } from "../password"
import { log } from "../utils/log"

export async function initExampleUsers(db: Database): Promise<void> {
  const who = "initExampleUsers"

  {
    const path = "users/alice"
    const data = {
      name: "Alice",
    }

    const created = await dataCreate(db, path, data)

    log({ who, message: "create data file", path, data })

    await passwordRegister(db, created["@path"], {
      memo: "",
      password: "alice123",
    })
  }

  {
    const path = "users/bob"
    const data = {
      name: "Bob",
    }

    await dataCreate(db, path, data)

    log({ who, message: "create data file", path, data })

    await passwordRegister(db, path, {
      memo: "",
      password: "bob456",
    })
  }
}
