import ty, { Schema } from "@xieyuheng/ty"

export type Operation = "create" | "read" | "update" | "delete"

const operations = ["create", "read", "update", "delete"]

function guard(x: string): x is Operation {
  return operations.includes(x)
}

export const OperationSchema: Schema<Operation> = ty.guard(guard)
