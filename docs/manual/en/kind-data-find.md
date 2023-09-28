---
title: kind=data-find
---


Beside basic CRUD operations,
we also want to do query in a data table,
specially we want to find data based on properties.
We use `kind=data-find` for this operation.

- To **find** data in a table based on some properties,
  `GET` the path of the table with query parameter `kind=data-find`
  and other query options in the query string.

  There might be many query results,
  thus we need to specify the page (starting from 1, default to 1)
  and the page size (default to 50).

  We use [`qs`](https://github.com/ljharb/qs) for parsing query string.

  For example, to get the first page of 3 user from China 🇨🇳,
  we can specify `country` in `properties`,
  and the query options should be:

  ```
  {
     page: 1,
     size: 3,
     properties: {
       country: "China",
     },
  }
  ```

  [`qs`](https://github.com/ljharb/qs) can parse the options from the following query string:

  ```
  GET /users?kind=data-find&page=1&size=3&properties[country]=China
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

  We will talk about how to use indexes to make query more efficient
  in later chapters.
