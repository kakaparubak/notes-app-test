import { Button } from '#/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import type { NotesGenerated, NotesId, NotesInput } from '#/schema/notes'
import { fetchNoteById, updateNote } from '#/services/notes'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

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
  const { note, error: loadError } = Route.useLoaderData()

  const handleNoteUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const data: NotesInput & NotesId = {
        id: note?.id ? note.id : '',
        title: note?.title ? note.title : '',
        content: formData.get('content') as string,
      }

      console.log(data)

      await updateNote({ data })
      toast.success(`Successfully updated '${note?.title}'!`)
    } catch (error) {
      toast.error(`Failed updating note. Please try again.`)
    }
  }

  const localDate = new Date(note?.updatedAt ? note.updatedAt : '').toLocaleString()

  if (loadError) return <div>{loadError}</div>

  return (
    <div className="p-8">
      <Breadcrumb className='mb-8'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/notes">Notes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/notes/${note?.id}`}>Note ID-{note?.id}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{note?.title}</CardTitle>
          <CardDescription>
            {localDate} - ID: {note?.id}
          </CardDescription>
        </CardHeader>
      </Card>
      <form onSubmit={handleNoteUpdate}>
        <Input
          className="my-2"
          id="content"
          name="content"
          defaultValue={note?.content ? note.content : ''}
        />
        <Button>Update</Button>
      </form>
    </div>
  )
}
