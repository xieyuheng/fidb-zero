import ty, { Schema } from "@xieyuheng/ty"
import { Data, dataSchema } from "../data"

export type TokenPermission = "create" | "read" | "update" | "delete"

export type TokenPermissionRecord = Record<string, Array<TokenPermission>>

export type Token = Data & {
  permissionRecord: TokenPermissionRecord
}

export const tokenPermissionSchema: Schema<TokenPermission> = ty.union(
  ty.const("create" as const),
  ty.union(
    ty.const("read" as const),
    ty.union(ty.const("update" as const), ty.const("delete" as const)),
  ),
)

export const tokenSchema: Schema<Token> = ty.intersection(
  dataSchema,
  ty.object({
    permissionRecord: ty.dict(ty.array(tokenPermissionSchema)),
  }),
)
