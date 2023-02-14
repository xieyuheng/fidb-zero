import ty, { Schema } from "@xieyuheng/ty"

export type TokenPermission = "readonly" | "readwrite"

export type TokenPermissions = Record<string, TokenPermission>

export type Token = {
  permissions: TokenPermissions
}

export const tokenSchema: Schema<Token> = ty.object({
  permissions: ty.dict(
    ty.union(ty.const("readonly" as const), ty.const("readwrite" as const)),
  ),
})
