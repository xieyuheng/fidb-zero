import { Operation, readOperations } from "../operation"

export const defaultPermissions: Record<string, Array<Operation>> = {
  "users/*/public/**": readOperations,
}
