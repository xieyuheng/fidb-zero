import { expect, test } from "vitest"
import * as Db from "../db"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("find", async () => {
  const db = await prepareTestDb()

  await Db.create(db, "users/0", { country: "China" })
  await Db.create(db, "users/1", {})
  await Db.create(db, "users/2", { country: "China" })

  expect(
    (
      await arrayFromAsyncIterable(
        Db.find(db, "users", {
          properties: { country: "China" },
        }),
      )
    ).length,
  ).toEqual(2)

  expect(
    (
      await arrayFromAsyncIterable(
        Db.find(db, "users", {
          properties: {},
        }),
      )
    ).length,
  ).toEqual(3)
})
