import DeleteNoteAlertDialog from '#/components/DeleteNoteAlertDialog'
import NoteDialog from '#/components/NoteDialog'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import type { NotesGenerated, NotesInput } from '#/schema/notes'
import { deleteNote, fetchAllNotes, postNewNote } from '#/services/notes'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/notes/')({
  component: NotesPage,
  loader: async (): Promise<{
    notes: NotesGenerated[]
    error: string | null
  }> => {
    try {
      const notesData: NotesGenerated[] = await fetchAllNotes()
      return { notes: notesData, error: null }
    } catch (error) {
      console.log(error)
      return { notes: [], error: 'Failed to load notes' }
    }
  },
})

function NotesPage() {
  const { notes, error: loadError } = Route.useLoaderData()
  const postNewNoteFn = useServerFn(postNewNote)
  const deleteNoteFn = useServerFn(deleteNote)

  const [localNotes, updateLocalNotes] = useState(notes)

  const handleCreateNewNoteSubmit = async (data: NotesInput) => {
    try {
      const notesData = await postNewNoteFn({ data })
      updateLocalNotes((prev) => {
        const curr = prev.concat([notesData])
        return curr
      })
      toast.success(`Succesfully created note '${data.title}'!`)
    } catch (error) {
      toast.error(`Failed creating note, please try again.`)
    }
  }

  const handleDeleteNote = async (id: string) => {
    const data = { id }

    console.log(data)

    try {
      const deletedNote = await deleteNoteFn({ data })
      console.log(deletedNote)

      updateLocalNotes((prev) => {
        const filteredNotes = prev.filter((note) => note.id != data.id)
        return filteredNotes
      })
      toast.success(`Note succesfully deleted!`)
    } catch (error) {
      toast.error(`Failed deleting note, please try again.`)
    }
  }

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <NoteDialog submitFunction={handleCreateNewNoteSubmit} />
      {loadError && <h1>{loadError}</h1>}
      <div className="py-8">
        {localNotes.map((note) => (
          <Card key={note.id} className="my-4">
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>{note.title}</CardTitle>
                  <CardDescription>
                    {note.updatedAt} - {note.id}
                  </CardDescription>
                </div>
                <DeleteNoteAlertDialog id={note.id} onClickFn={handleDeleteNote}/>
              </div>
            </CardHeader>
            <CardContent>{note.content}</CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
