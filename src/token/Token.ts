import ty, { Schema } from "@xieyuheng/ty"
import { Data, DataSchema } from "../data"

export type Token = Data & {
  issuer: string
}

export const TokenSchema: Schema<Token> = ty.intersection(
  DataSchema,
  ty.object({
    issuer: ty.string(),
  }),
)
