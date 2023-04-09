import ty, { Schema } from "@xieyuheng/ty"

export type Operation = "create" | "read" | "update" | "delete"

export const OperationSchema: Schema<Operation> = ty.union(
  ty.const("create" as const),
  ty.union(
    ty.const("read" as const),
    ty.union(ty.const("update" as const), ty.const("delete" as const)),
  ),
)
