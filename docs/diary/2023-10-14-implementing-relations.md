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

- Problem: Should we use `followed-by` or `followers`
  to name this direction of the relation?

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

# Check consistency during reading

Since a double-link is built by two requests,
when the first request success but the second fail,
the state of the double-link will be inconsistent.

We can solve this problem by checking consistency
during reading the first endpoint of the double-link,
and amend the double-link if it is broken.

# Properties of double-link method for implementing relations

We do not need to use index to get all the users a user is following,
or all the followers of a user.

both direction of a relation must be explicitly named.

# Motivating constraint

The motivating constraint of the idea of double-link,
is the fact that we are using path pattern to represent permissions.
