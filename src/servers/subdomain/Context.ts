import { DatabaseConfig } from "../../database"

export type Context = {
  domain: string
  directory: string
  config: DatabaseConfig
}
