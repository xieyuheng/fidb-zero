import type Http from "node:http"
import { JsonParsingError } from "../errors/JsonParsingError"
import type { Json } from "../utils/Json"
import { requestText } from "./requestText"
import { requestURL } from "./requestURL"

export async function requestJson(
  request: Http.IncomingMessage,
): Promise<Json> {
  const who = "requestJson"

  const text = await requestText(request)

  try {
    return JSON.parse(text)
  } catch (error) {
    const url = requestURL(request)
    throw new JsonParsingError(`[${who}] request url: ${url}, text: ${text}`)
  }
}
