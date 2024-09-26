import { type Database } from "../../database/index.js"
import { groupCreate } from "./groupCreate.js"

export async function groupInit(db: Database): Promise<void> {
  await groupCreate(db, "guest", {
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

  await groupCreate(db, "owner", {
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

  await groupCreate(db, "user", {
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
