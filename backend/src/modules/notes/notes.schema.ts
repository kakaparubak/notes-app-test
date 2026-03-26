import { z } from "zod";

const notesInput = {
  title: z.string(),
  content: z.string().optional(),
};

const notesGenerated = {
  createdAt: z.date(),
  updatedAt: z.date(),
  id: z.number(),
};

export const noteRequestIdSchema = z.object({
  id: z.string(),
});

export const noteInputSchema = z.object(notesInput);
export const noteResponseSchema = z.object({
  ...notesInput,
  ...notesGenerated,
});
export const notesResponseSchema = z.array(noteResponseSchema);

export type NoteInput = z.infer<typeof noteInputSchema>;
export type NoteRequestId = z.infer<typeof noteRequestIdSchema>;
