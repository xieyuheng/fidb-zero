import ty, { Schema } from "@xieyuheng/ty"
import { Data, dataSchema } from "../data"

export type TokenPermission = "read" | "readwrite"

export type TokenPermissions = Record<string, TokenPermission>

export type Token = Data & {
  permissions: TokenPermissions
}

export const tokenSchema: Schema<Token> = ty.intersection(
  dataSchema,
  ty.object({
    permissions: ty.dict(
      ty.union(ty.const("read" as const), ty.const("readwrite" as const)),
    ),
  }),
)
