import type { NotesGenerated } from '#/schema/notes'
import { fetchNoteById } from '#/services/notes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notes/$noteId')({
  component: NoteIdPage,
  loader: async ({
    params,
  }): Promise<{
    note: NotesGenerated | null
    error: string | null
  }> => {
    try {
      const data = { id: params.noteId }
      const note: NotesGenerated = await fetchNoteById({ data })
      return { note, error: null }
    } catch (error) {
      return { note: null, error: 'Note not found' }
    }
  },
})

function NoteIdPage() {
  const { note, error } = Route.useLoaderData()

  if (error) return <div>{error}</div>
  return (
    <div>
      <div>{note?.title}</div>
      <div>{note?.content}</div>
    </div>
  )
}
