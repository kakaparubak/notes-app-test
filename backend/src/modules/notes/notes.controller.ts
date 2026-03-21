import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "./notes.service";
import type { NoteInput, NoteRequestId } from "./notes.schema";

export async function getAllNotesHandler() {
  const notes = await getAllNotes();

  return notes;
}

export async function getNoteByIdHandler(
  req: FastifyRequest<{ Params: NoteRequestId }>,
) {
  const note = await getNoteById(req.params);

  return note;
}

export async function createNoteHandler(
  req: FastifyRequest<{ Body: NoteInput }>,
) {
  const createdNote = await createNote(req.body);

  return createdNote;
}

export async function deleteNoteHandler(
  req: FastifyRequest<{ Params: NoteRequestId }>,
) {
  const deletedNote = await deleteNote(req.params);

  return deletedNote;
}

export async function updateNoteHandler(
  req: FastifyRequest<{ Body: NoteInput; Params: NoteRequestId }>,
) {
  const updatedNote = await updateNote({ ...req.params, ...req.body });

  return updatedNote;
}
