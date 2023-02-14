import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("server-create-directory", async () => {
  const { url, authorization } = await prepareTestServer()

  {
    const response = await fetch(`${url}/?kind=list`, {
      method: "GET",
      headers: {
        authorization,
      },
    })
    const { directories } = await response.json()
    expect(directories.includes("users")).toEqual(false)
  }

  await fetch(`${url}/users/?kind=directory`, {
    method: "POST",
    headers: { authorization },
  })

  {
    const response = await fetch(`${url}/?kind=list`, {
      method: "GET",
      headers: {
        authorization,
      },
    })
    const { directories } = await response.json()
    expect(directories.includes("users")).toEqual(true)
  }
})