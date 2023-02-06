import { expect, test } from "vitest"
import * as Db from "../db"
import { prepareTestDb } from "./test-utils"

test("create-put-delete", async () => {
  const db = await prepareTestDb()

  const created = await Db.create(db, {
    "@id": "users/xieyuheng",
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  expect(await Db.get(db, "users/xieyuheng")).toEqual(created)

  const putted = await Db.put(db, {
    "@id": "users/xieyuheng",
    "@revision": created["@revision"],
    username: "xieyuheng",
    name: "谢宇恒",
  })
  expect(await Db.get(db, "users/xieyuheng")).toEqual(putted)

  await Db.delete(db, putted)
  expect(await Db.get(db, "users/xieyuheng"), undefined).toEqual(undefined)
})
