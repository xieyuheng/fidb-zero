import { expect, test } from "vitest"
import * as Db from "../../db"
import { prepareTestDb } from "./prepareTestDb"

test("create-delete", async () => {
  const db = await prepareTestDb()

  const created = await Db.create(db, `users/${crypto.randomUUID()}`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(await Db.get(db, created["@path"])).toEqual(created)

  await Db.delete(db, created["@path"], created)

  expect(await Db.get(db, created["@path"])).toEqual(undefined)
})
