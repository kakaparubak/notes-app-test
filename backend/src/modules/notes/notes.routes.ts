import type { FastifyInstance } from "fastify";
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { noteInputSchema, noteRequestIdSchema, noteResponseSchema, notesResponseSchema } from "./notes.schema";
import { createNoteHandler, deleteNoteHandler, getAllNotesHandler, getNoteByIdHandler, updateNoteHandler } from "./notes.controller";

const notesRoutes: FastifyPluginAsyncZod = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: notesResponseSchema
      }
    },
    handler: getAllNotesHandler
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      params: noteRequestIdSchema,
      response: {
        200: noteResponseSchema
      }
    },
    handler: getNoteByIdHandler
  })

  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: noteInputSchema,
      response: {
        200: noteResponseSchema
      }
    },
    handler: createNoteHandler
  })

  fastify.route({
    method: "DELETE",
    url: '/:id',
    schema: {
      params: noteRequestIdSchema,
      response: {
        200: noteResponseSchema
      }
    },
    handler: deleteNoteHandler
  })

  fastify.route({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: noteRequestIdSchema,
      body: noteInputSchema,
      response: {
        200: noteResponseSchema
      }
    },
    handler: updateNoteHandler
  })
}

export default notesRoutes;
