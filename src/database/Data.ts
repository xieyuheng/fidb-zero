import ty, { Schema } from "@xieyuheng/ty"
import { type JsonObject } from "../utils/Json.js"

export type Data = JsonObject & {
  "@path": string
  "@revision": string
  "@createdAt": number
  "@updatedAt": number
}

export const DataSchema: Schema<Data> = ty.object({
  "@path": ty.string(),
  "@revision": ty.string(),
  "@createdAt": ty.number(),
  "@updatedAt": ty.number(),
})
