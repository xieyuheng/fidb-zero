import { expect, test } from "vitest"
import * as Db from "../../db"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("list-directories", async ({ meta }) => {
  const db = await prepareTestDb(meta.name)

  expect((await arrayFromAsyncIterable(Db.listDirectories(db))).length).toEqual(
    0,
  )

  await Db.create(db, "users/1", {})
  await Db.create(db, "users/2", {})
  await Db.create(db, "users/3", {})

  expect((await arrayFromAsyncIterable(Db.listDirectories(db))).length).toEqual(
    1,
  )
  expect(
    (await arrayFromAsyncIterable(Db.listDirectories(db))).includes("users"),
  ).toEqual(true)

  // NOTE The sub-directories are not included.
  await Db.create(db, "users/projects/1", {})
  await Db.create(db, "users/projects/2", {})

  expect((await arrayFromAsyncIterable(Db.listDirectories(db))).length).toEqual(
    1,
  )
  expect(
    (await arrayFromAsyncIterable(Db.listDirectories(db))).includes("users"),
  ).toEqual(true)

  await Db.create(db, "posts/1", {})
  await Db.create(db, "posts/2", {})

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
