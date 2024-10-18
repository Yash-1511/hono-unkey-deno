import { Hono } from "hono";
import { env } from "hono/adapter";
import { Unkey, verifyKey } from "npm:@unkey/api";
import type { MiddlewareHandler } from "hono";

type UnkeyEnv = {
  UNKEY_ROOT_KEY: string;
  UNKEY_API_ID: string;
};

export const unkeyMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const unkeyEnv = env<UnkeyEnv>(c);

    // Initialize Unkey with the root key from environment variables
    const _unkey = new Unkey({
      rootKey: unkeyEnv.UNKEY_ROOT_KEY,
    });

    const apiKey = c.req.header("Authorization")?.replace("Bearer ", "");
    
    // If there's no API key, return a 401 error
    if (!apiKey) {
      return c.json({ error: "API key missing" }, 401);
    }

    // Verify the key using Unkey API
    const { result, error } = await verifyKey({
      key: apiKey,
      apiId: unkeyEnv.UNKEY_API_ID,
    });

    // If there's an error or the key is invalid, return a 403 error
    if (error || !result?.valid) {
      return c.json({ error: "Invalid API key" }, 403);
    }

    // If the key is valid, continue to the next handler
    await next();
  };
};

const app = new Hono();

// Apply middleware to protect the `/protected` route
app.use("/protected", unkeyMiddleware());

// Define protected route
app.get("/protected", (c) => {
  return c.json({ message: "This is a protected route" });
});

// Public route
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

Deno.serve(app.fetch);
