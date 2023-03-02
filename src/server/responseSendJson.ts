import type Http from "node:http"
import type { Json } from "../utils/Json"
import { responseSend } from "./responseSend"

export function responseSendJson(
  response: Http.ServerResponse,
  options: {
    status?: {
      code?: number
      message?: string
    }
    headers?: Record<string, string | undefined>
    body?: Json
  },
) {
  responseSend(response, {
    status: options.status,
    headers: options.headers,
    body: JSON.stringify(options.body),
  })
}
