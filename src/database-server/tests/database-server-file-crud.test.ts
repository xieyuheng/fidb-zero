import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("database-server-file-crud", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  await fetch(new URL(`users/xieyuheng/haha.txt?kind=file`, url), {
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
      new URL(`users/xieyuheng/haha.txt?kind=file`, url),
      {
        method: "GET",
        headers: {
          authorization,
        },
      },
    )

    // const headers = Object.fromEntries((response.headers as any).entries())

    // console.log(headers)

    expect(await response.text()).toEqual("hahaha!")
  }

  // NOTE `kind=file` is optional.

  expect(
    await (
      await fetch(new URL(`users/xieyuheng/haha.txt`, url), {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).text(),
  ).toEqual("hahaha!")

  expect(
    new Uint8Array(
      await (
        await fetch(new URL(`users/xieyuheng/haha.txt?kind=file`, url), {
          method: "GET",
          headers: {
            authorization,
          },
        })
      ).arrayBuffer(),
    ),
  ).toEqual(new TextEncoder().encode("hahaha!"))

  await fetch(new URL(`users/xieyuheng/haha.txt?kind=file`, url), {
    method: "DELETE",
    headers: {
      authorization,
    },
  })

  expect(
    (
      await fetch(new URL(`users/xieyuheng/haha.txt?kind=file`, url), {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(404)

  // NOTE `kind=file` is optional.

  expect(
    (
      await fetch(new URL(`users/xieyuheng/haha.txt`, url), {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(404)
})
