import ty, { Schema } from "@xieyuheng/ty"
import { Data, DataSchema } from "../../database"
import {
  PermissionRecord,
  PermissionRecordSchema,
} from "../../models/permission/PermissionRecord"

export type TokenIssuerInput = {
  permissions: PermissionRecord
}

export const TokenIssuerInputSchema: Schema<TokenIssuerInput> = ty.object({
  permissions: PermissionRecordSchema,
})

export type TokenIssuer = Data & TokenIssuerInput

export const TokenIssuerSchema: Schema<TokenIssuer> = ty.intersection(
  DataSchema,
  TokenIssuerInputSchema,
)
