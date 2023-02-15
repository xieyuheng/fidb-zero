import { expect, test } from "vitest"
import * as Db from "../../db"
import { prepareTestDb } from "./prepareTestDb"

test("db-create-delete", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  const created = await Db.create(db, `users/${crypto.randomUUID()}`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(await Db.get(db, created["@path"])).toEqual(created)

  await Db.delete(db, created["@path"], created)

  expect(await Db.get(db, created["@path"])).toEqual(undefined)
})
