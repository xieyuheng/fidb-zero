import { expect, test } from "vitest"
import * as Db from "../../db"
import { prepareTestDb } from "./prepareTestDb"

test("db-create-patch-delete", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  const created = await Db.createData(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  expect(await Db.getData(db, "users/xieyuheng")).toEqual(created)

  const patched = await Db.patchData(db, "users/xieyuheng", {
    "@revision": created["@revision"],
    name: "谢宇恒",
  })

  expect(patched.name).toEqual("谢宇恒")
  expect(await Db.getData(db, "users/xieyuheng")).toEqual(patched)

  await Db.deleteData(db, patched["@path"], patched)

  expect(await Db.getData(db, "users/xieyuheng")).toEqual(undefined)
})
