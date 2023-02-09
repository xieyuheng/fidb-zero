import ty from "@xieyuheng/ty"
import type { JsonObject } from "../utils/Json"

export type Data = JsonObject & {
  "@id": string
  "@revision": string
  "@createdAt": number
  "@updatedAt": number
}

export const dataSchema = ty.object({
  "@id": ty.string(),
  "@revision": ty.string(),
  "@createdAt": ty.number(),
  "@updatedAt": ty.number(),
})

export type DataOmitId = JsonObject & {
  "@revision": string
  "@createdAt": number
  "@updatedAt": number
}
