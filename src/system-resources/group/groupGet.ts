import { type Database } from "../../database/index.js"
import { dataGet } from "../../resources/index.js"
import { type Group, GroupSchema } from "./Group.js"

export async function groupGet(
  db: Database,
  name: string,
): Promise<Group | undefined> {
  const data = await dataGet(db, `.groups/${name}`)
  if (data === undefined) {
    return undefined
  }

  console.log(GroupSchema, data)
  return GroupSchema.validate(data)
}
