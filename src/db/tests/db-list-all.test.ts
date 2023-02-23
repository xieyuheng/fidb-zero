import { expect, test } from "vitest"
import * as Db from ".."
import type { PathEntry } from "../../path-entry"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("db-list-all", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  expect(
    (await arrayFromAsyncIterable(Db.listDirectoryAll(db, ""))).length,
  ).toEqual(0)

  await Db.createData(db, "users/1", {})
  await Db.createData(db, "users/2", {})
  await Db.createData(db, "users/3", {})

  expect(
    (await arrayFromAsyncIterable(Db.listDirectoryAll(db, ""))).length,
  ).toEqual(1)
  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.listDirectoryAll(db, ""))).find(
        ({ path }: PathEntry) => path === "users",
      ),
    ),
  ).toEqual(true)

  // NOTE The sub-directories are not included.
  await Db.createData(db, "users/projects/1", {})
  await Db.createData(db, "users/projects/2", {})

  expect(
    (await arrayFromAsyncIterable(Db.listDirectoryAll(db, ""))).length,
  ).toEqual(1)
  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.listDirectoryAll(db, ""))).find(
        ({ path }: PathEntry) => path === "users",
      ),
    ),
  ).toEqual(true)

  await Db.createData(db, "posts/1", {})
  await Db.createData(db, "posts/2", {})

  expect(
    (await arrayFromAsyncIterable(Db.listDirectoryAll(db, ""))).length,
  ).toEqual(2)
  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.listDirectoryAll(db, ""))).find(
        ({ path }: PathEntry) => path === "users",
      ),
    ),
  ).toEqual(true)
  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.listDirectoryAll(db, ""))).find(
        ({ path }: PathEntry) => path === "posts",
      ),
    ),
  ).toEqual(true)
})
