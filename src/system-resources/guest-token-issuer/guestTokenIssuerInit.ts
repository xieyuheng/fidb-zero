import { Database } from "../../database"
import { dataCreate } from "../../resources"

export async function guestTokenIssuerInit(db: Database): Promise<void> {
  await dataCreate(db, ".guest-token-issuer", {
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
  })
}