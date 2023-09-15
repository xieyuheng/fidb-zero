import { expect, test } from "vitest"
import * as Db from ".."
import type { PathEntry } from "../../path-entry"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("db-directory-list-all", async ({ meta }) => {
  const { db } = await prepareTestDb(meta)

  expect(
    (await arrayFromAsyncIterable(Db.directoryListAll(db, ""))).filter(
      (entry) => !(entry.kind === "File" && entry.path === "database.json"),
    ).length,
  ).toEqual(0)

  await Db.dataCreate(db, "users/1", {})
  await Db.dataCreate(db, "users/2", {})
  await Db.dataCreate(db, "users/3", {})

  expect(
    (await arrayFromAsyncIterable(Db.directoryListAll(db, ""))).filter(
      (entry) => !(entry.kind === "File" && entry.path === "database.json"),
    ).length,
  ).toEqual(1)

  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.directoryListAll(db, ""))).find(
        ({ path }: PathEntry) => path === "users",
      ),
    ),
  ).toEqual(true)

  // The sub-directories are not included.
  expect(
    (await arrayFromAsyncIterable(Db.directoryListAll(db, ""))).filter(
      (entry) => !(entry.kind === "File" && entry.path === "database.json"),
    ).length,
  ).toEqual(1)

  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.directoryListAll(db, ""))).find(
        ({ path }: PathEntry) => path === "users",
      ),
    ),
  ).toEqual(true)

  await Db.dataCreate(db, "posts/1", {})
  await Db.dataCreate(db, "posts/2", {})

  expect(
    (await arrayFromAsyncIterable(Db.directoryListAll(db, ""))).filter(
      (entry) => !(entry.kind === "File" && entry.path === "database.json"),
    ).length,
  ).toEqual(2)

  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.directoryListAll(db, ""))).find(
        ({ path }: PathEntry) => path === "users",
      ),
    ),
  ).toEqual(true)
  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.directoryListAll(db, ""))).find(
        ({ path }: PathEntry) => path === "posts",
      ),
    ),
  ).toEqual(true)
})
