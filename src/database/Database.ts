import type { JsonObject } from "../utils/Json.ts";
import { dirname, resolve } from "path";
import { ensureDir } from "fs";

export type Data = JsonObject & { "@id": string };

export class Database {
  constructor(public options: { path: string }) {}

  resolve(path: string): string {
    return resolve(this.options.path, path);
  }

  dir(id: string): string {
    return this.resolve(dirname(id));
  }

  file(id: string): string {
    return this.resolve(id + ".json");
  }

  async put(id: string, json: JsonObject): Promise<Data> {
    const data = { "@id": id, ...json };
    await writeData(this.file(id), data);
    return data;
  }

  async getOrFail(id: string): Promise<Data> {
    return readData(this.file(id));
  }

  async get(id: string): Promise<Data | undefined> {
    try {
      return await this.getOrFail(id);
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return undefined;
      }

      throw error;
    }
  }

  async patch(id: string, json: JsonObject): Promise<Data> {
    const data = { ...(await this.getOrFail(id)), ...json };
    await writeData(this.file(id), data);
    return data;
  }

  async delete(id: string): Promise<void> {
    await Deno.remove(this.file(id));
  }

  async *all(prefix: string): AsyncIterable<Data> {
    for await (const dirEntry of Deno.readDir(this.resolve(prefix))) {
      if (dirEntry.isFile && dirEntry.name.endsWith(".json")) {
        yield readData(this.resolve(`${prefix}/${dirEntry.name}`));
      }
    }
  }

  async *find(prefix: string, options: FindOptions): AsyncIterable<Data> {
    for await (const data of this.all(prefix)) {
      if (
        Object.entries(options.properties).every(
          ([key, value]) => data[key] === value
        )
      ) {
        yield data;
      }
    }
  }
}

type FindOptions = {
  properties: Record<string, string | number>;
};

async function writeData(path: string, data: Data): Promise<void> {
  const text = JSON.stringify(data);
  await ensureDir(dirname(path));
  await Deno.writeTextFile(path, text);
}

async function readData(path: string): Promise<Data> {
  const text = await Deno.readTextFile(path);
  return JSON.parse(text);
}
