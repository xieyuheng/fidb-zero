import Http from "node:http"
import { normalize, resolve } from "node:path"
import { type Database } from "../../database/index.js"
import { readDatabaseConfigFile } from "../../database/readDatabaseConfigFile.js"
import { handlePreflight } from "../../server/handlePreflight.js"
import { type Json } from "../../utils/Json.js"
import { log } from "../../utils/log.js"
import { requestPathname } from "../../utils/node/requestPathname.js"
import { responseSetHeaders } from "../../utils/node/responseSetHeaders.js"
import { responseSetStatus } from "../../utils/node/responseSetStatus.js"
import { handleDatabase } from "../database/handleDatabase.js"
import { type Context } from "./Context.js"
import { requestFindSubdomain } from "./requestFindSubdomain.js"

export async function handleSubdomain(
  ctx: Context,
  request: Http.IncomingMessage,
  response: Http.ServerResponse,
): Promise<Json | Uint8Array | void> {
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
