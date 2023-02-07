import { expect, test } from "vitest"
import * as Db from "../db"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("findPage", async () => {
  const db = await prepareTestDb()

  await Db.create(db, { "@id": "users/0", country: "China" })
  await Db.create(db, { "@id": "users/1" })
  await Db.create(db, { "@id": "users/2", country: "China" })
  await Db.create(db, { "@id": "users/3" })
  await Db.create(db, { "@id": "users/4", country: "China" })
  await Db.create(db, { "@id": "users/5" })
  await Db.create(db, { "@id": "users/6", country: "China" })
  await Db.create(db, { "@id": "users/7" })
  await Db.create(db, { "@id": "users/8", country: "China" })
  await Db.create(db, { "@id": "users/9" })

  expect(
    (
      await arrayFromAsyncIterable(
        Db.findPage(db, "users", {
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
        Db.findPage(db, "users", {
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
        Db.findPage(db, "users", {
          page: 3,
          size: 3,
          properties: { country: "China" },
        }),
      )
    ).length,
  ).toEqual(0)
})
