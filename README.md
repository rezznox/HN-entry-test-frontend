# Requirements
This projects uses Node 20 and npm

# Quickstart

There's no env vars setup in this project so it should be easy.

Try to execute it by running this in your terminal:

```
  docker compose build && docker compose up
```
if for heaven knowss what reason the latter exploded try it manually please:
```
npm ci && npm run dev
```

# Reflection
If I had more time I would have done the UI prettier for sure and I would had store the messages history. For that I would had created a context to store the history, and done specialized components for composition to consume that context so they can have single responsabilities and be reusable and therefore becoming much easily testable. Also I would had added env vars for things like to point to a different backend and I would had created a test for the call to the stream. If I had more experience dealing with streams.
