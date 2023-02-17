import { Errors as TyErrors } from "@xieyuheng/ty"
import type Http from "node:http"
import type { Database } from "../database"
import { AlreadyExists } from "../errors/AlreadyExists"
import { NotFound } from "../errors/NotFound"
import { RevisionMismatch } from "../errors/RevisionMismatch"
import { Unauthorized } from "../errors/Unauthorized"
import { responseSendJson } from "../utils/responseSendJson"
import { handleRequest } from "./handleRequest"

type RequestListener = (
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
) => Promise<void>

export function createRequestListener(options: {
  db: Database
}): RequestListener {
  const { db } = options
  return async (request, response) => {
    if (request.method === "OPTIONS") {
      preflight(request, response)
      return
    }

    const headers = {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
    }

    try {
      const body = await handleRequest(request, db)
      if (body === undefined) {
        responseSendJson(response, { status: { code: 204 }, headers })
      } else {
        responseSendJson(response, { status: { code: 200 }, headers, body })
      }
    } catch (error) {
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
