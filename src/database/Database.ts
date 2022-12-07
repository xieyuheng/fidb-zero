import type { JsonObject } from "../utils/Json.ts";
import { dirname, resolve } from "path";
import { ensureDir } from "fs";

export type Data = JsonObject & { "@id": string };

export class Database {
  constructor(public options: { path: string }) {}

  dir(id: string): string {
    return resolve(this.options.path, dirname(id));
  }

  file(id: string): string {
    return resolve(this.options.path, id + ".json");
  }

  private async writeData(id: string, data: Data): Promise<void> {
    const text = JSON.stringify(data);
    await ensureDir(this.dir(id));
    await Deno.writeTextFile(this.file(id), text);
  }

  private async readData(id: string): Promise<Data> {
    const text = await Deno.readTextFile(this.file(id));
    return JSON.parse(text);
  }

  async put(id: string, json: JsonObject): Promise<Data> {
    const data = { "@id": id, ...json };
    await this.writeData(id, data);
    return data;
  }

  async getOrFail(id: string): Promise<Data> {
    return this.readData(id);
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
    await this.writeData(id, data);
    return data;
  }

  async delete(id: string): Promise<void> {
    await Deno.remove(this.file(id))
  }
}
