import { expect, test } from "vitest"
import { prepareTestServer } from "./prepareTestServer"

test("rest-file-crud", async ({ meta }) => {
  const { url, authorization } = await prepareTestServer(meta)

  await fetch(`${url}/users/xieyuheng/haha.txt?kind=file`, {
    method: "POST",
    headers: {
      authorization,
      "content-type": "text/plain",
    },
    body: new TextEncoder().encode("hahaha!"),
  })

  expect(
    await (
      await fetch(`${url}/users/xieyuheng/haha.txt?kind=file`, {
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
        await fetch(`${url}/users/xieyuheng/haha.txt?kind=file`, {
          method: "GET",
          headers: {
            authorization,
          },
        })
      ).arrayBuffer(),
    ),
  ).toEqual(new TextEncoder().encode("hahaha!"))

  await fetch(`${url}/users/xieyuheng/haha.txt?kind=file`, {
    method: "DELETE",
    headers: {
      authorization,
    },
  })

  expect(
    (
      await fetch(`${url}/users/xieyuheng/haha.txt?kind=file`, {
        method: "GET",
        headers: {
          authorization,
        },
      })
    ).status,
  ).toEqual(404)
})
