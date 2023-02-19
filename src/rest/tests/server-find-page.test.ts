import qs from "qs"
import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("server-find-page", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  const array = [
    { "@path": "users/0", country: "China" },
    { "@path": "users/1" },
    { "@path": "users/2", country: "China" },
    { "@path": "users/3" },
    { "@path": "users/4", country: "China" },
    { "@path": "users/5" },
    { "@path": "users/6", country: "China" },
    { "@path": "users/7" },
    { "@path": "users/8", country: "China" },
    { "@path": "users/9" },
  ]

  for (const data of array) {
    await fetch(`${url}/${data["@path"]}`, {
      method: "POST",
      headers: {
        authorization,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

  {
    const response = await fetch(
      `${url}/users?kind=data-find&${qs.stringify({
        page: 1,
        size: 3,
        properties: {
          country: "China",
        },
      })}`,
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    expect((await response.json()).length).toEqual(3)
  }

  {
    const response = await fetch(
      `${url}/users?kind=data-find&${qs.stringify({
        page: 2,
        size: 3,
        properties: {
          country: "China",
        },
      })}`,
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    expect((await response.json()).length).toEqual(2)
  }
})
