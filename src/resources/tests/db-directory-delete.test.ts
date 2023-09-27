import { expect, test } from "vitest"
import * as Db from ".."
import { PathEntry } from "../../path-entry"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("db-directory-delete", async ({ meta }) => {
  const { db } = await prepareTestDb(meta)

  expect(
    (await arrayFromAsyncIterable(Db.directoryListAll(db, ""))).filter(
      (entry) => !(entry.kind === "File" && entry.path === "database.json"),
    ).length,
  ).toEqual(0)

  await Db.directoryCreate(db, "users")

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

  await Db.directoryDelete(db, "users")

  expect(
    (await arrayFromAsyncIterable(Db.directoryListAll(db, ""))).filter(
      (entry) => !(entry.kind === "File" && entry.path === "database.json"),
    ).length,
  ).toEqual(0)
})
