import { expect, test } from "vitest"
import * as Db from "../../db"
import { prepareTestDb } from "./prepareTestDb"

test("create-put-delete", async ({ meta }) => {
  const db = await prepareTestDb(meta.name)

  const created = await Db.create(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(await Db.get(db, "users/xieyuheng")).toEqual(created)

  const putted = await Db.put(db, created["@path"], {
    ...created,
    username: "xieyuheng",
    name: "谢宇恒",
  })

  expect(await Db.get(db, "users/xieyuheng")).toEqual(putted)

  await Db.delete(db, putted["@path"], putted)

  expect(await Db.get(db, "users/xieyuheng"), undefined).toEqual(undefined)
})
