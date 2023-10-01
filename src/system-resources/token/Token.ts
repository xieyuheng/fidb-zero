import ty, { Schema } from "@xieyuheng/ty"
import { Data, DataSchema } from "../../database"

export type TokenInput = {
  issuer: string
  issuerUpdatedAt: number
}

export const TokenInputSchema: Schema<TokenInput> = ty.object({
  issuer: ty.string(),
  issuerUpdatedAt: ty.number(),
})

export type Token = Data & TokenInput

export const TokenSchema: Schema<Token> = ty.intersection(
  DataSchema,
  TokenInputSchema,
)
