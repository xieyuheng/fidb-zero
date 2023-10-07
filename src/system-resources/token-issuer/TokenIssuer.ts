import { ty, Schema } from "@xieyuheng/ty"
import { Data, DataSchema } from "../../database"

export type TokenIssuerInput = {
  groups: Array<string>
  user?: string
}

export const TokenIssuerInputSchema: Schema<TokenIssuerInput> = ty.object({
  groups: ty.array(ty.string()),
  user: ty.optional(ty.string()),
})

export type TokenIssuer = Data & TokenIssuerInput

export const TokenIssuerSchema: Schema<TokenIssuer> = ty.intersection(
  DataSchema,
  TokenIssuerInputSchema,
)
