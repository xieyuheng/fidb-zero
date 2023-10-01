import { Schema, ty } from "@xieyuheng/ty"
import { Data, DataSchema } from "../../database"
import {
  PermissionRecord,
  PermissionRecordSchema,
} from "../../models/permission/PermissionRecord"

export type GroupInput = {
  permissions: PermissionRecord
}

export const GroupInputSchema: Schema<GroupInput> = ty.object({
  permissions: PermissionRecordSchema,
})

export type Group = Data & GroupInput

export const GroupSchema: Schema<Group> = ty.intersection(
  DataSchema,
  GroupInputSchema,
)
