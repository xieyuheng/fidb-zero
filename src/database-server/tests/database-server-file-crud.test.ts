import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("database-server-file-crud", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  await fetch(new URL(`/users/xieyuheng/haha.txt?kind=file`, url), {
    method: "POST",
    headers: {
      authorization,
      "content-type": "text/plain",
    },
    body: new TextEncoder().encode("hahaha!"),
  })

  expect(
    await (
      await fetch(new URL(`/users/xieyuheng/haha.txt?kind=file`, url), {
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
        await fetch(new URL(`/users/xieyuheng/haha.txt?kind=file`, url), {
          method: "GET",
          headers: {
            authorization,
          },
        })
      ).arrayBuffer(),
    ),
  ).toEqual(new TextEncoder().encode("hahaha!"))

  await fetch(new URL(`/users/xieyuheng/haha.txt?kind=file`, url), {
    method: "DELETE",
    headers: {
      authorization,
    },
  })

  expect(
    (
      await fetch(new URL(`/users/xieyuheng/haha.txt?kind=file`, url), {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(404)
})