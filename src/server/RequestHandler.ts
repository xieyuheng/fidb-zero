import Http from "node:http"
import { type Json } from "../utils/Json.js"

export type RequestHandler<Context> = (
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
) => Promise<Json | Uint8Array | void>
