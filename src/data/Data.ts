import type { JsonObject } from "../utils/Json"

export type Data = JsonObject & {
  "@id": string
  "@revision": string
  "@createdAt": number
  "@updatedAt": number
}

export type DataOmitId = JsonObject & {
  "@revision": string
  "@createdAt": number
  "@updatedAt": number
}
