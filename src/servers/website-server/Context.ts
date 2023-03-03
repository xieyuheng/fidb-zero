import { resolve } from "node:path"
import { pathIsDirectory } from "../../utils/node/pathIsDirectory"

export type Context = {
  directory: string
  rewriteNotFoundTo?: string
  cors?: boolean
}

type ContextOptions = {
  path: string
  rewriteNotFoundTo?: string
  cors?: boolean
}

export async function createContext(options: ContextOptions): Promise<Context> {
  const { path, rewriteNotFoundTo, cors } = options

  if (await pathIsDirectory(path)) {
    return {
      directory: resolve(path),
      rewriteNotFoundTo,
      cors,
    }
  }

  throw new Error(`[createContext] path is a directory: ${path}`)
}
