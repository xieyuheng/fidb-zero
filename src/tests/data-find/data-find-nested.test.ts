import { expect, test } from "vitest"
import { api } from "../.."
import { prepareTestServer } from "../prepareTestServer"

test("data-find-nested", async ({ task }) => {
  const { ctx } = await prepareTestServer(task)

  const array = [
    { "@path": "users/0", address: { country: "China" } },
    { "@path": "users/1" },
    { "@path": "users/2", address: { country: "China" } },
    { "@path": "users/3" },
    { "@path": "users/4", address: { country: "China" } },
    { "@path": "users/5" },
    { "@path": "users/6", address: { country: "China" } },
    { "@path": "users/7" },
    { "@path": "users/8", address: { country: "China" } },
    { "@path": "users/9" },
  ]

  for (const data of array) {
    await api.dataCreate(ctx, data["@path"], data)
  }

  {
    const results = await api.dataFind(ctx, "users", {
      page: 1,
      size: 3,
      properties: {
        address: { country: "China" },
      },
    })

    expect(results.length).toEqual(3)
  }

  {
    const results = await api.dataFind(ctx, "users", {
      page: 2,
      size: 3,
      properties: {
        address: { country: "China" },
      },
    })

    expect(results.length).toEqual(2)
  }
})
