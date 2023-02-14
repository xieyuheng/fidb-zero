import { expect, test } from "vitest"
import { serveTestDb } from "./serveTestDb"

test("serve-list-directory", async () => {
  const { url, db } = await serveTestDb()

  {
    const response = await fetch(`${url}?kind=list`)
    const { directories } = await response.json()
    expect(directories.length).toEqual(0)
  }

  await fetch(`${url}/users/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  {
    const response = await fetch(`${url}?kind=list`)
    const { directories } = await response.json()
    expect(directories.length).toEqual(1)
    expect(directories.includes("users")).toEqual(true)
  }

  await fetch(`${url}/users/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  {
    const response = await fetch(`${url}?kind=list`)
    const { directories } = await response.json()
    expect(directories.length).toEqual(1)
    expect(directories.includes("users")).toEqual(true)
  }

  await fetch(`${url}/posts/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  {
    const response = await fetch(`${url}?kind=list`)
    const { directories } = await response.json()
    expect(directories.length).toEqual(2)
    expect(directories.includes("users")).toEqual(true)
    expect(directories.includes("posts")).toEqual(true)
  }

  await fetch(`${url}/posts/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  {
    const response = await fetch(`${url}?kind=list`)
    const { directories } = await response.json()
    expect(directories.length).toEqual(2)
    expect(directories.includes("users")).toEqual(true)
    expect(directories.includes("posts")).toEqual(true)
  }

  // Nested directories.

  await fetch(`${url}/users/1/tokens/1`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  {
    const response = await fetch(`${url}/users/1?kind=list`)
    const { directories } = await response.json()
    expect(directories.length).toEqual(1)
    expect(directories.includes("tokens")).toEqual(true)
  }

  await fetch(`${url}/users/1/tokens/2`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  })

  {
    const response = await fetch(`${url}/users/1?kind=list`)
    const { directories } = await response.json()
    expect(directories.length).toEqual(1)
    expect(directories.includes("tokens")).toEqual(true)
  }
})
