import { expect, test } from "vitest"
import * as Db from "."
import { db } from "./test-utils"

test("put-patch-delete", async () => {
  const putted = await Db.put(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  expect(await Db.get(db, "users/xieyuheng")).toEqual(putted)

  const patched = await Db.patch(db, "users/xieyuheng", {
    "@revision": putted["@revision"],
    name: "谢宇恒",
  })
  expect(patched.name).toEqual("谢宇恒")
  expect(await Db.get(db, "users/xieyuheng")).toEqual(patched)

  await Db.del(db, "users/xieyuheng")
  expect(await Db.get(db, "users/xieyuheng")).toEqual(undefined)
})
