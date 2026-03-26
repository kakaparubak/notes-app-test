export interface NotesInput {
  title: string,
  content: string | null
}

export interface NotesId {
  id: string
}
export interface NotesGenerated {
  id: string,
  title: string,
  content: string | null,
  createdAt: string,
  updatedAt: string
}