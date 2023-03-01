---
title: Design the command line interface
author: Xie Yuheng
date: 2023-03-01
---

This has enough information, but is too long,
and it write password to terminal,
which will be save to terminal history,
thus not good.

```
fidb serve-database <directory> --port 5108 \
  --reverse-proxy-server https://fidb.app:5108 \
  --reverse-proxy-subdomain pomodoro \
  --reverse-proxy-username xieyuheng \
  --reverse-proxy-password abc


The database

  <directory> and database information

served at

  http://localhost:5108
  https://pomodoro.fidb.app:5108
```

Instead, we should first login to the reverse proxy server.

```
fidb login-reverse-proxy-server https://fidb.app:5108


Prompt for username

Prompt for password

On success, token saved to ~/.fidb/tokens/
```

Then in one line

```
fidb serve-database <directory> --port 5108
fidb serve-database <directory> --port 5108 --reverse-proxy https://pomodoro.fidb.app:5108


The database

  <directory> and database information

served at

  http://localhost:5108
  https://pomodoro.fidb.app:5108
```

```
fidb serve-website <directory> --port 8080
fidb serve-website <directory> --port 8080 --reverse-proxy https://pomodoro.fidb.app

Website served at

  http://localhost:8080
  https://pomodoro.fidb.app
```

About the reverse proxy server itself.

- Here we explicit say `--database`,
  because it is not obvious that
  we need a database to serve a reverse proxy.

```
fidb serve-reverse-proxy --port 5108 \
  --database <directory> \
  --tls-cert /etc/letsencrypt/live/fidb.app/fullchain.pem \
  --tls-key /etc/letsencrypt/live/fidb.app/privkey.pem


The reverse-proxy served at:

  https://127.0.0.1:5108
```

An app often need both website and database,
but we do not want to `serve-reverse-proxy` twice
and `login-reverse-proxy-server` twice.

Thus `serve-reverse-proxy` and should support multiple ports.

```
fidb serve-reverse-proxy --port 443 --port 5108 \
  --database <directory> \
  --tls-cert /etc/letsencrypt/live/fidb.app/fullchain.pem \
  --tls-key /etc/letsencrypt/live/fidb.app/privkey.pem
```

Login can also specify multiple ports,
but by default we can infer 443 and 80 from https and http,
and by default we can add 5108,

If at least one `--port` is explicitly given,
we will not infer from protocol or add default port of fidb -- 5108.

```
fidb login-reverse-proxy-server https://fidb.app

Will login to 443 and 5108
```

```
fidb login-reverse-proxy-server https://fidb.app --port 3000 --port 5000

Will login to 3000 and 5000
```

```
fidb login-reverse-proxy-server https://fidb.app --port 3000

Will login to 3000
```
