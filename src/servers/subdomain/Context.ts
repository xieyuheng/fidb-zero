import { type DatabaseConfig } from "../../database/index.js"

export type Context = {
  domain: string
  directory: string
  config: DatabaseConfig
}
