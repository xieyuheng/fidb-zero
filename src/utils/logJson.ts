import { type LogOptions } from "./LogOptions.js"

export function logJson(options: LogOptions): void {
  console.dir(options, { depth: null })
}
