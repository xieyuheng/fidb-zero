import { Schema, ty } from "@xieyuheng/ty"

export type Operation =
  | "data:post"
  | "data:get"
  | "data:put"
  | "data:patch"
  | "data:delete"
  | "data-find:get"
  | "file:post"
  | "file:get"
  | "file:put"
  | "file:delete"
  | "file-metadata:get"
  | "directory:post"
  | "directory:get"
  | "directory:delete"

export const allOperations: Array<Operation> = [
  "data:post",
  "data:get",
  "data:put",
  "data:patch",
  "data:delete",
  "data-find:get",
  "file:post",
  "file:get",
  "file:put",
  "file:delete",
  "file-metadata:get",
  "directory:post",
  "directory:get",
  "directory:delete",
]

export const readOperations: Array<Operation> = [
  "data:get",
  "data-find:get",
  "file:get",
  "file-metadata:get",
  "directory:get",
]

function isOperation(x: string): x is Operation {
  return allOperations.includes(x as any)
}

export const OperationSchema: Schema<Operation> = ty.predicate(isOperation, {
  description: `The string should be an operation.`,
})
