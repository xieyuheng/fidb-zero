import { expect, test } from "vitest"
import * as Db from "."
import { arrayFromAsyncIterable } from "../utils/arrayFromAsyncIterable"
import { prepareTest } from "./test-utils"

test("find", async () => {
  const { db } = await prepareTest()

  expect(await arrayFromAsyncIterable(Db.directories(db))).toEqual([])

  await Db.create(db, { "@id": "users/1" })
  await Db.create(db, { "@id": "users/2" })
  await Db.create(db, { "@id": "users/3" })

  expect(await arrayFromAsyncIterable(Db.directories(db))).toEqual(["users"])

  // NOTE The sub-directories are not included.
  await Db.create(db, { "@id": "users/projects/1" })
  await Db.create(db, { "@id": "users/projects/2" })

  expect(await arrayFromAsyncIterable(Db.directories(db))).toEqual(["users"])

  await Db.create(db, { "@id": "posts/1" })
  await Db.create(db, { "@id": "posts/2" })

  expect(await arrayFromAsyncIterable(Db.directories(db))).toEqual([
    "users",
    "posts",
  ])
})
