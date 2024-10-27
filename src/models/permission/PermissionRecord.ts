import ty, { Schema } from "@xieyuheng/ty"
import { type Operation, OperationSchema } from "./Operation.js"

export type PermissionRecord = Record<string, Array<Operation>>

export const PermissionRecordSchema: Schema<PermissionRecord> = ty.dict(
  ty.array(OperationSchema),
)
