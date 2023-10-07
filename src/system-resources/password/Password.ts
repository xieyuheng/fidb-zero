import { Schema, ty } from "@xieyuheng/ty"
import { Data, DataSchema } from "../../database"

export type Password = Data & {
  hash: string
}

export const PasswordSchema: Schema<Password> = ty.intersection(
  DataSchema,
  ty.object({
    hash: ty.string(),
  }),
)
