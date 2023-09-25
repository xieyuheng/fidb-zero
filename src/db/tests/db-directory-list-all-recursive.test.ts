import { expect, test } from "vitest"
import * as Db from ".."
import { PathEntry } from "../../path-entry"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("db-directory-list-all-recursive", async ({ meta }) => {
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

  await Db.dataCreate(db, "users/1/projects/1", {})
  await Db.dataCreate(db, "users/1/projects/2", {})

  // The `recursive` option will include all sub-directories.

  const pathEntries = await arrayFromAsyncIterable(
    Db.directoryListAll(db, "", { recursive: true }),
  )

  expect(
    Boolean(pathEntries.find(({ path }: PathEntry) => path === "users")),
  ).toEqual(true)
  expect(
    Boolean(
      pathEntries.find(({ path }: PathEntry) => path === "users/1/projects"),
    ),
  ).toEqual(true)
})
