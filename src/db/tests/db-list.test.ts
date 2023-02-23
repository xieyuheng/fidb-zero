import { expect, test } from "vitest"
import * as Db from ".."
import type { PathEntry } from "../../path-entry"
import { arrayFromAsyncIterable } from "../../utils/arrayFromAsyncIterable"
import { prepareTestDb } from "./prepareTestDb"

test("db-list", async ({ meta }) => {
  const db = await prepareTestDb(meta)

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.listDirectory(db, "", { page: 1, size: 2 }),
    )

    expect(pathEntries.length).toEqual(0)
  }

  await Db.createData(db, "users/1", {})
  await Db.createData(db, "users/2", {})
  await Db.createData(db, "users/3", {})

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.listDirectory(db, "", { page: 1, size: 2 }),
    )

    expect(pathEntries.length).toEqual(1)
    expect(
      Boolean(pathEntries.find(({ path }: PathEntry) => path === "users")),
    ).toEqual(true)
  }

  await Db.createData(db, "posts/1", {})
  await Db.createData(db, "posts/2", {})

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.listDirectory(db, "", { page: 1, size: 2 }),
    )

    expect(pathEntries.length).toEqual(2)
    expect(
      Boolean(pathEntries.find(({ path }: PathEntry) => path === "users")),
    ).toEqual(true)
    expect(
      Boolean(pathEntries.find(({ path }: PathEntry) => path === "posts")),
    ).toEqual(true)
  }

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.listDirectory(db, "", { page: 1, size: 1 }),
    )

    expect(pathEntries.length).toEqual(1)
    expect(
      Boolean(
        pathEntries.find(
          ({ path }: PathEntry) => path === "users" || path === "posts",
        ),
      ),
    ).toEqual(true)
  }

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.listDirectory(db, "", { page: 2, size: 1 }),
    )

    expect(pathEntries.length).toEqual(1)
    expect(
      Boolean(
        pathEntries.find(
          ({ path }: PathEntry) => path === "users" || path === "posts",
        ),
      ),
    ).toEqual(true)
  }

  {
    const pathEntries = await arrayFromAsyncIterable(
      Db.listDirectory(db, "", { page: 3, size: 1 }),
    )

    expect(pathEntries.length).toEqual(0)
  }
})
