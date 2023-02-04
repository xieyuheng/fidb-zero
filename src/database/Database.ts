import type { JsonAtom, JsonObject } from "../utils/Json.ts"
import { dirname, resolve } from "std/path/mod.ts"
import { ensureDir } from "std/fs/mod.ts"

export type Data = JsonObject & { "@id": string }

export type FindOptions = { properties: Record<string, JsonAtom> }

export class Database {
  constructor(public options: { path: string }) {}

  resolve(path: string): string {
    return resolve(this.options.path, path)
  }

  async create(prefix: string, json: JsonObject): Promise<Data> {
    const id = `${prefix}/${crypto.randomUUID()}`
    const data = { "@id": id, ...json }
    await writeData(this.resolve(id), data)
    return data
  }

  async put(id: string, json: JsonObject): Promise<Data> {
    const data = { "@id": id, ...json }
    await writeData(this.resolve(id), data)
    return data
  }

  async getOrFail(id: string): Promise<Data> {
    return await readData(this.resolve(id))
  }

  async get(id: string): Promise<Data | undefined> {
    try {
      return await this.getOrFail(id)
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return undefined
      }

      throw error
    }
  }

  async patch(id: string, json: JsonObject): Promise<Data> {
    const data = { ...(await this.getOrFail(id)), ...json }
    await writeData(this.resolve(id), data)
    return data
  }

  async delete(id: string): Promise<void> {
    await Deno.remove(this.resolve(id))
  }

  async deleteAll(prefix: string): Promise<void> {
    await Deno.remove(this.resolve(prefix), { recursive: true })
  }

  async *all(prefix: string): AsyncIterable<Data> {
    try {
      for await (const dirEntry of Deno.readDir(this.resolve(prefix))) {
        if (dirEntry.isFile) {
          const data = await this.get(`${prefix}/${dirEntry.name}`)
          if (data !== undefined) {
            yield data
          }
        }
      }
    } catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) {
        throw error
      }
    }
  }

  async *find(prefix: string, options: FindOptions): AsyncIterable<Data> {
    for await (const data of this.all(prefix)) {
      if (
        Object.entries(options.properties).every(
          ([key, property]) => data[key] === property,
        )
      ) {
        yield data
      }
    }
  }
}

async function writeData(path: string, data: Data): Promise<void> {
  const text = JSON.stringify(data)
  await ensureDir(dirname(path))
  await Deno.writeTextFile(path, text)
}

async function readData(path: string): Promise<Data> {
  const text = await Deno.readTextFile(path)
  return JSON.parse(text)
}
