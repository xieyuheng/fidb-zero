import assert from "node:assert/strict"
import test from "node:test"
import * as Db from "."
import { db } from "./db"

test("all", async () => {
  await Db.put(db, "users/xieyuheng", {
    username: "xieyuheng",
    name: "Xie Yuheng",
  })

  await Db.put(db, "users/cicada-lang", {
    username: "cicada-lang",
    name: "Cicada Language",
  })

  await Db.put(db, "users/fidb", {
    username: "fidb",
    name: "FiDB",
  })

  {
    const results = []
    for await (const data of Db.all(db, "users")) {
      results.push(data)
    }

    assert.deepStrictEqual(results.length, 3)
  }

  await Db.removeAll(db, "users")

  {
    const results = []
    for await (const data of Db.all(db, "users")) {
      results.push(data)
    }

    assert.deepStrictEqual(results.length, 0)
  }
})
