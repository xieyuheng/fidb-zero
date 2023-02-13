import { expect, test } from "vitest"
import * as Db from "../db"
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("listDirectories", async () => {
  const db = await prepareTestDb()

  expect((await arrayFromAsyncIterable(Db.listDirectories(db))).length).toEqual(
    0,
  )

  await Db.create(db, { "@path": "users/1" })
  await Db.create(db, { "@path": "users/2" })
  await Db.create(db, { "@path": "users/3" })

  expect((await arrayFromAsyncIterable(Db.listDirectories(db))).length).toEqual(
    1,
  )
  expect(
    (await arrayFromAsyncIterable(Db.listDirectories(db))).includes("users"),
  ).toEqual(true)

  // NOTE The sub-directories are not included.
  await Db.create(db, { "@path": "users/projects/1" })
  await Db.create(db, { "@path": "users/projects/2" })

  expect((await arrayFromAsyncIterable(Db.listDirectories(db))).length).toEqual(
    1,
  )
  expect(
    (await arrayFromAsyncIterable(Db.listDirectories(db))).includes("users"),
  ).toEqual(true)

  await Db.create(db, { "@path": "posts/1" })
  await Db.create(db, { "@path": "posts/2" })

  expect((await arrayFromAsyncIterable(Db.listDirectories(db))).length).toEqual(
    2,
  )
  expect(
    (await arrayFromAsyncIterable(Db.listDirectories(db))).includes("users"),
  ).toEqual(true)
  expect(
    (await arrayFromAsyncIterable(Db.listDirectories(db))).includes("posts"),
  ).toEqual(true)
})
