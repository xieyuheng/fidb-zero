import assert from "node:assert/strict"
import test from "node:test"
import { db } from "./utils"

test("crud", async () => {
  const putted = await db.put("users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  {
    const gotten = await db.get("users/xieyuheng")
    assert.deepStrictEqual(gotten, putted)
  }

  const patched = await db.patch("users/xieyuheng", {
    name: "谢宇恒",
  })

  assert.deepStrictEqual(patched.name, "谢宇恒")

  {
    const gotten = await db.get("users/xieyuheng")
    assert.deepStrictEqual(gotten, patched)
  }

  await db.delete("users/xieyuheng")

  {
    const gotten = await db.get("users/xieyuheng")
    assert.deepStrictEqual(gotten, undefined)
  }
})
