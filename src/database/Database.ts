import type { JsonObject } from "../utils/Json.ts";
import { resolve, dirname } from "path";

export type Data = JsonObject & { "@id": string };

export class Database {
  constructor(public options: { path: string }) {}

  dir(id: string): string {
    return resolve(this.options.path, dirname(id));
  }

  file(id: string): string {
    return resolve(this.options.path, id + ".json");
  }

  async put(id: string, json: JsonObject): Promise<Data> {
    const data = { "@id": id, ...json };
    const text = JSON.stringify(data);
    await Deno.mkdir(this.dir(id), { recursive: true });
    await Deno.writeTextFile(this.file(id), text);
    return data;
  }

  async get(id: string): Promise<Data> {
    const text = await Deno.readTextFile(this.file(id));
    return JSON.parse(text);
  }

  async patch(id: string, json: JsonObject): Promise<Data> {
    const data = { ...(await this.get(id)), ...json };
    const text = JSON.stringify(data);
    await Deno.mkdir(this.dir(id), { recursive: true });
    await Deno.writeTextFile(this.file(id), text);
    return data;
  }
}
