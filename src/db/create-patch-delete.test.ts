import { expect, test } from "vitest"
import * as Db from "../db"
import { prepareTestDb } from "./prepareTestDb"

test("create-patch-delete", async () => {
  const db = await prepareTestDb()

  const created = await Db.create(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(await Db.get(db, "users/xieyuheng")).toEqual(created)

  const patched = await Db.patch(db, "users/xieyuheng", {
    "@revision": created["@revision"],
    name: "谢宇恒",
  })

  expect(patched.name).toEqual("谢宇恒")
  expect(await Db.get(db, "users/xieyuheng")).toEqual(patched)

  await Db.delete(db, patched)

  expect(await Db.get(db, "users/xieyuheng")).toEqual(undefined)
})
