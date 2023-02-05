import * as UUID from "uuid"
import { expect, test } from "vitest"
import * as Db from "../db"
import { prepareTest } from "./test-utils"

test("create-remove", async () => {
  const { db } = await prepareTest()

  const created = await Db.create(db, "users", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  const [_prefix, uuid] = created["@id"].split("/")
  expect(UUID.validate(uuid)).toBe(true)
  expect(await Db.get(db, created["@id"])).toEqual(created)

  await Db.delete(db, created["@id"], created)
  expect(await Db.get(db, created["@id"])).toBe(undefined)
})
