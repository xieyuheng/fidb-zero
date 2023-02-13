import ty from "@xieyuheng/ty"
import type { JsonObject } from "../utils/Json"

export type Data = JsonObject & {
  "@path": string
  "@revision": string
  "@createdAt": number
  "@updatedAt": number
}

export const dataSchema = ty.object({
  "@path": ty.string(),
  "@revision": ty.string(),
  "@createdAt": ty.number(),
  "@updatedAt": ty.number(),
})
