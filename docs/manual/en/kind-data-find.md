---
title: kind=data-find
---

## GET {data-directory}?kind=data-find

Find data in a data directory based on some properties.

We use [`qs`](https://github.com/ljharb/qs) for parsing query string.

There might be many query results,
thus we need to specify the page (starting from 1, default to 1)
and the page size (default to 50).

For example, to get the first page of 3 users from China,
we can specify `country` in `properties`,
and the request should be:

```
GET /users?kind=data-find&page=1&size=3&properties.country=China
```

Query results:

```
[
  {
    "name": "谢宇恒",
    "country": "China",
    "@path": "users/xieyuheng",
    "@revision": "4b987c7a58376a61747eb9d79da13c77",
    "@createdAt": 1677377821957,
    "@updatedAt": 1679424824733
  },
  ...
]
```
