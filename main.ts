import Fastify from "npm:fastify";

// Creamos una instancia de fastify
const fastify = Fastify({
  logger: true,
});

// Definimos una ruta y lo que retorna. ej: GET /api -> 200 { hello: 'world' }
fastify.get("/api", async function handler(request, reply) {
  return { hello: "world" };
});

// Iniciamos el servidor en el puerto 8080
try {
  await fastify.listen({ port: 8080, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  Deno.exit(1);
}
