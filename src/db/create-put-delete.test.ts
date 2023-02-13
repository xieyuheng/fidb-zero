import { expect, test } from "vitest"
import * as Db from "../db"
import { prepareTestDb } from "./prepareTestDb"

test("create-put-delete", async () => {
  const db = await prepareTestDb()

  const created = await Db.create(db, {
    "@path": "users/xieyuheng",
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(await Db.get(db, "users/xieyuheng")).toEqual(created)

  const putted = await Db.put(db, {
    ...created,
    username: "xieyuheng",
    name: "谢宇恒",
  })

  expect(await Db.get(db, "users/xieyuheng")).toEqual(putted)

  await Db.delete(db, putted)

  expect(await Db.get(db, "users/xieyuheng"), undefined).toEqual(undefined)
})
