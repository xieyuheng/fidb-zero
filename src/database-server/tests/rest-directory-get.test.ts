import { expect, test } from "vitest"
import type { PathEntry } from "../../path-entry"
import { prepareTestServer } from "./prepareTestServer"

test("rest-directory-get", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

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
    expect(
      Boolean(results.find(({ path }: PathEntry) => path === "posts")),
    ).toEqual(false)
  }

  await fetch(`${url}/users/1`, {
    method: "POST",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
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
    expect(
      Boolean(results.find(({ path }: PathEntry) => path === "posts")),
    ).toEqual(false)
  }

  await fetch(`${url}/posts/1`, {
    method: "POST",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
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
    expect(
      Boolean(results.find(({ path }: PathEntry) => path === "posts")),
    ).toEqual(true)
  }
})
