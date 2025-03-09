import Fastify from "npm:fastify";
import { db } from "./infrastructure/database/db.ts";

// Creamos una instancia de fastify
const fastify = Fastify({
  logger: true,
});

// GET http://localhost:8080/api/users
// -> 200 [{ id: 1, name: 'John Doe', email: 'jonh@mail.com' }]

// GET para obtener todos los usuarios
fastify.get("/api/users", async function handler(request, reply) {
  const result = await db`SELECT * FROM users`;
  return result;
});

// POST http://localhost:8080/api/users
// body: { name: 'John Doe', email: 'jonh@mail.com' }
// -> 200 [{ id: 1, name: 'John Doe', email: 'jonh@mail.com' }]

// POST para crear un nuevo usuario
fastify.post("/api/users", async (request, reply) => {
  const user = request.body;

  // Como no existe la tabla users, la creamos a demanda temporalmente.
  const create = await db`CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
      )`;

  const result =
    await db`INSERT INTO users (name, email) VALUES (${user.name}, ${user.email}) RETURNING *`;

  return result;
});

// Iniciamos el servidor en el puerto 8080
try {
  await fastify.listen({ port: 8080, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  Deno.exit(1);
}
