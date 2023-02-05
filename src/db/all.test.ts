import assert from "node:assert/strict"
import { test } from "vitest"
import * as Db from "../db"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import { db } from "./db"

test.todo("all", async () => {
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

  assert.deepStrictEqual(
    (await arrayFromAsyncIterable(Db.all(db, "users"))).length,
    3,
  )

  await Db.delAll(db, "users")
  assert.deepStrictEqual(
    (await arrayFromAsyncIterable(Db.all(db, "users"))).length,
    0,
  )
})
