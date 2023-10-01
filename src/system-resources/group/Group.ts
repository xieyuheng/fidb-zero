import { Data } from "../../database"
import { PermissionRecord } from "../../models/permission/PermissionRecord"

export type GroupInput = {
  permissions: PermissionRecord
}

export type Group = Data & GroupInput
