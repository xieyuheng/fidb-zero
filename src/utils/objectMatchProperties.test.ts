import { expect, test } from "vitest"
import { objectMatchProperties } from "./objectMatchProperties.js"

test("objectMatchProperties", () => {
  expect(
    objectMatchProperties(
      {
        x: 1,
        y: 2,
      },
      {
        x: 1,
      },
    ),
  ).toEqual(true)

  expect(
    objectMatchProperties(
      {
        x: 1,
        y: 2,
      },
      {
        x: 2,
      },
    ),
  ).toEqual(false)

  expect(
    objectMatchProperties(
      {
        x: { x: 1 },
        y: 2,
      },
      {
        x: { x: 1 },
      },
    ),
  ).toEqual(true)

  expect(
    objectMatchProperties(
      {
        x: { x: 1 },
        y: 2,
      },
      {
        x: { x: 2 },
      },
    ),
  ).toEqual(false)

  expect(
    objectMatchProperties(
      {
        x: { x: [1] },
        y: 2,
      },
      {
        x: { x: [1] },
      },
    ),
  ).toEqual(true)

  expect(
    objectMatchProperties(
      {
        x: { x: [1] },
        y: 2,
      },
      {
        x: { x: [1, 2] },
      },
    ),
  ).toEqual(false)
})
