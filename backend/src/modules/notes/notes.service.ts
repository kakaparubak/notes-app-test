import { eq, sql } from "drizzle-orm";
import { db } from "../../server";
import { notes } from "../../db/schema";
import type { NoteInput, NoteRequestId } from "./notes.schema";

export async function getAllNotes() {
  return db.query.notes.findMany();
}

export async function getNoteById({ id }: NoteRequestId) {
  return db.query.notes.findFirst({
    where(fields, operators) {
      operators.eq(fields.id, Number(id));
    },
  });
}

export async function createNote({ title, content }: NoteInput) {
  return db
    .insert(notes)
    .values({
      title: title,
      content: content,
    })
    .returning();
}

export async function deleteNote({ id }: NoteRequestId) {
  return db
    .delete(notes)
    .where(eq(notes.id, Number(id)))
    .returning();
}

export async function updateNote({
  id,
  title,
  content,
}: NoteInput & NoteRequestId) {
  return db
    .update(notes)
    .set({ title: title, content: content, updatedAt: sql`NOW()` })
    .where(eq(notes.id, Number(id)))
    .returning();
}
