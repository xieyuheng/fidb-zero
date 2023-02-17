import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("server-list-directory", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  {
    const response = await fetch(`${url}?kind=list`, {
      method: "GET",
      headers: {
        authorization,
        "content-type": "application/json",
      },
    })
    const { results } = await response.json()
    expect(Boolean(results.find(({ path }) => path === "users"))).toEqual(false)
    expect(Boolean(results.find(({ path }) => path === "posts"))).toEqual(false)
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
    const response = await fetch(`${url}?kind=list`, {
      method: "GET",
      headers: {
        authorization,
        "content-type": "application/json",
      },
    })
    const { results } = await response.json()
    expect(Boolean(results.find(({ path }) => path === "users"))).toEqual(true)
    expect(Boolean(results.find(({ path }) => path === "posts"))).toEqual(false)
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
    const response = await fetch(`${url}?kind=list`, {
      method: "GET",
      headers: {
        authorization,
        "content-type": "application/json",
      },
    })
    const { results } = await response.json()
    expect(Boolean(results.find(({ path }) => path === "users"))).toEqual(true)
    expect(Boolean(results.find(({ path }) => path === "posts"))).toEqual(true)
  }

  // Nested results.

  {
    const response = await fetch(`${url}/users/1?kind=list`, {
      method: "GET",
      headers: {
        authorization,
        "content-type": "application/json",
      },
    })
    const { results } = await response.json()
    expect(
      Boolean(results.find(({ path }) => path === "users/1/tokens")),
    ).toEqual(false)
  }

  await fetch(`${url}/users/1/tokens/1`, {
    method: "POST",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify({}),
  })

  {
    const response = await fetch(`${url}/users/1?kind=list`, {
      method: "GET",
      headers: {
        authorization,
        "content-type": "application/json",
      },
    })
    const { results } = await response.json()
    expect(
      Boolean(results.find(({ path }) => path === "users/1/tokens")),
    ).toEqual(true)
  }
})
