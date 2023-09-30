---
title: 元数据
---

元数据是关于数据的数据。

除了保存在文件中的 JSON 数据之外，
在读取数据的时候，
我们还想要加一些元数据，
比如主键、时间戳等等。

- **问题：** 如何在 JSON 数据中加元数据？

- **方案：** 我们可以给元数据属性的名字加上 `@` 前缀。

为了方便人们通过直接编辑 JSON 文件的方式来创建数据，
所有元数据属性都是可选的，
只有当读取数据的时候，
才会将元数据加到数据上去。

## @path

为了让读取到的数据更方便使用，
我们用 `@path` 属性来保存主键。

读取数据的时候，包含 `index.json` 文件的文件夹路径，
将被作为 `@path` 属性加到返回的结果中。

这个路径是相对于数据库的根目录的。

例如，下列数据的 `@path` 属性

```
users/xieyuheng/index.json
users/xieyuheng/projects/inner/index.json
users/xieyuheng/projects/pomodoro/index.json
```

是

```
users/xieyuheng
users/xieyuheng/projects/inner
users/xieyuheng/projects/pomodoro
```

## @createdAt

我们用 `@createdAt` 创建时的时间戳。

当读取数据时，如果没有 `@createdAt` 属性，
这个文件的创建时间将会被作为 `@createdAt` 属性加到返回的结果中。

时间戳是自 UNIX 纪元以来已经过去的毫秒数，
起始于 UTC 时间 1970-01-01 日凌晨。

## @updatedAt

我们用 `@updatedAt` 修改时的时间戳。

当读取数据时，如果没有 `@updatedAt` 属性，
`@createdAt` 将会被作为初始的 `@updatedAt`。

当修改数据时，将会按照当前的时间更新 `@updatedAt`。

## @revision

- **问题：** 当我要修改一个数据的时候，
  我首先根据 `@path` 把数据读取回来，
  然后我修改数据，然后我要把它保存回数据库。
  如果这段时间数据已经被别的用户修改了怎么办？
  我要怎么才能知道数据已经被修改了？

- **方案：** 我们可以加一个 `@revision` 属性。

  当读取数据时，如果没有 `@revision` 属性，
  就生成一个随机的字符串作为 `@revision`。

  当修改数据时，请求中必须带有 `@revision` 属性，
  给出的 `@revision` 将与数据库中当前的 `@revision` 相比较，
  如果相同，修改成功，生成一个新的 `@revision`；
  如果不相同，修改失败，返回错误信息（例如，通过 HTTP 的状态信息来返回错误信息）。
