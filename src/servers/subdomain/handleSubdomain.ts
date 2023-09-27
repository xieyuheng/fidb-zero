import { Buffer } from "node:buffer"
import Http from "node:http"
import { normalize, resolve } from "node:path"
import { Database } from "../../database"
import { readDatabaseConfigFile } from "../../database/readDatabaseConfigFile"
import { handlePreflight } from "../../server/handlePreflight"
import { Json } from "../../utils/Json"
import { log } from "../../utils/log"
import { requestPathname } from "../../utils/node/requestPathname"
import { responseSetHeaders } from "../../utils/node/responseSetHeaders"
import { responseSetStatus } from "../../utils/node/responseSetStatus"
import { handleDatabase } from "../database/handleDatabase"
import { Context } from "./Context"
import { requestFindSubdomain } from "./requestFindSubdomain"

export async function handleSubdomain(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Buffer | void> {
  const who = "handleSubdomain"
  const subdomain = await requestFindSubdomain(ctx, request)
  const pathname = requestPathname(request)
  const withLog = !ctx.config.logger?.disableRequestLogging

  if (subdomain === undefined) {
    const code = 404
    if (withLog) log({ who, hostname: ctx.domain, subdomain, pathname, code })
    responseSetStatus(response, { code })
    responseSetHeaders(response, { connection: "close" })
    response.end()
    return
  }

  const subdirectory = normalize(resolve(ctx.directory, subdomain))
  const config = await readDatabaseConfigFile(`${subdirectory}/database.json`)

  const db: Database = { directory: subdirectory, config }

  if (request.method === "OPTIONS") {
    return handlePreflight(request, response)
  }

  if (withLog) log({ who, subdomain, pathname })

  return await handleDatabase(db, request, response)
}
