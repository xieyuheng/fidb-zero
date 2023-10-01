---
title: kind=data
---

当请求中没有写 `kind` 参数时：

- 如果请求的路径是一个文件夹，
  或者请求的路径还不存在，
  `kind=data` 会被作为默认参数。

- 如果请求的路径是一个文件，
  `kind=file` 会被作为默认参数。

## POST {data-path}?kind=data

创建一个数据文件。

如果数据文件已经存在就报错。

例如，如下 POST：

```
POST users/xieyuheng

{ "name": "Xie Yuheng" }

POST users/xieyuheng/projects/inner

{ "name": "inner", "description": "My inner universe." }

POST users/xieyuheng/projects/pomodoro

{ "name": "Pomodoro", "description": "🍅 A Pomodoro timer." }
```

将会创建如下数据文件：

```
users/xieyuheng/index.json
users/xieyuheng/projects/inner/index.json
users/xieyuheng/projects/pomodoro/index.json
```

## GET {data-path}?kind=data

读取一个数据文件。

例如，如果我们有如下数据文件：

```
users/xieyuheng/index.json
users/xieyuheng/projects/inner/index.json
users/xieyuheng/projects/pomodoro/index.json
```

读取数据的 GET 请求将是：

```
GET users/xieyuheng
GET users/xieyuheng/projects/inner
GET users/xieyuheng/projects/pomodoro
```

## PUT {data-path}?kind=data

更新整个数据文件。

我们首先要读取数据，以获得 `@revision`。

```
GET users/xieyuheng
```

请求的结果：

```
{
  "name": "Xie Yuheng",
  "@path": "users/xieyuheng",
  "@revision": "1b0d4dc0b6e68853aa0005b03c059a47",
  "@createdAt": 1677377821957,
  "@updatedAt": 1679424624733,
}
```

用 PUT 来更新整个数据文件：

```
PUT users/xieyuheng

{
  "@revision": "1b0d4dc0b6e68853aa0005b03c059a47",
  "name": "谢宇恒"
}
```

## PATCH {data-path}?kind=data

更新数据文件的某些属性。

我们首先要读取数据，以获得 `@revision`。

```
GET users/xieyuheng
```

请求的结果：

```
{
  "name": "谢宇恒",
  "@path": "users/xieyuheng",
  "@revision": "2b983c7a51376a61747eb9d79da13c77",
  "@createdAt": 1677377821957,
  "@updatedAt": 1679424824733
}
```

用 PATCH 来更新数据文件的部分属性：

```
PATCH users/xieyuheng

{
  "@revision": "2b983c7a51376a61747eb9d79da13c77",
  "country": "China"
}
```

## DELETE {data-path}?kind=data

删除一个数据文件。

我们首先要读取数据，以获得 `@revision`。

```
GET users/xieyuheng
```

请求的结果：

```
{
  "name": "谢宇恒",
  "country": "China",
  "@path": "users/xieyuheng",
  "@revision": "3f71a2d894180a2145ea7b05e2931e15",
  "@createdAt": 1677377821957,
  "@updatedAt": 1679425024733
}
```

用 DELETE 删除数据文件：

```
DELETE users/xieyuheng

{
  "@revision": "3f71a2d894180a2145ea7b05e2931e15"
}
```
