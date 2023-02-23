import ty, { Schema } from "@xieyuheng/ty"
import { Data, dataSchema } from "../data"

export type Password = Data & {
  memo: string
  hash: string
}

export const passwordSchema: Schema<Password> = ty.intersection(
  dataSchema,
  ty.object({
    memo: ty.string(),
    hash: ty.string(),
  }),
)
