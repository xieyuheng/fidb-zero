import assert from "node:assert/strict"
import test from "node:test"
import * as Db from "."
import { db } from "./db"

test("find", async () => {
  await Db.put(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
    country: "China",
  })

  await Db.put(db, "users/cicada-lang", {
    username: "cicada-lang",
    name: "Cicada Language",
  })

  await Db.put(db, "users/fidb", {
    username: "fidb",
    name: "FiDB",
    country: "China",
  })

  {
    const results = []
    for await (const data of Db.find(db, "users", {
      properties: { country: "China" },
    })) {
      results.push(data)
    }

    assert.deepStrictEqual(results.length, 2)
  }

  await Db.removeAll(db, "users")
})
