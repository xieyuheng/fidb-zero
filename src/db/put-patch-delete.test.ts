import assert from "node:assert/strict"
import test from "node:test"
import * as Db from "."
import { db } from "./db"

test("put-patch-delete", async () => {
  const putted = await Db.put(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })
  assert.deepStrictEqual(await Db.get(db, "users/xieyuheng"), putted)

  const patched = await Db.patch(db, "users/xieyuheng", { name: "谢宇恒" })
  assert.deepStrictEqual(patched.name, "谢宇恒")
  assert.deepStrictEqual(await Db.get(db, "users/xieyuheng"), patched)

  await Db.del(db, "users/xieyuheng")
  assert.deepStrictEqual(await Db.get(db, "users/xieyuheng"), undefined)
})
