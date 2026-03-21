import { fetchAllNotes } from '#/lib/utils'
import type { NotesGenerated } from '#/schema/notes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notes/')({
  component: App,
  loader: async (): Promise<{
    notes: NotesGenerated[]
    error: string | null
  }> => {
    try {
      const notesData: NotesGenerated[] = await fetchAllNotes()
      return { notes: notesData, error: null }
    } catch (error) {
      return { notes: [], error: 'Failed to load notes' }
    }
  },
})

function App() {
  const { notes, error } = Route.useLoaderData()

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      {error && <h1>{error}</h1>}

      {notes.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </main>
  )
}
