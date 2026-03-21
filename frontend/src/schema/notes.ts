export interface NotesInput {
  id: string,
  title: string,
  content: string | null
}

export interface NotesGenerated extends NotesInput {
  createdAt: string,
  updatedAt: string
}