---
title: kind=directory
---

## POST {directory}?kind=directory

创建一个文件夹（文件夹也叫目录）。

例如：

```
POST users/xieyuheng/public/contents?kind=directory
```

## GET {directory}?kind=directory

读取文件夹内的子文件夹与文件名。

例如：

```
GET users/xieyuheng/public/contents?kind=directory
```

结果为：

```
[
  {
    "kind": "Directory",
    "path": "users/xieyuheng/public/contents/ai"
  },
  {
    "kind": "Directory",
    "path": "users/xieyuheng/public/contents/quotes"
  },
  {
    "kind": "File",
    "path": "users/xieyuheng/public/contents/debug.md",
    "size": 1321,
    "createdAt": 1695608364554.853,
    "updatedAt": 1695608364554.853
  },
  {
    "kind": "File",
    "path": "users/xieyuheng/public/contents/hello.md",
    "size": 3,
    "createdAt": 1695608364554.853,
    "updatedAt": 1695608364554.853
  },
  ...
]
```

返回的结果中 `kind` 属性可能是 `"Directory"` 或 `"File"`，
`path` 属性是相对于文件夹根目录的路径，
因此可以用作主键来做引用。

上面的结果列表并不是递归的，
如果还想要递归地列表所有嵌套的子文件夹，
我们可以在查询字符串中加上 `recursive`：

```
GET users/xieyuheng/public/contents?kind=directory&recursive
```

## DELETE {directory}?kind=directory

递归地删除一个文件夹。

例如：

```
DELETE users/xieyuheng/public/contents?kind=directory
```
