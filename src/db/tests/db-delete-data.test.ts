import { expect, test } from "vitest"
import * as Db from ".."
import { randomHexString } from "../../utils/randomHexString"
import { prepareTestDb } from "./prepareTestDb"

test("db-delete-data", async ({ meta }) => {
  const { db } = await prepareTestDb(meta)

  const created = await Db.createData(db, `users/${randomHexString(10)}`, {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(await Db.getData(db, created["@path"])).toEqual(created)

  await Db.deleteData(db, created["@path"], created)

  expect(await Db.getData(db, created["@path"])).toEqual(undefined)
})
