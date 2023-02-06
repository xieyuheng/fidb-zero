import { expect, test } from "vitest"
import * as Db from "."
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("find", async () => {
  const db = await prepareTestDb()

  await Db.create(db, {
    "@id": "users/xieyuheng",
    username: "xieyuheng",
    name: "Xie Yuheng",
    country: "China",
  })

  await Db.create(db, {
    "@id": "users/cicada-lang",
    username: "cicada-lang",
    name: "Cicada Language",
  })

  await Db.create(db, {
    "@id": "users/fidb",
    username: "fidb",
    name: "FiDB",
    country: "China",
  })

  expect(
    (
      await arrayFromAsyncIterable(
        Db.find(db, "users", { properties: { country: "China" } }),
      )
    ).length,
  ).toEqual(2)

  expect(
    (await arrayFromAsyncIterable(Db.find(db, "users", { properties: {} })))
      .length,
  ).toEqual(3)
})
