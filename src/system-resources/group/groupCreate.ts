import { Database } from "../../database"
import { dataCreate } from "../../resources"
import { GroupInput } from "./Group"

export async function groupCreate(
  db: Database,
  name: string,
  group: GroupInput,
): Promise<void> {
  await dataCreate(db, `.groups/${name}`, group)
}
