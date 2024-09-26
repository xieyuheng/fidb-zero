import Http from "node:http"
import { isJsonObject, type JsonObject } from "../Json.js"
import { requestJson } from "./requestJson.js"

export async function requestJsonObject(
  request: Http.IncomingMessage,
): Promise<JsonObject> {
  const json = await requestJson(request)
  if (!isJsonObject(json)) {
    throw new Error(
      [
        `[requestJsonObject] expect JsonObject`,
        `  json: ${JSON.stringify(json)}`,
      ].join("\n"),
    )
  }

  return json
}
