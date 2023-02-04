import fs from "node:fs"
import { dirname, resolve } from "node:path"
import { isErrnoException } from "../utils/isErrnoException"
import type { JsonAtom, JsonObject } from "../utils/Json"

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
      if (isErrnoException(error) && error.code === "ENOENT") {
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
    await fs.promises.rm(this.resolve(id), { force: true })
  }

  async deleteAll(prefix: string): Promise<void> {
    await fs.promises.rm(this.resolve(prefix), { force: true, recursive: true })
  }

  async *all(prefix: string): AsyncIterable<Data> {
    try {
      const dir = await fs.promises.opendir(this.resolve(prefix), {
        bufferSize: 1024,
      })

      for await (const dirEntry of dir) {
        if (dirEntry.isFile()) {
          const data = await this.get(`${prefix}/${dirEntry.name}`)
          if (data !== undefined) {
            yield data
          }
        }
      }
    } catch (error) {
      if (!(isErrnoException(error) && error.code === "ENOENT")) {
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
  await fs.promises.mkdir(dirname(path), { recursive: true })
  await fs.promises.writeFile(path, text)
}

async function readData(path: string): Promise<Data> {
  const text = await fs.promises.readFile(path, "utf-8")
  return JSON.parse(text)
}
