import { expect, test } from "vitest"
import * as Db from "../../db"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("db-find-all", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  await Db.createData(db, "users/0", { country: "China" })
  await Db.createData(db, "users/1", {})
  await Db.createData(db, "users/2", { country: "China" })

  expect(
    (
      await arrayFromAsyncIterable(
        Db.findAllData(db, "users", {
          properties: { country: "China" },
        }),
      )
    ).length,
  ).toEqual(2)

  expect(
    (
      await arrayFromAsyncIterable(
        Db.findAllData(db, "users", {
          properties: {},
        }),
      )
    ).length,
  ).toEqual(3)
})
