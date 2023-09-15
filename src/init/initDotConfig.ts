import { Database } from "../database"
import { dataCreate } from "../db"

export async function initDotConfig(db: Database): Promise<void> {
  await dataCreate(db, ".config/default-token-issuer", {
    permissions: {
      "users/*/public/**": [
        "data:get",
        "data-find:get",
        "file:get",
        "file-metadata:get",
        "directory:get",
      ],
    },
  })

  await dataCreate(db, ".tokens/default", {
    issuer: ".config/default-token-issuer",
  })
}
