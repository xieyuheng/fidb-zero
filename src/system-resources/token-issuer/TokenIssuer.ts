import ty, { Schema } from "@xieyuheng/ty"
import { Data, DataSchema } from "../../database"
import {
  PermissionRecord,
  PermissionRecordSchema,
} from "../../models/permission/PermissionRecord"

export type TokenIssuer = Data & {
  permissions: PermissionRecord
}

export const TokenIssuerSchema: Schema<TokenIssuer> = ty.intersection(
  DataSchema,
  ty.object({
    permissions: PermissionRecordSchema,
  }),
)

export type TokenIssuerInput = {
  permissions: PermissionRecord
}

export const TokenIssuerInputSchema: Schema<TokenIssuerInput> = ty.object({
  permissions: PermissionRecordSchema,
})
