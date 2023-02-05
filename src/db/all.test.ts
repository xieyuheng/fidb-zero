import { expect, test } from "vitest"
import * as Db from "../db"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import { prepareTest } from "./test-utils"

test("all", async () => {
  const { db } = await prepareTest()

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

  expect((await arrayFromAsyncIterable(Db.all(db, "users"))).length).toEqual(3)

  await Db.delAll(db, "users")
  expect((await arrayFromAsyncIterable(Db.all(db, "users"))).length).toEqual(0)
})
