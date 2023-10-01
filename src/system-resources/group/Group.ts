import { Data } from "../../database"
import { PermissionRecord } from "../../models/permission/PermissionRecord"

export type Group = Data & {
  permissions: PermissionRecord
}
