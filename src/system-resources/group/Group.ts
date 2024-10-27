import ty, { Schema } from "@xieyuheng/ty"
import { type Data, DataSchema } from "../../database/index.js"
import {
  type PermissionRecord,
  PermissionRecordSchema,
} from "../../models/permission/PermissionRecord.js"

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
