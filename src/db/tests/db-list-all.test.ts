import { expect, test } from "vitest"
import * as Db from ".."
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import type { PathEntry } from "../PathEntry"
import { prepareTestDb } from "./prepareTestDb"

test("db-list-all", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  expect((await arrayFromAsyncIterable(Db.listAll(db))).length).toEqual(0)

  await Db.create(db, "users/1", {})
  await Db.create(db, "users/2", {})
  await Db.create(db, "users/3", {})

  expect((await arrayFromAsyncIterable(Db.listAll(db))).length).toEqual(1)
  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.listAll(db))).find(
        ({ path }: PathEntry) => path === "users",
      ),
    ),
  ).toEqual(true)

  // NOTE The sub-directories are not included.
  await Db.create(db, "users/projects/1", {})
  await Db.create(db, "users/projects/2", {})

  expect((await arrayFromAsyncIterable(Db.listAll(db))).length).toEqual(1)
  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.listAll(db))).find(
        ({ path }: PathEntry) => path === "users",
      ),
    ),
  ).toEqual(true)

  await Db.create(db, "posts/1", {})
  await Db.create(db, "posts/2", {})

  expect((await arrayFromAsyncIterable(Db.listAll(db))).length).toEqual(2)
  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.listAll(db))).find(
        ({ path }: PathEntry) => path === "users",
      ),
    ),
  ).toEqual(true)
  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.listAll(db))).find(
        ({ path }: PathEntry) => path === "posts",
      ),
    ),
  ).toEqual(true)
})
