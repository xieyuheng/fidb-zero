import assert from "node:assert/strict"
import { test } from "vitest"
import * as Db from "../db"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import { prepareTest } from "./test-utils"

test("find", async () => {
  const { db } = await prepareTest()

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

  assert.deepStrictEqual(
    (
      await arrayFromAsyncIterable(
        Db.find(db, "users", {
          properties: { country: "China" },
        }),
      )
    ).length,
    2,
  )

  await Db.delAll(db, "users")
})
