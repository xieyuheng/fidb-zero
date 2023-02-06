import { expect, test } from "vitest"
import * as Db from "."
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("listDirectories", async () => {
  const db = await prepareTestDb()

  expect(await arrayFromAsyncIterable(Db.listDirectories(db))).toEqual([])

  await Db.create(db, { "@id": "users/1" })
  await Db.create(db, { "@id": "users/2" })
  await Db.create(db, { "@id": "users/3" })

  expect(await arrayFromAsyncIterable(Db.listDirectories(db))).toEqual([
    "users",
  ])

  // NOTE The sub-directories are not included.
  await Db.create(db, { "@id": "users/projects/1" })
  await Db.create(db, { "@id": "users/projects/2" })

  expect(await arrayFromAsyncIterable(Db.listDirectories(db))).toEqual([
    "users",
  ])

  await Db.create(db, { "@id": "posts/1" })
  await Db.create(db, { "@id": "posts/2" })

  expect(await arrayFromAsyncIterable(Db.listDirectories(db))).toEqual([
    "users",
    "posts",
  ])
})
