import ty, { Schema } from "@xieyuheng/ty"
import { Data, DataSchema } from "../../database"

export type Password = Data & {
  memo?: string
  hash: string
}

export const PasswordSchema: Schema<Password> = ty.intersection(
  DataSchema,
  ty.object({
    memo: ty.optional(ty.string()),
    hash: ty.string(),
  }),
)
