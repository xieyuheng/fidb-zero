import ty, { Schema } from "@xieyuheng/ty"
import { Data, dataSchema } from "../data"

export type Password = Data & {
  hash: string
}

export const tokenSchema: Schema<Password> = ty.intersection(
  dataSchema,
  ty.object({
    hash: ty.string(),
  }),
)
