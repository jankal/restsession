# restsession - Store your `express-session` in a RESTful way

## Usage in express
Example:
```javascript
import express from 'express'
import session from 'express-session'
import restsession from 'restsession'

const app = express()
const HTTPStore = restsession(session)

app.use(session({
  secret: 'Kgqnq5YsquMjEZd3TX',
  store: new HTTPStore('http://127.0.0.1:1200/sessions'),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false
  },
  saveUninitialized: false,
  resave: false
}))

```

## RESTful API Specification (endpoint)
### Get list of all Sessions
---

Request:

```
GET /
```

Response: 

```json
[
  {
    "key": "value"
  },
  ... sessions
]
```

### Remove everything
----

Request:
```
DELETE /
```

Reponse:
```json
{
  "status": "OK"
}
```

### Get one Session
----

```
GET /{sid}
```

Response:

```json
{
  "key": "value"
}
```

### Delete one Session
---
```
DELETE /{sid}
```

Reponse:

```json
{
  "status": "OK"
}
```

### Add one Session
---

Request:

```json
POST /{sid}

{
  "key": "value"
}
```

Response:

```json
{
  "key": "value"
}
```

This can also be used in conjuction with the `?ping` URL parameter. Then the API is able to update any existing expire times of the session if any.
