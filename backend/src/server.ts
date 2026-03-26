import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./db/schema.ts";
import notesRoutes from "./modules/notes/notes.routes.ts";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

function buildServer() {
  const fastify = Fastify({ logger: false });

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.register(notesRoutes, { prefix: "/api/notes" });

  fastify.get("/hello", (req, reply) => {
    reply.code(200).send({ message: "Hello World!" });
  });

  return fastify;
}

export default buildServer;
