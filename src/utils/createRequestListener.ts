import { Errors as TyErrors } from "@xieyuheng/ty"
import type Http from "node:http"
import { AlreadyExists } from "../errors/AlreadyExists"
import { NotFound } from "../errors/NotFound"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import { Unauthorized } from "../errors/Unauthorized"
import type { Json } from "./Json"
import { responseSend } from "./responseSend"
import { responseSendJson } from "./responseSendJson"

export type RequestListener = (
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
) => Promise<void>

export type HandleRequest<Context> = (
  ctx: Context,
  request: Http.IncomingMessage,
) => Promise<Json | Buffer | void>

export function createRequestListener<Context>(options: {
  ctx: Context
  handleRequest: HandleRequest<Context>
}): RequestListener {
  const { ctx, handleRequest } = options
  return async (request, response) => {
    if (request.method === "OPTIONS") {
      preflight(request, response)
      return
    }

    try {
      const body = await handleRequest(ctx, request)
      if (body === undefined) {
        responseSendJson(response, {
          status: { code: 204 },
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*",
          },
        })
      } else if (body instanceof Buffer) {
        responseSend(response, {
          status: { code: 200 },
          headers: {
            "content-type": "text/plain",
            "access-control-allow-origin": "*",
          },
          body,
        })
      } else {
        responseSendJson(response, {
          status: { code: 200 },
          headers: {
            "content-type": "application/json",
            "access-control-allow-origin": "*",
          },
          body,
        })
      }
    } catch (error) {
      const headers = {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      }

      const message = error instanceof Error ? error.message : "Unknown error"
      if (error instanceof NotFound) {
        responseSendJson(response, { status: { code: 404, message }, headers })
      } else if (error instanceof Unauthorized) {
        responseSendJson(response, { status: { code: 401, message }, headers })
      } else if (error instanceof AlreadyExists) {
        responseSendJson(response, { status: { code: 403, message }, headers })
      } else if (error instanceof RevisionMismatch) {
        responseSendJson(response, { status: { code: 409, message }, headers })
      } else if (TyErrors.InvalidData.guard(error)) {
        responseSendJson(response, {
          status: { code: 422, message },
          headers,
          body: JSON.stringify({
            errors: { [error.path]: error.msg },
          }),
        })
      } else {
        responseSendJson(response, { status: { code: 500, message }, headers })
      }
    }
  }
}

function preflight(
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): void {
  const headers: Record<string, string> = {}

  if (request.headers["origin"]) {
    headers["access-control-allow-origin"] = request.headers["origin"]
  }

  if (request.headers["access-control-request-method"]) {
    headers["access-control-allow-methods"] =
      request.headers["access-control-request-method"]
  }

  if (request.headers["access-control-request-headers"]) {
    headers["access-control-allow-headers"] =
      request.headers["access-control-request-headers"]
  }

  responseSendJson(response, { headers })
}
