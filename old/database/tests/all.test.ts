import { assertEquals } from "std/testing/asserts.ts"
import { resolve } from "std/path/mod.ts"
import { db } from "./utils.ts"

Deno.test("all", async () => {
  await db.put("users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await db.put("users/cicada-lang", {
    username: "cicada-lang",
    name: "Cicada Language",
  })

  await db.put("users/fidb", {
    username: "fidb",
    name: "FiDB",
  })

  {
    const results = []
    for await (const data of db.all("users")) {
      results.push(data)
    }

    assertEquals(results.length, 3)
  }

  await db.deleteAll("users")

  {
    const results = []
    for await (const data of db.all("users")) {
      results.push(data)
    }

    assertEquals(results.length, 0)
  }
})
