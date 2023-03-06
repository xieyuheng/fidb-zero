---
title: HTTP reverse proxy server
author: Xie Yuheng
date: 2023-03-06
---

My aim is to run local HTTP server (without a public IP),
and use a HTTP reverse proxy server to make the local server
publicly available on the internet.

Our current solution for such a HTTP reverse proxy server
is the following (let's call it solution 1):

```
HTTP reverse proxy server =
  HTTP server + channel server (over TCP or UDP)
```

We talk about "over TCP" in this document,
"over TCP" will be studied in another document.

The network is the following:

```
client <-> reverse proxy server <-> local server
```

The reverse proxy server has a domain name,
and it dispatches request by subdomain name.

For example, take `fidb.app` as the domain of our reverse proxy server.
a subdomain might be `xieyuheng.fidb.app`.

The reverse proxying works as the following:

- (1) A local server send POST HTTP request
  to the reverse proxy server by the base domain,
  with the following body:

  ```ts
  {
    username: string
    domain: string
  }
  ```

- (2) The reverse proxy server auth the request by token,
  and reply a port of the channel server to connect,
  an id of this local server,
  and a key for encryption.

  ```ts
  {
    port: number
    id: string
    key: string
  }
  ```

  The local server id maps to `ChannelOptions`,
  which has username, subdomain and an encrypted password
  to be checked on next step.

  ```ts
  {
    username: string
    subdomain: string
    password: string
  }
  ```

  Because we are sending a key for encryption,
  the reverse proxy server must be using HTTPS instead of HTTP.

- (3) The local server connect to the channel server,
  the first data should be the id and a encrypted password.

- (4) The channel server check the message,
  and accept the connection for future proxying.

- (5) Proxying is done by multiplexing this TCP connection.

Notes:

- The first data length should be limited,
  because this TCP connection is not encrypted,
  and before it got the token and checked the encrypted password
  the channel server does not trust the client yet,

  It does not matter that it is a middle man passing this id,
  because all future data will be encrypted by the key
  which the middle man does not know.
