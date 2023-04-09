import ty, { Schema } from "@xieyuheng/ty"
import { Data, DataSchema } from "../data"
import { Operation, OperationSchema } from "../operation"

export type Token = Data & {
  permissions: Record<string, Array<Operation>>
}

export const TokenSchema: Schema<Token> = ty.intersection(
  DataSchema,
  ty.object({
    permissions: ty.dict(ty.array(OperationSchema)),
  }),
)
