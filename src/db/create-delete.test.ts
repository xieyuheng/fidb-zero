import { expect, test } from "vitest"
import * as Db from "../db"
import { prepareTestDb } from "./prepareTestDb"

test("create-delete", async () => {
  const db = await prepareTestDb()

  const created = await Db.create(db, {
    "@id": `users/${crypto.randomUUID()}`,
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(await Db.get(db, created["@id"])).toEqual(created)

  await Db.delete(db, created)

  expect(await Db.get(db, created["@id"])).toEqual(undefined)
})
