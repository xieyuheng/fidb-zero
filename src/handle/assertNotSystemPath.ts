import { Unauthorized } from "../errors"
import { isSystemPath } from "./isSystemPath"

export function assertNotSystemPath(
  path: string,
  options: { who: string },
): void {
  const { who } = options

  if (isSystemPath(path)) {
    console.log(path, { who })
    throw new Unauthorized(`[${who} can not access system path]`)
  }
}
