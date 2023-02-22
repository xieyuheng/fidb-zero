import ty, { Schema } from "@xieyuheng/ty"
import { Data, dataSchema } from "../data"

export type TokenPermissionName = "create" | "read" | "update" | "delete"

export type TokenPermissions = Record<string, Array<TokenPermissionName>>

export type Token = Data & {
  permissions: TokenPermissions
}

export const tokenSchema: Schema<Token> = ty.intersection(
  dataSchema,
  ty.object({
    permissions: ty.dict(
      ty.array(
        ty.union(
          ty.const("create" as const),
          ty.union(
            ty.const("read" as const),
            ty.union(ty.const("update" as const), ty.const("delete" as const)),
          ),
        ),
      ),
    ),
  }),
)
