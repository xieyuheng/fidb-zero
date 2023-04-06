import { expect, test } from "vitest"
import { responseHeaders } from "../../utils/responseHeaders"
import { prepareTestServer } from "./prepareTestServer"

test("database-server-file-crud", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  await fetch(new URL(`users/xieyuheng/human.txt?kind=file`, url), {
    method: "POST",
    headers: {
      authorization,
      // NOTE "content-type" does not matter, file extension matters.
      // "content-type": "text/plain",
    },
    body: new TextEncoder().encode("hahaha!"),
  })

  {
    const response = await fetch(
      new URL(`users/xieyuheng/human.txt?kind=file`, url),
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    const headers = responseHeaders(response)
    expect(headers["content-type"]).toEqual("text/plain")
    expect(await response.text()).toEqual("hahaha!")
  }

  {
    // NOTE `kind=file` is optional.

    const response = await fetch(new URL(`users/xieyuheng/human.txt`, url), {
      method: "GET",
      headers: {
        authorization,
      },
    })

    const headers = responseHeaders(response)
    expect(headers["content-type"]).toEqual("text/plain")
    expect(await response.text()).toEqual("hahaha!")
  }

  {
    const response = await fetch(
      new URL(`users/xieyuheng/human.txt?kind=file`, url),
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    const headers = responseHeaders(response)
    expect(headers["content-type"]).toEqual("text/plain")
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(
      new TextEncoder().encode("hahaha!"),
    )
  }

  await fetch(new URL(`users/xieyuheng/human.txt?kind=file`, url), {
    method: "DELETE",
    headers: {
      authorization,
    },
  })

  {
    const response = await fetch(
      new URL(`users/xieyuheng/human.txt?kind=file`, url),
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    expect(response.status).toEqual(404)
  }

  {
    // NOTE `kind=file` is optional.

    const response = await fetch(new URL(`users/xieyuheng/human.txt`, url), {
      method: "GET",
      headers: {
        authorization,
      },
    })

    expect(response.status).toEqual(404)
  }
})
