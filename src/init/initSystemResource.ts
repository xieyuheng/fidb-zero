import { Database } from "../database"
import { dataCreate } from "../db"
import { log } from "../utils/log"

export async function initSystemResource(db: Database): Promise<void> {
  const who = "initSystemResource"

  {
    const path = ".config/default-token-issuer"
    const data = {
      permissions: {
        "users/*/public/**": [
          "data:get",
          "data-find:get",
          "file:get",
          "file-metadata:get",
          "directory:get",
        ],
      },
    }

    await dataCreate(db, path, data)
    log({ who, message: "create data file", path, data })
  }

  {
    const path = ".tokens/default"
    const data = {
      issuer: ".config/default-token-issuer",
    }

    await dataCreate(db, path, data)
    log({ who, message: "create data file", path, data })
  }
}
