import { Operation, readOperations } from "../permission"

export const defaultPermissions: Record<string, Array<Operation>> = {
  users: ["directory:get"],
  "users/*": ["data:get"],
  "users/*/public/**": readOperations,
}
