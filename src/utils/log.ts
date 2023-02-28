import { colors } from "./colors"
import { formatTime } from "./formatDate"
import { indent } from "./indent"

type LogOptions = Record<string, any> & {
  kind?: string
  who: string
  elapse?: number
  message?: string
}

export function log(opts: LogOptions): void {
  const { kind, who, elapse, message } = opts

  let s = ""

  s += formatNow() + " "

  if (kind === "Error") {
    s += formatError(formatWho(who)) + " "
  } else {
    s += formatWho(who) + " "
  }

  if (message) s += `${message}`
  if (elapse !== undefined) s += " " + formatElapse(elapse)

  s += "\n"

  for (const [key, value] of Object.entries(opts)) {
    if (!["who", "message", "elapse"].includes(key)) {
      if (value !== undefined) {
        s += formatProperty(key, value)
        s += "\n"
      }
    }
  }

  console.log(s.trim())
}

function formatError(text: string): string {
  return colors.red(text)
}

function formatWho(who: string): string {
  return colors.bold(`[${who}]`)
}

function formatNow(): string {
  const time = formatTime(new Date(), { withMilliseconds: true })
  return colors.yellow(`${time}`)
}

function formatElapse(elapse: number): string {
  return colors.yellow(`<${elapse}ms>`)
}

function formatProperty(key: string, value: any): string {
  const k = colors.italic(colors.yellow(key))
  const j = JSON.stringify(value, null, 2)
  const v = indent(j, "  ").trim()
  return `  ${k}: ${v}`
}
