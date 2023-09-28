---
title: kind=data
---

When no `kind` query parameter is given:

- `kind=data` will be the default if the path is a directory or does not exist.
- `kind=file` will be the default if the path is a file.

# POST {data-path}?kind=data

Create a data file.

For example, after the following `POST`s:

```
POST users/xieyuheng

{ "name": "Xie Yuheng" }

POST users/xieyuheng/projects/inner

{ "name": "inner", "description": "My inner universe." }

POST users/xieyuheng/projects/pomodoro

{ "name": "Pomodoro", "description": "🍅 A Pomodoro timer." }
```

We will create the following data files:

```
users/xieyuheng/index.json
users/xieyuheng/projects/inner/index.json
users/xieyuheng/projects/pomodoro/index.json
```

# GET {data-path}?kind=data

Read a data file.

For example, if we have the following data:

```
users/xieyuheng/index.json
users/xieyuheng/projects/inner/index.json
users/xieyuheng/projects/pomodoro/index.json
```

The `GET` requests would be:

```
GET users/xieyuheng
GET users/xieyuheng/projects/inner
GET users/xieyuheng/projects/pomodoro
```

# PUT {data-path}?kind=data

Update the whole data file.

We first need to read the data to get `@revision`.

```
GET users/xieyuheng
```

Result:

```
{
  "name": "Xie Yuheng",
  "@path": "users/xieyuheng",
  "@revision": "1b0d4dc0b6e68853aa0005b03c059a47",
  "@createdAt": 1677377821957,
  "@updatedAt": 1679424624733,
}
```

Update the whole data:

```
PUT users/xieyuheng

{
  "name": "谢宇恒",
  "@path": "users/xieyuheng",
  "@revision": "1b0d4dc0b6e68853aa0005b03c059a47",
  "@createdAt": 1677377821957,
  "@updatedAt": 1679424624733
}
```

# PATCH {data-path}?kind=data

Update some properties of a data file.

We first need to read the data to get `@revision`.

```
GET users/xieyuheng
```

Result:

```
{
  "name": "谢宇恒",
  "@path": "users/xieyuheng",
  "@revision": "2b983c7a51376a61747eb9d79da13c77",
  "@createdAt": 1677377821957,
  "@updatedAt": 1679424824733
}
```

Update only some properties:

```
PATCH users/xieyuheng

{
  "@revision": "2b983c7a51376a61747eb9d79da13c77",
  "country": "China"
}
```

# DELETE {data-path}?kind=data

Delete data file.

We first need to read the data to get `@revision`.

```
GET users/xieyuheng
```

Result:

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

Delete the data:

```
DELETE users/xieyuheng

{
  "@revision": "3f71a2d894180a2145ea7b05e2931e15"
}
```
