import { Database } from "../../database"
import { dataCreate } from "../../resources"

export async function groupInit(db: Database): Promise<void> {
  await dataCreate(db, ".groups/guest", {
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

  await dataCreate(db, ".groups/owner", {
    permissions: {
      "**": [
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
    },
  })

  await dataCreate(db, ".groups/user", {
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
  })
}
