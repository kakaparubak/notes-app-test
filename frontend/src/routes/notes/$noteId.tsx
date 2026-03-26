import { Button } from '#/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Input } from '#/components/ui/input'
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
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{note?.title}</CardTitle>
          <CardDescription>
            {note?.updatedAt} - ID: {note?.id}
          </CardDescription>
        </CardHeader>
      </Card>
      <form onSubmit={() => console.log('submitted')}>
        <Input
          className="my-2"
          id='content'
          name='content'
          defaultValue={note?.content ? note.content : ''}
        />
        <Button>Update</Button>
      </form>
    </div>
  )
}
