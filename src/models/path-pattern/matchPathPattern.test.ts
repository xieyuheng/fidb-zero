import { expect, test } from "vitest"
import { matchPathPattern } from "./matchPathPattern"

test("matchPathPattern", async () => {
  expect(matchPathPattern("users/{user}", "users/xieyuheng")).toEqual({
    user: "xieyuheng",
  })

  expect(matchPathPattern("users/{user}/**", "users/xieyuheng")).toEqual({
    user: "xieyuheng",
  })

  expect(matchPathPattern("users/{user}/*", "users/xieyuheng")).toEqual(
    undefined,
  )

  expect(
    matchPathPattern(
      "users/{user}/projects/{user}",
      "users/xieyuheng/projects/xieyuheng",
    ),
  ).toEqual({
    user: "xieyuheng",
  })

  expect(
    matchPathPattern(
      "users/{user}/projects/{user}",
      "users/xieyuheng/projects/cicada",
    ),
  ).toEqual(undefined)

  expect(
    matchPathPattern(
      "users/{user}/projects/{project}",
      "users/xieyuheng/projects/cicada",
    ),
  ).toEqual({
    user: "xieyuheng",
    project: "cicada",
  })

  expect(
    matchPathPattern(
      "users/{user}/*/{project}",
      "users/xieyuheng/projects/cicada",
    ),
  ).toEqual({
    user: "xieyuheng",
    project: "cicada",
  })

  expect(
    matchPathPattern("users/{user}/**", "users/xieyuheng/projects/cicada"),
  ).toEqual({
    user: "xieyuheng",
  })

  expect(matchPathPattern("users/{user}", "users/xieyuheng/config")).toEqual(
    undefined,
  )
})
