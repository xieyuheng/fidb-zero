import ty, { Schema } from "@xieyuheng/ty"
import { type Data, DataSchema } from "../../database/index.js"

export type Password = Data & {
  hash: string
}

export const PasswordSchema: Schema<Password> = ty.intersection(
  DataSchema,
  ty.object({
    hash: ty.string(),
  }),
)
