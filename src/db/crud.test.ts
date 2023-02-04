import assert from "node:assert/strict"
import test from "node:test"
import * as Db from "."
import { db } from "./db"

test("crud", async () => {
  const putted = await Db.put(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  {
    const gotten = await Db.get(db, "users/xieyuheng")
    assert.deepStrictEqual(gotten, putted)
  }

  const patched = await Db.patch(db, "users/xieyuheng", {
    name: "谢宇恒",
  })

  assert.deepStrictEqual(patched.name, "谢宇恒")

  {
    const gotten = await Db.get(db, "users/xieyuheng")
    assert.deepStrictEqual(gotten, patched)
  }

  await Db.remove(db, "users/xieyuheng")

  {
    const gotten = await Db.get(db, "users/xieyuheng")
    assert.deepStrictEqual(gotten, undefined)
  }
})
