import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("handle-data-default-token", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  await fetch(new URL(`users/xieyuheng`, url), {
    method: "POST",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: "xieyuheng",
      name: "Xie Yuheng",
    }),
  })

  await fetch(new URL(`users/xieyuheng/projects/inner`, url), {
    method: "POST",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: "inner",
      description: "Ones inner universe.",
    }),
  })

  await fetch(new URL(`users/xieyuheng/public/projects/inner`, url), {
    method: "POST",
    headers: {
      authorization,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: "inner",
      description: "Ones inner universe.",
    }),
  })

  {
    // Default token can NOT read non public data.

    const response = await fetch(
      new URL(`users/xieyuheng/projects/inner`, url),
      {
        method: "GET",
      },
    )

    expect(response.status).toEqual(401)
  }

  {
    // Default token can read user data.

    const response = await fetch(new URL(`users/xieyuheng`, url), {
      method: "GET",
    })

    expect(response.status).toEqual(200)
  }

  {
    // Default token can read public data.

    const response = await fetch(
      new URL(`users/xieyuheng/public/projects/inner`, url),
      {
        method: "GET",
      },
    )

    const json = await response.json()

    expect(json.name).toEqual("inner")
    expect(json.description).toEqual("Ones inner universe.")
  }
})
