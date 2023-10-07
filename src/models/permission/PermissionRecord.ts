import { ty, Schema } from "@xieyuheng/ty"
import { Operation, OperationSchema } from "../permission"

export type PermissionRecord = Record<string, Array<Operation>>

export const PermissionRecordSchema: Schema<PermissionRecord> = ty.dict(
  ty.array(OperationSchema),
)
