import type Http from "node:http"
import type { Json } from "../utils/Json"
import { requestText } from "./requestText"

export async function requestJson(
  request: Http.IncomingMessage,
): Promise<Json> {
  const text = await requestText(request)
  return JSON.parse(text)
}
