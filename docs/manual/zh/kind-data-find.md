---
title: kind=data-find
---

## GET {data-directory}?kind=data-find

根据属性的值，在数据文件夹内查找数据。

我们用 [`qs`](https://github.com/ljharb/qs)
来解析 URL 中的查询字符串（`?` 之后的字符串）。

例如，查询前三个来自中国的用户，
我们可以在查询字符串中指定 `properties.country`：

```
GET /users?kind=data-find&page=1&size=3&properties.country=China
```

由于结果有可能很多，
所以我们还要在查询字符串中指定页数 `page`
与每一页数据的数量 `size`。
页数从 1 开始，默认为 1；
每一页数据的数量 50。

查找的结果：

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
