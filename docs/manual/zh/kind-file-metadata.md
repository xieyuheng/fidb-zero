---
title: kind=file-metadata
---

## GET {flie}?kind=file-metadata

读取一个文件的元数据。

例如：

```
GET users/xieyuheng/human.txt?kind=file-metadata
```

结果如下：

```
{
  size: 35,
  createdAt: 1680918204367,
  updatedAt: 1680918226860
}
```
