---
title: Implementing relations
author: Xie Yuheng
date: 2023-10-14
---

We can implement relations between user and user
by making a `relations/` directory for each user,
and give other users the permission
to edit `relations/{relation-name}/{other-user}`.

This means we are implementing relations by double-links.

Take the `following` and `followed-by` relation as an example:

```
users/{user}/relations/followed-by/{other-user}/index.json
users/{other-user}/following/{user}/index.json
```

To implement relations between content and user,
we can use a `content-relations/` directory
and use `path-hash` to reference path of a content.

```
users/{user}/public/contents/{path}
users/{user}/public/content-relations/{path-hash}/recalled-by/{other-user}/index.json
```

Just like how the recall feature of mimor is implemented:

```
users/{user}/recall/{src-hash}/index.json
```

# Limitation

Note that, we can only express relations between something with user.

Because the target of access control is a user.

This is not a bad limitation,
because we are using a client/server architechure,
in which every request is sent by a user or a guest.
