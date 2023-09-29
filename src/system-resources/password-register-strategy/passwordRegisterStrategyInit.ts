import { Database } from "../../database"
import { dataCreate } from "../../resources"

export async function passwordRegisterStrategyInit(
  db: Database,
): Promise<void> {
  await dataCreate(db, ".password-register-strategy", {
    loginTargets: {
      "users/{user}": {
        permissions: {
          "users/{user}/**": [
            "data:post",
            "data:get",
            "data:put",
            "data:patch",
            "data:delete",
            "data-find:get",
            "file:post",
            "file:get",
            "file:put",
            "file:delete",
            "file-metadata:get",
            "directory:post",
            "directory:get",
            "directory:delete",
          ],
          "users/*": ["data:get"],
          "users/*/public/**": [
            "data:get",
            "data-find:get",
            "file:get",
            "file-metadata:get",
            "directory:get",
          ],
        },
      },
    },
  })
}
