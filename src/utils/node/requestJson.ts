import Http from "node:http"
import { type Json } from "../Json.js"
import { requestText } from "./requestText.js"
import { requestURL } from "./requestURL.js"

export async function requestJson(
  request: Http.IncomingMessage,
): Promise<Json> {
  const who = "requestJson"

  const text = await requestText(request)

  try {
    return JSON.parse(text)
  } catch (error) {
    if (error instanceof SyntaxError) {
      const url = requestURL(request)
      const message = `[${who}] request url: ${url}, text: ${text}`
      error.message += "\n"
      error.message += message
    }

    throw error
  }
}
