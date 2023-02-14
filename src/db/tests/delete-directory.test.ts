import { expect, test } from "vitest"
import * as Db from "../../db"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("delete-directory", async ({ meta }) => {
  const db = await prepareTestDb(meta.name)

  expect((await arrayFromAsyncIterable(Db.listDirectories(db))).length).toEqual(
    0,
  )

  await Db.createDirectory(db, "users")

  expect((await arrayFromAsyncIterable(Db.listDirectories(db))).length).toEqual(
    1,
  )
  expect(
    (await arrayFromAsyncIterable(Db.listDirectories(db))).includes("users"),
  ).toEqual(true)

  await Db.deleteDirectory(db, "users")

  expect((await arrayFromAsyncIterable(Db.listDirectories(db))).length).toEqual(
    0,
  )
})
