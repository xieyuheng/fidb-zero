import { Errors as TyErrors } from "@xieyuheng/ty"
import type Http from "node:http"
import { AlreadyExists } from "../errors/AlreadyExists"
import { NotFound } from "../errors/NotFound"
import { Processing } from "../errors/Processing"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import { Unauthorized } from "../errors/Unauthorized"
import { Unprocessable } from "../errors/Unprocessable"
import type { Json } from "../utils/Json"
import { responseSend } from "./responseSend"

export type RequestListener = (
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
) => Promise<void>

export type HandleRequest<Context> = (
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
) => Promise<Json | Buffer | void>

export function createRequestListener<Context>(options: {
  ctx: Context
  handle: HandleRequest<Context>
}): RequestListener {
  const { ctx, handle } = options
  return async (request, response) => {
    try {
      const body = await handle(ctx, request, response)

      if (response.writableEnded) {
        return
      }

      if (body === undefined) {
        responseSend(response, {
          status: { code: 204 },
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*",
            connection: "close",
          },
        })
      } else if (body instanceof Buffer) {
        responseSend(response, {
          status: { code: 200 },
          headers: {
            "content-type": "text/plain",
            "access-control-allow-origin": "*",
            connection: "close",
          },
          body,
        })
      } else {
        responseSend(response, {
          status: { code: 200 },
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*",
            connection: "close",
          },
          body: JSON.stringify(body),
        })
      }
    } catch (error) {
      if (error instanceof Processing) {
        return
      }

      const headers = {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
        connection: "close",
      }

      const message = error instanceof Error ? error.message : "Unknown error"
      if (error instanceof Unauthorized) {
        responseSend(response, { status: { code: 401, message }, headers })
      } else if (error instanceof AlreadyExists) {
        responseSend(response, { status: { code: 403, message }, headers })
      } else if (error instanceof NotFound) {
        responseSend(response, { status: { code: 404, message }, headers })
      } else if (error instanceof RevisionMismatch) {
        responseSend(response, { status: { code: 409, message }, headers })
      } else if (error instanceof Unprocessable) {
        responseSend(response, { status: { code: 422, message }, headers })
      } else if (TyErrors.InvalidData.guard(error)) {
        responseSend(response, {
          status: { code: 422, message },
          headers,
          body: JSON.stringify({
            errors: { [error.path]: error.msg },
          }),
        })
      } else {
        responseSend(response, { status: { code: 500, message }, headers })
      }
    }
  }
}
