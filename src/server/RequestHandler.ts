import Http from "node:http"
import { Json } from "../utils/Json"

export type RequestHandler<Context> = (
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
) => Promise<Json | Buffer | void>
