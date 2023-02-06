import { expect, test } from "vitest"
import * as Db from "."
import { prepareTest } from "./test-utils"

test("create-patch-delete", async () => {
  const { db } = await prepareTest()

  const putted = await Db.put(db, {
    "@id": "users/xieyuheng",
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  expect(await Db.get(db, "users/xieyuheng")).toEqual(putted)

  const patched = await Db.patch(db, {
    "@id": "users/xieyuheng",
    "@revision": putted["@revision"],
    name: "谢宇恒",
  })
  expect(patched.name).toEqual("谢宇恒")
  expect(await Db.get(db, "users/xieyuheng")).toEqual(patched)

  await Db.delete(db, patched)
  expect(await Db.get(db, "users/xieyuheng")).toEqual(undefined)
})
