import postgres from "npm:postgres";

export const db = postgres({
  user: Deno.env.get("DB_USER"),
  database: Deno.env.get("DB_NAME"),
  hostname: Deno.env.get("DB_HOST"),
  password: Deno.env.get("DB_PASSWORD"),
  port: parseInt(Deno.env.get("DB_PORT")),
});
