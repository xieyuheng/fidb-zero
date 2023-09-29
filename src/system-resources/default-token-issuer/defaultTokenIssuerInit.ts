import { Database } from "../../database"
import { dataCreate } from "../../resources"
import { log } from "../../utils/log"

export async function defaultTokenIssuerInit(db: Database): Promise<void> {
  const who = "defaultTokenIssuerInit"

  const path = ".default-token-issuer"
  const data = {
    permissions: {
      users: ["directory:get"],
      "users/*": ["data:get"],
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

  log({ who, path })
}
