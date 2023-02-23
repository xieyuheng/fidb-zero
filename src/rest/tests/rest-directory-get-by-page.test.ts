import { expect, test } from "vitest"
import type { PathEntry } from "../../path-entry"
import { prepareTestServer } from "./prepareTestServer"

test("rest-directory-get-by-page", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  await fetch(`${url}/projects/1/users/1`, {
    method: "POST",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
  })

  await fetch(`${url}/projects/1/posts/1`, {
    method: "POST",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
  })

  {
    const response = await fetch(
      `${url}/projects/1?kind=directory&page=1&size=1`,
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )
    const results = await response.json()
    expect(results.length).toEqual(1)
    expect(
      Boolean(
        results.find(
          ({ path }: PathEntry) =>
            path === "projects/1/users" || path === "projects/1/posts",
        ),
      ),
    ).toEqual(true)
  }

  {
    const response = await fetch(
      `${url}/projects/1?kind=directory&page=2&size=1`,
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )
    const results = await response.json()
    expect(results.length).toEqual(1)
    expect(
      Boolean(
        results.find(
          ({ path }: PathEntry) =>
            path === "projects/1/users" || path === "projects/1/posts",
        ),
      ),
    ).toEqual(true)
  }

  {
    const response = await fetch(
      `${url}/projects/1?kind=directory&page=3&size=1`,
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )
    const results = await response.json()
    expect(results.length).toEqual(0)
  }
})
