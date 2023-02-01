import { assertEquals } from "std/testing/asserts.ts"
import { db } from "./utils.ts"

Deno.test("find", async () => {
  await db.put("users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
    country: "China",
  })

  await db.put("users/cicada-lang", {
    username: "cicada-lang",
    name: "Cicada Language",
  })

  await db.put("users/fidb", {
    username: "fidb",
    name: "FiDB",
    country: "China",
  })

  {
    const results = []
    for await (
      const data of db.find("users", {
        properties: { country: "China" },
      })
    ) {
      results.push(data)
    }

    assertEquals(results.length, 2)
  }

  await db.deleteAll("users")
})
