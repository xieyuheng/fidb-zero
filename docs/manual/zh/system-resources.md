---
title: 系统资源
---

像是 `.default-token-issuer` 和`.tokens/default` 这样的，
路径中某一段以 `.` 开头的数据文件，我们称作系统资源。

我们规定，一般的数据资源的请求，
如 `kind=data` 和 `kind=file`，
不能访问系统文件。
