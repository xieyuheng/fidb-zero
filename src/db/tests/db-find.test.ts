import { expect, test } from "vitest"
import * as Db from "../../db"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("db-find", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  await Db.createData(db, "users/0", { country: "China" })
  await Db.createData(db, "users/1", {})
  await Db.createData(db, "users/2", { country: "China" })
  await Db.createData(db, "users/3", {})
  await Db.createData(db, "users/4", { country: "China" })
  await Db.createData(db, "users/5", {})
  await Db.createData(db, "users/6", { country: "China" })
  await Db.createData(db, "users/7", {})
  await Db.createData(db, "users/8", { country: "China" })
  await Db.createData(db, "users/9", {})

  expect(
    (
      await arrayFromAsyncIterable(
        Db.findData(db, "users", {
          page: 1,
          size: 3,
          properties: { country: "China" },
        }),
      )
    ).length,
  ).toEqual(3)

  expect(
    (
      await arrayFromAsyncIterable(
        Db.findData(db, "users", {
          page: 2,
          size: 3,
          properties: { country: "China" },
        }),
      )
    ).length,
  ).toEqual(2)

  expect(
    (
      await arrayFromAsyncIterable(
        Db.findData(db, "users", {
          page: 3,
          size: 3,
          properties: { country: "China" },
        }),
      )
    ).length,
  ).toEqual(0)
})
