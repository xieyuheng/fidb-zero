import qs from "qs"
import { expect, test } from "vitest"
import { serveTestDb } from "./serveTestDb"

test("serve-find-page", async () => {
  const { url, db } = await serveTestDb()

  const array = [
    { "@id": "users/0", country: "China" },
    { "@id": "users/1" },
    { "@id": "users/2", country: "China" },
    { "@id": "users/3" },
    { "@id": "users/4", country: "China" },
    { "@id": "users/5" },
    { "@id": "users/6", country: "China" },
    { "@id": "users/7" },
    { "@id": "users/8", country: "China" },
    { "@id": "users/9" },
  ]

  for (const data of array) {
    await fetch(`${url}/${data["@id"]}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
  }

  expect(
    (
      await (
        await fetch(
          `${url}/users?${qs.stringify({
            page: 1,
            size: 3,
            properties: {
              country: "China",
            },
          })}`,
        )
      ).json()
    ).results.length,
  ).toEqual(3)

  expect(
    (
      await (
        await fetch(
          `${url}/users?${qs.stringify({
            page: 2,
            size: 3,
            properties: {
              country: "China",
            },
          })}`,
        )
      ).json()
    ).results.length,
  ).toEqual(2)
})
