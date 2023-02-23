import { expect, test } from "vitest"
import * as Db from "../../db"
import type { PathEntry } from "../../path-entry"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("db-delete-directory", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  expect((await arrayFromAsyncIterable(Db.listAll(db, ""))).length).toEqual(0)

  await Db.createDirectory(db, "users")

  expect((await arrayFromAsyncIterable(Db.listAll(db, ""))).length).toEqual(1)
  expect(
    Boolean(
      (await arrayFromAsyncIterable(Db.listAll(db, ""))).find(
        ({ path }: PathEntry) => path === "users",
      ),
    ),
  ).toEqual(true)

  await Db.deleteDirectory(db, "users")

  expect((await arrayFromAsyncIterable(Db.listAll(db, ""))).length).toEqual(0)
})
