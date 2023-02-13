---
title: File system resolver for http semantics
author: Xie Yuheng
date: 2023-02-13
---

When thinking about token based permission system,
I found that the most natural way of represent permission
is to use path patterns.

One require of the permission system is to grant a user
only the permission to read and write his own data.

Thus we change how data are stored, from

```
/users/xieyuheng
```

to

```
/users/xieyuheng/index.json
```

Now it is clear that what we are doing is just
a **file system resolver for http semantics**.

See [RFC 9110 / HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html).
