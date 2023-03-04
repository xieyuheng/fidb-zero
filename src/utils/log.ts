import { logJson } from "./logJson"
import type { LogOptions } from "./LogOptions"
import { logPretter } from "./logPretter"

let logger: string = "prettier"

export function log(options: LogOptions): void {
  if (logger === "json") {
    logJson(options)
  } else if (logger === "silent") {
    //
  } else if (logger === "prettier") {
    logPretter(options)
  } else {
    logPretter(options)
  }
}

export function changeLogger(loggerName: string): void {
  logger = loggerName
}
