import { expect, test } from "vitest"
import type { PathEntry } from "../../path-entry"
import { prepareTestServer } from "./prepareTestServer"

test("database-server-directory-delete", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  await fetch(`${url}/users?kind=directory`, {
    method: "POST",
    headers: {
      authorization,
    },
  })

  {
    const response = await fetch(`${url}?kind=directory`, {
      method: "GET",
      headers: {
        authorization,
      },
    })
    const results = await response.json()
    expect(
      Boolean(results.find(({ path }: PathEntry) => path === "users")),
    ).toEqual(true)
  }

  await fetch(`${url}/users?kind=directory`, {
    method: "DELETE",
    headers: {
      authorization,
    },
  })

  {
    const response = await fetch(`${url}?kind=directory`, {
      method: "GET",
      headers: {
        authorization,
      },
    })
    const results = await response.json()
    expect(
      Boolean(results.find(({ path }: PathEntry) => path === "users")),
    ).toEqual(false)
  }
})
