import type Http from "node:http"
import { requestText } from "./requestText"

export async function requestJson(
  request: Http.IncomingMessage,
): Promise<string> {
  const text = await requestText(request)
  return JSON.parse(text)
}
