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
    const { directories } = await response.json()
    expect(directories.includes("users")).toEqual(false)
    expect(directories.includes("posts")).toEqual(false)
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
    const { directories } = await response.json()
    expect(directories.includes("users")).toEqual(true)
    expect(directories.includes("posts")).toEqual(false)
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
    const { directories } = await response.json()
    expect(directories.includes("users")).toEqual(true)
    expect(directories.includes("posts")).toEqual(true)
  }

  // Nested directories.

  {
    const response = await fetch(`${url}/users/1?kind=list`, {
      method: "GET",
      headers: {
        authorization,
        "content-type": "application/json",
      },
    })
    const { directories } = await response.json()
    expect(directories.includes("tokens")).toEqual(false)
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
    const { directories } = await response.json()
    expect(directories.includes("tokens")).toEqual(true)
  }
})
