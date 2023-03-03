import { basename, dirname, resolve } from "node:path"
import { pathIsDirectory } from "../../utils/node/pathIsDirectory"
import { pathIsFile } from "../../utils/node/pathIsFile"

export type Context = {
  path: string
  rewrites: Record<string, string>
}

type ContextOptions = {
  path: string
}

export async function createContext(options: ContextOptions): Promise<Context> {
  const { path } = options

  if (await pathIsFile(path)) {
    return {
      path: dirname(resolve(path)),
      rewrites: {
        "": basename(path),
      },
    }
  }

  if (await pathIsDirectory(path)) {
    return {
      path: resolve(path),
      rewrites: {},
    }
  }

  throw new Error(`[createContext] path is not a file or directory: ${path}`)
}
