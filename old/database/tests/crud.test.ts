import { assertEquals } from "std/testing/asserts.ts"
import { db } from "./utils.ts"

Deno.test("crud", async () => {
  const putted = await db.put("users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  {
    const gotten = await db.get("users/xieyuheng")
    assertEquals(gotten, putted)
  }

  const patched = await db.patch("users/xieyuheng", {
    name: "谢宇恒",
  })

  assertEquals(patched.name, "谢宇恒")

  {
    const gotten = await db.get("users/xieyuheng")
    assertEquals(gotten, patched)
  }

  await db.delete("users/xieyuheng")

  {
    const gotten = await db.get("users/xieyuheng")
    assertEquals(gotten, undefined)
  }
})
