import { type Database } from "../../database/index.js"
import { dataCreate } from "../../resources/index.js"
import { type GroupInput } from "./Group.js"

export async function groupCreate(
  db: Database,
  name: string,
  group: GroupInput,
): Promise<void> {
  await dataCreate(db, `.groups/${name}`, group)
}
