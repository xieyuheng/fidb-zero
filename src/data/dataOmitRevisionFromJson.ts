import { isJsonObject, Json } from "../utils/Json"
import type { DataOmitRevision } from "./Data"

export function dataOmitRevisionFromJson(json: Json): DataOmitRevision {
  if (!isJsonObject(json)) {
    throw new Error(
      [
        `[dataOmitRevisionFromJson] expect JsonObject`,
        `  json: ${JSON.stringify(json)}`,
      ].join("\n"),
    )
  }

  if (typeof json["@id"] === "string") {
    throw new Error(
      [
        `[dataOmitRevisionFromJson] expect @id string`,
        `  json["@id"]: ${JSON.stringify(json["@id"])}`,
      ].join("\n"),
    )
  }

  return json as DataOmitRevision
}
