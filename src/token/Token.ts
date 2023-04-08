import ty, { Schema } from "@xieyuheng/ty"
import { Data, DataSchema } from "../data"

export type Operation = "create" | "read" | "update" | "delete"

export type Token = Data & {
  permissions: Record<string, Array<Operation>>
  owner?: string
}

export const OperationSchema: Schema<Operation> = ty.union(
  ty.const("create" as const),
  ty.union(
    ty.const("read" as const),
    ty.union(ty.const("update" as const), ty.const("delete" as const)),
  ),
)

export const TokenSchema: Schema<Token> = ty.intersection(
  DataSchema,
  ty.object({
    permissions: ty.dict(ty.array(OperationSchema)),
    owner: ty.optional(ty.string()),
  }),
)
