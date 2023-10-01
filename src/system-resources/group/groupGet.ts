import { Database } from "../../database"
import { dataGet } from "../../resources"
import { Group, GroupSchema } from "./Group"

export async function groupGet(
  db: Database,
  name: string,
): Promise<Group | undefined> {
  const data = await dataGet(db, `.groups/${name}`)
  if (data === undefined) {
    return undefined
  }

  return GroupSchema.validate(data)
}
