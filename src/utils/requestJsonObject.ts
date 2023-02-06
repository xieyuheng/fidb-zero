import type Http from "node:http"
import { isJsonObject, JsonObject } from "./Json"
import { requestText } from "./requestText"

export async function requestJsonObject(
  request: Http.IncomingMessage,
): Promise<JsonObject> {
  const text = await requestText(request)
  const json = JSON.parse(text)
  if (!isJsonObject(json)) {
    throw new Error(
      [`[requestJsonObject] expect JsonObject`, `  json: ${text}`].join("\n"),
    )
  }

  return json
}
