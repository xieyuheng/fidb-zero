import { expect, test } from "vitest"
import * as Db from "../db"
import { prepareTest } from "./test-utils"

test("create-remove", async () => {
  const { db } = await prepareTest()

  const created = await Db.create(db, {
    "@id": `users/${crypto.randomUUID()}`,
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  expect(await Db.get(db, created["@id"])).toEqual(created)

  await Db.delete(db, created)
  expect(await Db.get(db, created["@id"])).toEqual(undefined)
})
