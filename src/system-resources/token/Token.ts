import ty, { Schema } from "@xieyuheng/ty"
import { type Data, DataSchema } from "../../database/index.js"

export type TokenInput = {
  issuer: string
  issuerRevision: string
}

export const TokenInputSchema: Schema<TokenInput> = ty.object({
  issuer: ty.string(),
  issuerRevision: ty.string(),
})

export type Token = Data & TokenInput

export const TokenSchema: Schema<Token> = ty.intersection(
  DataSchema,
  TokenInputSchema,
)
