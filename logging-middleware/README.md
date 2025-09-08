# logging-middleware

Reusable logging middleware for Affordmed evaluation.

## Usage

```ts
import { initLogger } from "logging-middleware";

const log = initLogger({
  baseUrl: "http://20.244.56.144/evaluation-service",
  getToken: () => myBearerToken // return string | null
});

log("frontend", "info", "page", "App booted");
```