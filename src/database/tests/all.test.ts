import assert from "node:assert/strict"
import test from "node:test"
import { db } from "./utils"

test("all", async () => {
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

    assert.deepStrictEqual(results.length, 3)
  }

  await db.deleteAll("users")

  {
    const results = []
    for await (const data of db.all("users")) {
      results.push(data)
    }

    assert.deepStrictEqual(results.length, 0)
  }
})
