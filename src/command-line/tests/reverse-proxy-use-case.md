---
title: Reverse proxy use case
---

We can not yet run tests for command-line.

To be able to test this commands we need to:

- Setup example website.
- Run command in `child_process`.
- Use node http client, which can mock DNS server,
  instead of using `fetch`.

```
fidb reverse-proxy:serve --port 8080 --port 5108 \
 --database ~/fidb-official/fidb-databases/databases/reverse-proxy \
 --domain cicada.localhost


fidb reverse-proxy:login http://cicada.localhost:8080/users/xieyuheng

# NOTE Login one port will login all ports,
#   so we do not need to do the following:
#
# fidb reverse-proxy:login http://cicada.localhost:5108/users/xieyuheng


fidb website:serve ~/learn-x/learn-alpinejs/notepad \
  --url http://notepad.cicada.localhost:8080

curl 'http://notepad.cicada.localhost:8080'


fidb database:serve ~/fidb-official/fidb-databases/databases/test \
  --url http://notepad.cicada.localhost:5108

curl 'http://notepad.cicada.localhost:5108?kind=info'
```
